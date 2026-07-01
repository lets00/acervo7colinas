// acervo7colinas\backend\src\controllers\livroController.js
import { livroSchema } from '../validators/livroValidator.js';
import Livro from '../models/Livro.js';
import Exemplar from '../models/Exemplar.js';

export async function buscarLivroPorId(req, res) {
    const { id } = req.params;

    try {
        const livro = await Livro.findByPk(id); // ou Livro.findOne({ where: { id } })

        if (!livro) {
            return res.status(404).json({ mensagem: "Livro não encontrado" });
        }

        return res.json(livro);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao buscar livro!",
            erro: error.message
        });
    }
}

export async function listarExemplares(req, res) {
    const { id } = req.params;

    try {
        const livro = await Livro.findByPk(id);

        if (!livro) {
            return res.status(404).json({
                mensagem: 'Livro não encontrado!'
            });
        }

        const exemplares = await Exemplar.findAll({
            where: { id_livro: id },
            attributes: ['id', 'id_livro', 'disponivel', 'data_aquisicao', 'secao']
        });

        return res.json(exemplares);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar exemplares!',
            erro: error.message
        });
    }
}

// "Os leitores também gostaram"
export function listarRelacionados(req, res) {
    const { id } = req.params;

    const relacionadosPorLivro = {
        1: [
            {
                id: 2,
                img: "/capas/fundamentos-de-arquitetura-de-software.jpg",
                titulo: "Fundamentos de Arquitetura de Software",
                avaliacao: 4.5
            },
            {
                id: 3,
                img: "/capas/designing-data-intensive.jpg",
                titulo: "Designing Data-Intensive Applications",
                avaliacao: 4.5
            },
            {
                id: 4,
                img: "/capas/algoritmos.jpg",
                titulo: "Algoritmos",
                avaliacao: 4.5
            },
            {
                id: 5,
                img: "/capas/python-fluente.jpg",
                titulo: "Python Fluente",
                avaliacao: 4.5
            },
            {
                id: 6,
                img: "/capas/o-programador-pragmatico.jpg",
                titulo: "O Programador Pragmático",
                avaliacao: 4.5
            }
        ]
    };

    const relacionados = relacionadosPorLivro[id];

    if (!relacionados) {
        return res.status(404).json({ mensagem: "Livros relacionados não encontrados para este livro" });
    }

    res.json(relacionados);
}


//"Avaliações e comentários"
export function listarAvaliacoes(req, res) {
    const { id } = req.params;

    const avaliacoesPorLivro = {
        1: [
            {   
                id: 1,
                usuario: "Omar Sundaram",
                avaliacao: 4,
                comentario: "Muito bom para quem quer aprender boas práticas.",
                tempo: "9 horas atrás"
            },
            {
                id: 2,
                usuario: "Anna Gomes",
                avaliacao: 5,
                comentario: "Livro excelente para desenvolvedores.",
                tempo: "1 dia atrás"
            }
        ]
    };

    const avaliacoes = avaliacoesPorLivro[id];

    if (!avaliacoes) {
        return res.status(404).json({ mensagem: "Avaliações não encontradas para este livro" });
    }

    res.json(avaliacoes);
}

// cadastro de livros

export async function criarLivro(req, res) {

    console.log(req.file);

    const dados = {
        ...req.body,
        ano: Number(req.body.ano),
        quantidadeExemplares: Number(req.body.quantidadeExemplares),
        img: req.file ? `/capas/${req.file.filename}`: null
    };

    const resultado = livroSchema.safeParse(dados);

    if (!resultado.success) {
        return res.status(400).json({
            mensagem: 'Erro na validação dos dados!',
            erros: resultado.error.issues
        });
    }

    try {
       const novoLivro = await Livro.create(resultado.data);

       return res.status(201).json({
            mensagem: 'Livro cadastrado com sucesso!',
            livro: novoLivro
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                mensagem: 'Já existe um livro cadastrado com este ISBN!'
            });
        }

        return res.status(500).json({
            mensagem: 'Erro ao cadastrar livro!',
            erro: error.message
        });
    }  
}

export async function listarLivros(req, res) {
    try {
        const livros = await Livro.findAll();

        return res.json(livros);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao listar livros!",
            erro: error.message
        });
    }
}