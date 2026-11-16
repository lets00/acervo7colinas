import jwt from 'jsonwebtoken';
import Emprestimo from '../models/Emprestimo.js';
import sequelize from '../config/database.js';
import Usuario from '../models/Usuario.js';
import Livro from '../models/Livro.js';
import Exemplar from '../models/Exemplar.js';
import Entrega from '../models/Entrega.js';
import { atualizarEmprestimoSchema } from '../validators/emprestimoValidator.js';

export async function listarQuantidadeEmprestimos(req, res) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res. status(401).json({
                mensagem: 'Token não informado!'
            });
        }

        const token = authorization.startsWith('Bearer ')
            ? authorization.split(' ')[1]
            : authorization;
        let dadosToken;

        try {
            dadosToken = jwt.verify(
                token,
                process.env.JWT_SECRET || 'segredo'
            );
        }catch (error) {
            return res.status(401).json({
                mensagem: 'Token inválido ou expirado!'
            });
        }

        if (dadosToken.tipo !== 'usuario') {
            return res.status(403).json({
                mensagem: 'Acesso permitido apenas para usuários!'
            });
        }

        const quantidade = await Emprestimo.count({
            where: {
                user_id: dadosToken.id
            }
        });

        return res.status(200).json({
            quantidade
        });
    } catch (error) {
        console.error('Erro ao listar empréstimos:', error);

        return res.status(500).json({
            mensagem: 'Erro ao obter empréstimos!'
        });
    }
}

export async function criarEmprestimo(req, res) {
    const { token, livro_id, endereco_entrega, tipo_retirada = 'RETIRADA' } = req.body;

    if (!token) {
        return res.status(401).json({
            mensagem: 'Token não informado!'
        });
    }

    if (!['ENTREGA', 'RETIRADA'].includes(tipo_retirada)) {
        return res.status(400).json({
            mensagem: 'Tipo de retirada inválido! Escolha ENTREGA ou RETIRADA.'
        });
    }

    if (!Number.isInteger(livro_id) || livro_id <= 0) {
        return res.status(400).json({
            mensagem: 'Informe um livro_id válido!'
        });
    }

    let dadosToken;

    try {
        dadosToken = jwt.verify(
            token,
            process.env.JWT_SECRET || 'segredo'
        );
    } catch (error) {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado!'
        });
    }

    if (dadosToken.tipo !== 'usuario') {
        return res.status(403).json({
            mensagem: 'Acesso permitido apenas para usuários!'
        });
    }

    try {
        const emprestimo = await sequelize.transaction(async (transaction) => {
            //bloqueia o usuário durante a solciitação
            const usuario = await Usuario.findByPk(dadosToken.id, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!usuario) {
                const erro = new Error('Usuário não encontrado!');
                erro.status = 404;
                throw erro;
            }

            const enderecoCadastrado = [
                usuario.rua,
                usuario.numero,
                usuario.complemento,
                usuario.bairro,
                usuario.cidade,
                usuario.cep
            ].filter(Boolean).join(', ');

            const enderecoEscolhido = endereco_entrega === undefined
                ? enderecoCadastrado
                : endereco_entrega;

            if (
                tipo_retirada === 'ENTREGA' &&
                (
                    typeof enderecoEscolhido !== 'string' ||
                    !enderecoEscolhido.trim() ||
                    enderecoEscolhido.length > 500
                )
            ) {
                const erro = new Error('informe um endereço de entrega válido!');
                erro.status = 400;
                throw erro;
            }

            const quantidadeAtivos = await Emprestimo.count({
                where: {
                    user_id: dadosToken.id,
                    is_devolvido: false
                },
                transaction
            });

            if (quantidadeAtivos >= LIMITE_EMPRESTIMO_ATIVOS) {
                const erro = new Error(
                    'Você já atingiu o limite de 3 empréstimos ativos!'
                );
                erro.status = 400;
                throw erro;
            }

            const emprestimoExistente = await Emprestimo.findOne({
                where: {
                    user_id: dadosToken.id,
                    livro_id,
                    is_devolvido: false
                },
                transaction
            });

            if (emprestimoExistente) {
                const erro = new Error(
                    'Você já possui um empréstimo ativo deste livro!'
                );
                erro.status = 400;
                throw erro;
            }

            const livro = await Livro.findByPk(livro_id, {
                transaction
            });

            if (!livro) {
                const erro = new Error('Livro não encontrado!');
                erro.status = 404;
                throw erro;
            }

            const exemplar = await Exemplar.findOne({
                where: {
                    id_livro: livro_id,
                    disponivel: true
                },
                transaction,
                lock: transaction.LOCK.UPDATE,
                skipLocked: true
            });

            if (!exemplar) {
                const erro = new Error(
                    'Não há exemplares disponíveis deste livro!'
                );
                erro.status = 400;
                throw erro;
            }

            const novoEmprestimo = await Emprestimo.create({
                user_id: dadosToken.id,
                livro_id,
                exemplar_id: exemplar.id,
                tipo_retirada,
                status_retirada: tipo_retirada === 'RETIRADA'
                    ? 'AGUARDANDO_APROVACAO'
                    : null,
                data_emprestimo: dataDeHoje(),
                data_entrega: null,
                is_devolvido: false
            }, { transaction });

            await exemplar.update(
                { disponivel: false },
                { transaction }
            );

            if (tipo_retirada === 'ENTREGA') {
                await Entrega.create({
                    emprestimo_id: novoEmprestimo.id,
                    entregador_id: null,
                    status: 'SOLICITADO',
                    endereco_entrega: enderecoEscolhido.trim()
                }, { transaction });
            }

            return novoEmprestimo;
        });

        return res.status(201).json({
            mensagem: 'Empréstimo criado com sucesso!',
            emprestimo
        });
    } catch (error) {
        console.error('Erro ao criar empréstimo:', error);

        return res.status(error.status || 500).json({
            mensagem: error.status
                ? error.message
                : 'Erro ao criar empréstimo!'
        });
    }
}

const LIMITE_EMPRESTIMO_ATIVOS = 3;

function dataDeHoje() {
    return new Date().toISOString().split("T")[0];
}

export async function atualizarEmprestimo(req, res) {
    try {
        const { token, livro_id, ...dadosAtualizacao } = req.body;

        if (!token) {
            return res.status(401).json({
                mensagem: 'Token não informado!'
            });
        }

        let dadosToken;

        try {
            dadosToken = jwt.verify(
                token,
                process.env.JWT_SECRET || 'segredo'
            );
        } catch (error) {
            return res.status(401).json({
                mensagem: 'Token inválido ou expirado!'
            });
        }

        if (dadosToken.tipo !== 'usuario') {
            return res.status(403).json({
                mensagem: 'Acesso permitido apenas para usuários!'
            });
        }

        if (!Number.isInteger(livro_id) || livro_id <= 0) {
            return res.status(400).json({
                mensagem: 'Informe um livro_id válido!'
            });
        }

        const validacao = atualizarEmprestimoSchema.safeParse(dadosAtualizacao);

        if (!validacao.success) {
            return res.status(400).json({
                mensagem: 'Dados inválidos!',
                erros: validacao.error.flatten()
            });
        }

        if (Object.keys(validacao.data).length === 0) {
            return res.status(400).json({
                mensagem: 'Informe pelo menos um campo para atualizar!'
            });
        }

        const emprestimoAtualizado = await sequelize.transaction( async (transaction) => {
            const emprestimo = await Emprestimo.findOne({
                where: {
                    user_id: dadosToken.id,
                    livro_id: livro_id,
                    is_devolvido: false
                },
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!emprestimo) {
                const erro = new Error('Empréstimo ativo não encontrado!');
                erro.status = 404;
                throw erro;

            }

            const dados = { ...validacao.data };

            if (dados.is_devolvido === true) {
                if (!dados.data_entrega) {
                    dados.data_entrega = dataDeHoje();
                }

                if (emprestimo.exemplar_id !== null) {
                    const exemplar = await Exemplar.findByPk(
                        emprestimo.exemplar_id,
                        {
                            transaction,
                            lock: transaction.LOCK.UPDATE
                        }
                    );

                    if (!exemplar) {
                        const erro = new Error('Exemplar do empréstimo não encontrado!');
                        erro.status = 404;
                        throw erro;
                    }

                    await exemplar.update(
                        { disponivel: true },
                        { transaction }
                    );
                }
            }

            await emprestimo.update(dados, { transaction });

            return emprestimo;

        });

        return res.status(200).json({
            mensagem: 'Empréstimo atualizado com sucesso!',
            emprestimo: emprestimoAtualizado
        });

    } catch (error) {
        console.log("Erro ao atualizar empréstimos: ", error);

        return res.status(error.status || 500).json({
            mensagem: error.status
                ? error.message
                :'Erro ao atualizar empréstimo!'
        });
    }
}

export async function aprovarRetirada(req, res) {
    try {
        const { id } = req.params;

        const emprestimo = await Emprestimo.findByPk(id);

        if (!emprestimo) {
            return res.status(404).json({
                mensagem: 'Empréstimo não encontrado!'
            });
        }

        if (
            emprestimo.tipo_retirada !== 'RETIRADA' ||
            emprestimo.status_retirada !== 'AGUARDANDO_APROVACAO'
        ) {
            return res.status(400).json({
                mensagem: 'Este empréstimo não está aguardando aprovação!'
            });
        }

        await emprestimo.update({
            status_retirada: 'PRONTO_PARA_RETIRADA'
        });

        return res.status(200).json({
            mensagem: 'Retirada aprovada! Livro pronto para retirada.',
            emprestimo
        });
    } catch (error) {
        console.error('Erro ao aprovar retirada: ', error);

        return res.status(500).json({
            mensagem: 'Erro ao aprovar retirada!'
        });
    }
}