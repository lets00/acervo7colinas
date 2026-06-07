import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";
import Funcionario from "../models/Funcionario.js";
import Entregador from "../models/Entregador.js";

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
                mensagem: 'Email não cadastrado!'
            });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({
                mensagem: "Senha inválida"
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
            usuario,
            tipo
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: "login ou senha incorreto",
            erro: error.message
        });
    }
}