import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";
import Funcionario from "../models/Funcionario.js";
import Entregador from "../models/Entregador.js";

const dadosPerfil = (usuario, tipo) => ({
    id: usuario.id,
    tipo,
    nomeCompleto: usuario.nomeCompleto,
    email: usuario.email,
    telefone: usuario.telefone,
    fotoPerfil: usuario.fotoPerfil,
    rua: usuario.rua,
    numero: usuario.numero,
    complemento: usuario.complemento,
    bairro: usuario.bairro,
    cidade: usuario.cidade,
    cep: usuario.cep,
    cargo: usuario.cargo,
    setor: usuario.setor,
    matricula: usuario.matricula,
    tipoVeiculo: usuario.tipoVeiculo,
});

export async function perfil(req, res) {
    const token = req.headers.authorization?.split(' ');
    if (token?.[0] !== 'Bearer' || !token[1]) {
        return res.status(401).json({ mensagem: 'Faça login para acessar seu perfil.' });
    }

    let sessao;
    try {
        sessao = jwt.verify(token[1], process.env.JWT_SECRET || 'segredo');
    } catch {
        return res.status(401).json({ mensagem: 'Sessão expirada. Faça login novamente.' });
    }

    const modelos = { usuario: Usuario, admin: Funcionario, funcionario: Funcionario, entregador: Entregador };
    const modelo = modelos[sessao.tipo];
    if (!modelo || typeof modelo.findByPk !== 'function') {
        return res.status(401).json({ mensagem: 'Sessão inválida. Faça login novamente.' });
    }
    try {
        const usuario = await modelo.findByPk(sessao.id);
        if (!usuario) return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        return res.json(dadosPerfil(usuario, sessao.tipo));
    } catch {
        return res.status(500).json({ mensagem: 'Não foi possível carregar seu perfil.' });
    }
}

export async function login(req, res) {
    const { email, senha } = req.body;

    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Email e senha são obrigatórios!'
            });
        }

        let tipo = "";
        let usuario = await Usuario.findOne({ where: { email } });
        
        if (usuario) {
            tipo = "usuario";
        } else {
            usuario = await Funcionario.findOne({ where: { email } });
            if (usuario) {
                // Mapear tipos do banco para os perfis das rotas
                if (usuario.tipoAcesso === "Administrador") tipo = "admin";
                else if (usuario.tipoAcesso === "Funcionário comum") tipo = "funcionario";
                else tipo = "funcionario";
            } else {
                usuario = await Entregador.findOne({ where: { email } });
                if (usuario) tipo = "entregador";
            }
        }

        if (!usuario) {
            return res.status(401).json({
                mensagem: 'login ou senha incorreto!'
            });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({
                mensagem: "login ou senha incorreto!"
            });
        }

        const token = jwt.sign(
            { 
                id: usuario.id,
                email: usuario.email,
                tipo: tipo
            },
            process.env.JWT_SECRET || "segredo", // fallback to avoid crash if env is missing
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            token,
            usuario: dadosPerfil(usuario, tipo),
            tipo
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: "login ou senha incorreto",
            erro: error.message
        });
    }
}
