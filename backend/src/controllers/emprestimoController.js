import jwt from 'jsonwebtoken';
import Emprestimo from '../models/Emprestimo.js';

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