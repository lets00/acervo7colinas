import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { usuarioSchema } from "../validators/usuarioValidator.js";

export async function criarUsuario(req, res) {
    const resultado = usuarioSchema.safeParse(req.body);

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

        const novoUsuario = await Usuario.create({
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
            complemento: dados.endereco.complemento
        });
        
        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso',
            usuario: novoUsuario
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar usuário!',
            erro: error.message
        });
    }
}

export async function listarUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar usuários',
            erro: error.message
        });
    }
}