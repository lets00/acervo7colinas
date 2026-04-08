// acervo7colinas\backend\src\controllers\livroController.js
import { livroSchema } from '../validators/livroValidator.js';

export function buscarLivroPorId(req, res) {
    const { id } = req.params;

    const livros = {
        1: {
            id: 1,
            img: "/capas/o-codificador-limpo.jpg",
            titulo: "O Codificador Limpo",
            autor: "Robert C. Martin",
            avaliacao: 4.0,
            editora: "Alta Books",
            paginas: 216,
            ano: 2020,
            isbn: "9788550819341",
            idioma: "Português",
            generos: ["Tecnologia", "Programação", "Software"],
            descricao: "Então você quer ser um profissional do desenvolvimento de softwares. Quer erguer a cabeça e declarar para o mundo: “Eu sou um profissional!”. Quer que as pessoas olhem para você com respeito e o tratem com consideração. Você quer isso tudo. Certo? O termo “Profissionalismo” é, sem dúvida, um distintivo de honra e orgulho, mas também é um marcador de incumbência e responsabilidade, que inclui trabalhar bem e honestamente. Verdadeiros profissionais praticam e trabalham firme para manter suas habilidades afiadas e prontas. Não é o bastante simplesmente fazer suas tarefas diárias e chamar isso de prática. Realizar seu trabalho diário é performance, e não prática. Prática é quando você especificamente exercita as habilidades fora do seu ambiente de trabalho com o único propósito de potencializá-las. O Codificador Limpo contém muitos conselhos pragmáticos que visam transformar o comportamento do profissional de software. O autor transmite valiosos ensinamentos sobre ética, respeito, responsabilidade, sinceridade e comprometimento, através de sua experiência como programador."
        }
    };

    const livro = livros[id];

    if (!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    res.json(livro);
}

//"Exemplares"
export function listarExemplares(req, res) {
    const { id } = req.params;

    const exemplaresPorLivro = {
        1: [
            {
                id: 1008,
                secao: "Informática",
                disponivel: true
            },
            {
                id: 1007,
                secao: "Informática",
                disponivel: false
            },
            {
                id: 1006,
                secao: "Informática",
                disponivel: true
            }
        ]
    };

    const exemplares = exemplaresPorLivro[id];

    if (!exemplares) {
        return res.status(404).json({ mensagem: "Exemplares não encontrados para este livro" });
    }

    res.json(exemplares);
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

export function criarLivro(req, res) {
    const resultado = livroSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            mensagem: 'Erro na validação dos dados!',
            erros: resultado.error.issues
        });
    }

    const {
        titulo,
        autor,
        isbn,
        editora,
        ano,
        descricao,
        quantidadeExemplares,
        genero
    } = resultado.data;

    const novoLivro = {
        id: Date.now(),
        titulo,
        autor,
        isbn,
        editora,
        ano,
        descricao,
        quantidadeExemplares,
        genero,
    };

    return res.status(201).json({
        mensagem: 'Livro cadastrado com sucesso!',
        livro: novoLivro
    });
}