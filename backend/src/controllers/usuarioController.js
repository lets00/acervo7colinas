import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { usuarioSchema } from "../validators/usuarioValidator.js";

export async function criarUsuario(req, res) {

    const fotoPerfil = req.files?.fotoPerfil?.[0]?`/perfil/${req.files.fotoPerfil[0].filename}`: null;
    const fotoRg = req.files?.fotoRg?.[0]?`/rg/${req.files.fotoRg[0].filename}`: null;
    const comprovanteResidencial = req.files?.comprovanteResidencial?.[0]?`/residencia/${req.files.comprovanteResidencial[0].filename}`: null;
    
    const dadosParaValidar = {
        ...req.body,
        fotoPerfil,
        fotoRg,
        comprovanteResidencial
    };

    const resultado = usuarioSchema.safeParse(dadosParaValidar);

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
            complemento: dados.endereco.complemento,
            fotoPerfil: dados.fotoPerfil,
            fotoRg: dados.fotoRg,
            comprovanteResidencial: dados.comprovanteResidencial
        });
        
        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso',
            usuario: novoUsuario
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
        }

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