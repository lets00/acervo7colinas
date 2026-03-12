const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

//Rota Destaques
app.get('/destaques', (req, res) => {
    const destaques = [
        {
            img: "/capas/1984.jpg",
            titulo: "1984",
            avaliacao: 4.5
        },
        {
            img: "/capas/a-hora-da-estrela.jpg",
            titulo: "A hora da estrela",
            avaliacao: 4.5
        },
        {
            img: "/capas/harry-potter-e-a-pedra-filosofal.jpg",
            titulo: "Harry Potter e a Pedra Filosofal",
            avaliacao: 4.5
        },
        {
            img: "/capas/memorias-postumas-de-bras-cubas.jpg",
            titulo: "Memorias Póstumas de Brás Cubas",
            avaliacao: 4.5
        },
        {
            img: "/capas/uma-dobra-no-tempo.jpg",
            titulo: "Uma Dobra no Tempo",
            avaliacao: 4.5
        },
    ];
    res.json(destaques);
});

//Rota Novidades
app.get('/novidades', (req, res) => {
    const novidades = [
        {
            img: "/capas/a-culpa-e-das-estrelas.jpg",
            titulo: "A Culpa é das Estrelas",
            avaliacao: 4.5
        },
        {
            img: "/capas/alice-no-pais-das-maravilhas.jpg",
            titulo: "Alice no País das Maravilhas",
            avaliacao: 4.5
        },
        {
            img: "/capas/o-hobbit.jpg",
            titulo: "O Hobbit",
            avaliacao: 4.5
        },
        {
            img: "/capas/o-homem-invisivel.jpg",
            titulo: "O Homem Invisível",
            avaliacao: 4.5
        },
        {
            img: "/capas/os-miseraveis.jpg",
            titulo: "Os Miseráveis",
            avaliacao: 4.5
        },
    ];
    res.json(novidades);
});

//Rota Agendas
app.get('/agendas', (req, res) => {
    const agendas = [
        {
            data: "12/02/2026",
            hora: "18:00",
            tema: "Futuros Distópicos",
            obra: "1984 (George Orwell)",
            celebrador: "Carlos Drumond",
            local: "Biblioteca Luiz Brasil",
        },
        {
            data: "19/02/2026",
            hora: "19:00",
            tema: "Realismo Fantástico",
            obra: "Cem Anos de Solidão",
            celebrador: "Maria Clara",
            local: "Biblioteca Luiz Brasil",
        },
        {
            data: "26/02/2026",
            hora: "18:30",
            tema: "Mistérios e Enigmas",
            obra: "Sherlock Holmes",
            celebrador: "André Neves",
            local: "Biblioteca Luiz Brasil",
        },
    ];
    res.json(agendas);
});

// Rota detalhes do livro
app.get('/livros/:id', (req, res) => {
    const { id } = req.params;

    const livros = {
        1: {
            id: 1,
            img: "/capas/o-codificador-limpo.jpg",
            titulo: "O Codificador Limpo",
            autor:"Robert C. Martin",
            avaliacao: 4.5,
            editora: "Alta Books",
            paginas: 216,
            ano: 2020,
            isbn: "9788550819341",
            idioma: "Português",
            generos: ["Tecnologia", "Programação", "Software"],
            descricao: "Então você quer ser um profissional do desenvolvimento de softwares. Quer erguer a cabeça e declarar para o mundo: “Eu sou um profissional!”. Quer que as pessoas olhem para você com respeito e o tratem com consideração. Você quer isso tudo. Certo? O termo “Profissionalismo” é, sem dúvida, um distintivo de honra e orgulho, mas também é um marcador de incumbência e responsabilidade, que inclui trabalhar bem e honestamente. Verdadeiros profissionais praticam e trabalham firme para manter suas habilidades afiadas e prontas. Não é o bastante simplesmente fazer suas tarefas diárias e chamar isso de prática. Realizar seu trabalho diário é performance, e não prática. Prática é quando você especificamente exercita as habilidades fora do seu ambiente de trabalho..."
        }
    };
    const livro = livros[id];

    if (!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    res.json(livro);
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});