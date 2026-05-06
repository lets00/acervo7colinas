import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email }});

        if (!usuario) {
            return res.status(500).json({
                mensagem: "Senha inválida!"
            });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json ({
                mensagem: "Senha inválida"
            });
        }

        const token = jwt.sign(
            { email: usuario.email },
            "segredo",
            { expiresIn: "1h"}
        );

        return res.json({
            mensagem: "Login realizado com sucesso!",
            token
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro no login!",
            erro: error.message
        });
    }
}