import bcrypt from 'bcrypt';
import Entregador from '../models/Entregador.js';
import { entregadorSchema } from '../validators/entregadorValidator.js';

export async function criarEntregador(req, res) {
    const resultado = entregadorSchema.safeParse(req.body);

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