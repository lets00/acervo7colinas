import Progresso from '../models/Progresso.js';
import Usuario from '../models/Usuario.js';
import Livro from '../models/Livro.js';
import { progressoSchema } from '../validators/progressoValidator.js';

export const criarProgresso = async (req, res) => {
    const resultado = progressoSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            mensagem: 'Dados inválidos!',
            erros: resultado.error.issues
        });
    }

    const { user_id, livro_id, numero_de_paginas, data } = resultado.data;

    try {
        const usuario = await Usuario.findByPk(user_id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        const livro = await Livro.findByPk(livro_id);

        if (!livro) {
            return res.status(404).json({ mensagem: 'Livro não encontrado.' });
        }

        let progresso = await Progresso.findOne({ where: { user_id, livro_id } });

        if (progresso) {
            await progresso.update({
                numero_de_paginas_lidas: numero_de_paginas,
                data: data ?? new Date()
            });
        } else {
            progresso = await Progresso.create({
                user_id,
                livro_id,
                numero_de_paginas_lidas: numero_de_paginas,
                data: data ?? new Date()
            });
        }

        const livroIncluido = await Progresso.findByPk(progresso.progresso_id, {
            include: [{ model: Livro }]
        });

        return res.status(201).json({
            mensagem: 'Progresso de leitura salvo com sucesso!',
            progresso_id: progresso.progresso_id,
            id: progresso.progresso_id,
            livro_id: progresso.livro_id,
            numero_de_paginas_lidas: progresso.numero_de_paginas_lidas,
            paginasLidas: progresso.numero_de_paginas_lidas,
            totalPaginas: livroIncluido.Livro.quantidadePaginas ?? 0,
            titulo: `${livroIncluido.Livro.titulo} – ${livroIncluido.Livro.autor}`,
            data: progresso.data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro ao salvar progresso de leitura.' });
    }
};

export const listarProgresso = async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ mensagem: 'O id do usuário é obrigatório.' });
    }

    try {
        const usuario = await Usuario.findByPk(user_id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        const progressos = await Progresso.findAll({
            where: { user_id },
            include: [{ model: Livro }]
        });

        const resultado = progressos.map((p) => ({
            id: p.progresso_id,
            progresso_id: p.progresso_id,
            livro_id: p.livro_id,
            titulo: `${p.Livro.titulo} – ${p.Livro.autor}`,
            paginasLidas: p.numero_de_paginas_lidas,
            numero_de_paginas_lidas: p.numero_de_paginas_lidas,
            totalPaginas: p.Livro.quantidadePaginas ?? 0,
            data: p.data
        }));

        return res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro ao listar progresso de leitura.' });
    }
};

export const deletarProgresso = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensagem: 'O id do progresso é obrigatório.' });
    }

    try {
        const progresso = await Progresso.findByPk(id);

        if (!progresso) {
            return res.status(404).json({ mensagem: 'Progresso não encontrado.' });
        }

        await progresso.destroy();

        return res.status(200).json({ mensagem: 'Progresso de leitura removido com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro ao remover progresso de leitura.' });
    }
};
