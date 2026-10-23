import jwt from 'jsonwebtoken';
import Emprestimo from '../models/Emprestimo.js';
import sequelize from '../config/database.js';
import Usuario from '../models/Usuario.js';
import Livro from '../models/Livro.js';
import Exemplar from '../models/Exemplar.js';
import {
    criarEmprestimoSchema,
    atualizarEmprestimoSchema
} from '../validators/emprestimoValidator.js';
import { th } from 'zod/v4/locales';

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
    try {
        const { token, livro_id } = req.body;

        if (!token) {
            return res.status(401).json({
                mensagem: 'Token não informado!'
            });
        }

        if (!livro_id) {
            return res.status(400).json({
                mensagem: 'O livro_id é obrigatório!'
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

        const emprestimo = await Emprestimo.create({
            user_id: dadosToken.id,
            livro_id,
            data_emprestimo: new Date().toISOString().split('T')[0],
            data_entrega: null,
            is_devolvido: false
        });

        return res.status(201).json({
            mensagem: 'Empréstimo criado com sucesso!',
            emprestimo
        });
    } catch (error) {
        console.error('Erro ao criar empréstimo:', error);

        return res.status(500).json({
            mensagem: 'Erro ao criar empréstimo!'
        });
    }
    
}

const PRAZO_DIAS = 14;
const LIMITE_EMPRESTIMO_ATIVOS = 3;

function dataDeHoje() {
    return new Date().toISOString().split("T")[0];
}

function somarDias(data, dias) {
    const resultado = new Date(`${data}T12:00:00Z`);
    resultado.setUTCDate(resultado.getUTCDate() + dias);
    return resultado.toISOString().split("T")[0];
}

export async function criarEmprestimos(req, res) {
    const validacao = criarEmprestimoSchema.safeParse(req.body);

    if (!validacao.success) {
        return res.status(400).json({
            mensagem: "Dados inválidos!",
            erros: validacao.error.flatten()
        });
    }

    const { user_id, livro_ids } = validacao.data;
    const livrosUnicos = [...new Set(livro_ids)];

    try {
        const emprestimos = await sequelize.transaction(async (transaction) => {
            const usuario = await Usuario.findByPk(user_id, { transaction });

            if (!usuario) {
                const erro = new Error("Usuário não encontrado!");
                erro.status = 404;
                throw erro;
            }

            const ativos = await Emprestimo.count({
                where: { user_id, is_devolvido: false },
                transaction
            });

            if (ativos + livrosUnicos.length > LIMITE_EMPRESTIMO_ATIVOS) {
                const erro = new Error("Limite de 3 empréstimos ativos excedido!");
                erro.status = 400;
                throw erro;
            }

            const criados = [];

            for (const livro_id of livrosUnicos) {
                const livro = await Livro.findByPk(livro_id, { transaction });

                if (!livro) {
                    const erro = new Error(`Livro ${livro_id} não encontrado!`);
                    erro.status = 404;
                    throw erro;
                }

                const repetido = await Emprestimo.findOne({
                    where: { user_id, livro_id, is_devolvido: false },
                    transaction
                });

                if (repetido) {
                    const erro = new Error("Usuário já possui empréstimo ativo desse livro!")
                    erro.status = 400;
                    throw erro;
                }

                const exemplar = await Exemplar.findOne({
                    where: { id_livro: livro_id, disponivel: true},
                    transaction,
                    lock: transaction.LOCK.UPDATE
                });

                if (!exemplar) {
                    const erro = new Error(`Não há exemplar disponível do livro ${livro_id}!`);
                    erro.status = 400;
                    throw erro;
                }
                
                const hoje = dataDeHoje();

                const emprestimo = await Emprestimo.create({
                    user_id,
                    livro_id,
                    data_emprestimo: hoje,
                    data_entrega: somarDias(hoje, PRAZO_DIAS),
                    is_devolvido: false
                }, { transaction });

                await exemplar.update(
                    { disponivel: false },
                    { transaction }
                );

                criados.push(emprestimo);
            }

            return criados;
        });

        return res.status(201).json({
            mensagem: "Empréstimos criados com sucesso!",
            emprestimos
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            mensagem: error.status
                ? error.message
                : "Erro ao criar empréstimos!"
        });
    }
}