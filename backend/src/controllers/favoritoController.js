import jwt from 'jsonwebtoken';
import Favorito from '../models/Favorito.js';
import Livro from '../models/Livro.js';

export async function listarFavoritos(req, res) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            mensagem: 'Token não informado!'
        });
    }

    const token = authorization.startsWith('Bearer')
        ? authorization.split(' ')[1]
        : authorization;

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

    if (dadosToken.tipo !== 'usuario') {
        return res.status(403).json({
            mensagem: 'Acesso permitido apenas para usuários!'
        });
    }

    try {
        const favoritos = await Favorito.findAll({
            where: {
                user_id: dadosToken.id
            },
            include: [{
                model: Livro
            }]
        });

        return res.status(200).json({
            favoritos
        });
    } catch (error) {
        console.log('Erro ao listar favoritos:', error);

        return res.status(500).json({
            mensagem: 'Erro ao buscar favoritos!'
        });
    }
}

export async function adicionarFavorito(req, res) {
    const { token, livro_id } = req.body;

    if (!token) {
        return res.status(401).json({
            mensagem: 'Token não informado!'
        });
    }

    if (!Number.isInteger(livro_id) || livro_id <= 0) {
        return res.status(400).json({
            mensagem: 'Informe um livro_id válido!'
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

    if (dadosToken.tipo !== 'usuario') {
        return res.status(403).json({
            mensagem: 'Acesso permitido apenas para usuários!'
        });
    }

    try {
        const livro = await Livro.findByPk(livro_id);

        if (!livro) {
            return res.status(404).json({
                mensagem: 'Livro não encontrado!'
            });
        }

        const [favorito, criado] = await Favorito.findOrCreate({
            where: {
                user_id: dadosToken.id,
                livro_id: livro_id
            },
            defaults: {
                user_id: dadosToken.id,
                livro_id: livro_id
            }
        });

        if (!criado) {
            return res.status(409).json({
                mensagem: 'Este livro já está nos seus favoritos!'
            });
        }

        return res.status(201).json({
            mensagem: 'Livro adicionado aos favoritos!',
            favorito
        });
    } catch (error) {
        console.error('Erro ao adicionar favorito:', error);

        return res.status(500).json({
            mensagem: 'Erro ao adicionar favorito!'
        });
    }
}


export async function removerFavorito(req, res) {
    const { token, livro_id } = req.body;

    if (!token) {
        return res.status(401).json({
            mensagem: 'Token não informado!'
        });
    }

    if (!Number.isInteger(livro_id) || livro_id <= 0) {
        return res.status(400).json({
            mensagem: 'Informe um livro_id válido!'
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

    if (dadosToken.tipo !== 'usuario') {
        return res.status(403).json({
            mensagem: 'Acesso permitido apenas para usuários!'
        });
    }

    try {
        const removidos = await Favorito.destroy({
            where: {
                user_id: dadosToken.id,
                livro_id: livro_id
            }
        });

        if (removidos === 0) {
            return res.status(404).json({
                mensagem: 'Livro não encontrado nos favoritos!'
            });
        }

        return res.status(200).json({
            mensagem: 'Livro removido dos favoritos!'
        });
    } catch (error) {
        console.error('Erro ao remover favorito:', error);

        return res.status(500).json({
            mensagem: 'Erro ao remover favorito!'
        });
    }
}