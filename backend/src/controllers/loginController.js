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

        let usuario = await Usuario.findOne({ where: { email } }) || await Funcionario.findOne({ where: { email } }) || await Entregador.findOne({ where: { email } });

        if (!Usuario) {
            return res.status(401).json({
                mensagem: 'Email não cadastrado!'
            });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json ({
                mensagem: "Senha inválida"
            });
        }

        const token = jwt.sign(
            { 
                id: usuario.id,
                email: usuario.email,
                tipo
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json(200).json({
            mensagem: "Login realizado com sucesso!",
            token,
            usuario
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao realizar login!",
            erro: error.message
        });
    }
}