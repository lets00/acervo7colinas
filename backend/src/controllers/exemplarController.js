import Exemplar from '../models/Exemplar.js';
import { exemplarSchema, atualizarExemplarSchema } from '../validators/exemplarValidator.js';

export async function criarExemplar(req, res) {
    const resultado = exemplarSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            mensagem: 'Dados inválidos!',
            erros: resultado.error.issues
        });
    }

    try {
        const exemplar = await Exemplar.create(resultado.data);

        return res.status(201).json({
            mensagem: 'Exemplar cadastrado com sucesso!',
            exemplar
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar exemplar!',
            erro: error.message
        });
    }
}

export async function listarExemplares(req, res) {
    try {
        const exemplares = await Exemplar.findAll();

        return res.json(exemplares);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar exemplares!',
            erro: error.message
        });
    }
}

export async function atualizarExemplar(req, res) {
    const { id } = req.params;

    try {
        const exemplar = await Exemplar.findByPk(id);

        if (!exemplar) {
            return res.status(404).json({
                mensagem: 'Exemplar não encontrado!'
            });
        }

        const resultado = atualizarExemplarSchema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({
                mensagem: 'Dados inválidos!',
                erros: resultado.error.issues
            });
        }

        await exemplar.update(resultado.data);

        return res.json({
            mensagem: 'Exemplar atualizado com sucesso!',
            exemplar
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao atualizar exemplar!',
            erro: error.message
        });
    }
}

export async function deletarExemplar(req, res) {
    const { id } = req.params;

    try {
        const exemplar = await Exemplar.findByPk(id);

        if (!exemplar) {
            return res.status(404).json({
                mensagem: 'Exemplar não encontrado!'
            });
        }

        await exemplar.destroy();

        return res.json({
            mensagem: 'Exemplar deletado com sucesso!'
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao deletar exemplar!',
            erro: error.message
        });
    }
}