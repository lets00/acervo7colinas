import Desejo from '../models/Desejo.js';
import Usuario from '../models/Usuario.js';
import Livro from '../models/Livro.js';

export const criarDesejo = async (req, res) => {
    try {
        const { user_id, livro_id } = req.body;

        if (!user_id || !livro_id) {
            return res.status(400).json({
                mensagem: 'O usuário e o livro são obrigatórios.'
            });
        }

        const usuario = await Usuario.findByPk(user_id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        const livro = await Livro.findByPk(livro_id);

        if (!livro) {
            return res.status(404).json({
                mensagem: 'Livro não encontrado.'
            });
        }

        const desejoExistente = await Desejo.findOne({
            where: {
                user_id,
                livro_id
            }
        });

        if (desejoExistente) {
            return res.status(409).json({
                mensagem: 'Este livro já está na lista Quero Ler.'
            });
        }

        const desejo = await Desejo.create({
            user_id,
            livro_id
        });

        return res.status(201).json({
            mensagem: 'Livro adicionado à lista Quero Ler.',
            desejo
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: 'Erro ao adicionar livro à lista Quero Ler.'
        });
    }
};

export const listarDesejos = async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({
                mensagem: 'O id do usuário é obrigatório.'
            });
        }

        const usuario = await Usuario.findByPk(user_id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        const desejos = await Desejo.findAll({
            where: {
                user_id
            },
            include: [
                {
                    model: Livro
                }
            ]
        });

        return res.status(200).json(desejos);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: 'Erro ao listar livros da lista Quero Ler.'
        });
    }
};

export const deletarDesejo = async (req, res) => {
    try {
        const { user_id, livro_id } = req.body;

        if (!user_id || !livro_id) {
            return res.status(400).json({
                mensagem: 'O usuário e o livro são obrigatórios.'
            });
        }

        const desejo = await Desejo.findOne({
            where: {
                user_id,
                livro_id
            }
        });

        if (!desejo) {
            return res.status(404).json({
                mensagem: 'Livro não encontrado na lista Quero Ler.'
            });
        }

        await desejo.destroy();

        return res.status(200).json({
            mensagem: 'Livro removido da lista Quero Ler.'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: 'Erro ao remover livro da lista Quero Ler.'
        });
    }
};