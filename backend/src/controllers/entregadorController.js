import bcrypt from 'bcrypt';
import Entregador from '../models/Entregador.js';
import { entregadorSchema } from '../validators/entregadorValidator.js';

export async function criarEntregador(req, res) {

    const fotoPerfil = req.files?.fotoPerfil?.[0]?`/perfil/${req.files.fotoPerfil[0].filename}`:null;
    const fotoCnh = req.files?.fotoCnh?.[0]?`/cnh/${req.files.fotoCnh[0].filename}`:null;

    const dadosParaValidar = {
        ...req.body,
        endereco: {
            rua: req.body.rua,
            numero: req.body.numero,
            cep: req.body.cep,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            complemento: req.body.complemento
        },
        fotoPerfil,
        fotoCnh
    };

    console.log("CAPTCHA: ", req.body.captcha);
    console.log("TIPO CAPTCHA: ", typeof req.body.captcha);


    const resultado = entregadorSchema.safeParse(dadosParaValidar);

    if (!resultado.success) {
        return res.status(400).json({
            mensagem: 'Dados inválidos!',
            erros: resultado.error.issues
        });
    };

    try {
        const dados = resultado.data;

        const [dia, mes, ano] = dados.dataNascimento.split('/');
        const dataNascimentoFormatada = `${ano}-${mes}-${dia}`;

        const senhaCriptografada = await bcrypt.hash(dados.senha, 10);

        const novoEntregador = await Entregador.create({
            nomeCompleto: dados.nomeCompleto,
            cpf: dados.cpf,
            rg: dados.rg,
            sexo: dados.sexo,
            dataNascimento: dataNascimentoFormatada,
            email: dados.email,
            telefone: dados.telefone,
            senha:senhaCriptografada,
            rua: dados.endereco.rua,
            numero: dados.endereco.numero,
            cep: dados.endereco.cep,
            bairro: dados.endereco.bairro,
            cidade: dados.endereco.cidade,
            complemento: dados.endereco.complemento,
            tipoVeiculo: dados.tipoVeiculo,
            disponibilidade: dados.disponibilidade,
            placa: dados.placa,
            tipoBicicleta: dados.tipoBicicleta,
            tamanhoBolsa: dados.tamanhoBolsa,
            fotoPerfil: dados.fotoPerfil,
            fotoCnh: dados.fotoCnh
        });
        
        return res.status(201).json({
            mensagem: 'Entregador cadastrado com sucesso!',
            usuario: novoEntregador
        });

    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError') {

            const campo = error.errors[0].path;

            if (campo === 'email') {
                return res.status(400).json({
                    mensagem: 'Este email já está cadastrado!'
                });
            }

            if (campo === 'cpf') {
                return res.status(400).json({
                    mensagem: 'Este CPF já está cadastrado!'
                });
            }
            
            if (campo === 'placa') {
                return res.status(400).json({
                    mensagem: 'Esta placa já está cadastrada!'
                });
            }
        }

        return res.status(500).json({
            mensagem: 'Erro ao cadastrar entregador!',
            erro: error.message
        });
    }
}

export async function listarEntregadores(req, res) {
    try {
        const entregadores = await Entregador.findAll();
        return res.json(entregadores);
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar entregadores!',
            erro: error.message
        });
    }
}