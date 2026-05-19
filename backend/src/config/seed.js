import sequelize from "./database.js";
import Funcionario from "../models/Funcionario.js";
import Livro from "../models/Livro.js";
import Usuario from "../models/Usuario.js";
import Entregador from "../models/Entregador.js";
import bcrypt from "bcrypt";

async function seedDatabase() {
    try {
        await sequelize.sync({ alter: true });

        const senhaPadrao = await bcrypt.hash("123456", 10);

        await Usuario.findOrCreate({
            where: { email: "usuario@acervo7colinas.com.br" },
            defaults: {
                nomeCompleto: 'Usuário Teste',
                cpf: '00000000001',
                rg: '1234567',
                sexo: 'Feminino',
                dataNascimento: '2001-11-01',
                email: 'admin@acervo7colinas.com.br',
                telefone: '87999990001',
                senha: senhaPadrao,
                rua: 'Rua das flores',
                numero: '123',
                cep: '55290000',
                bairro: 'Centro',
                cidade: 'Garanhuns',
                complemento: 'Apto 101',
                fotoPerfil: null,
                fotoRg: null,
                comprovanteResidencial: null
            }
        });

        await Funcionario.findOrCreate({
            where: { email: "funcionario@acervo7colinas.com.br" },
            defaults: {
                nomeCompleto: 'Funcionário Teste',
                cpf: '00000000002',
                matricula: 'FUN001',
                cargo: 'Atendente',
                setor: 'Atendimento',
                email: 'admin@acervo7colinas.com.br',
                telefone: '87999880001',
                senha: senhaPadrao,
                tipoAcesso: 'Funcionario',
                disponibilidade: 'Ativo',
                fotoPerfil: null
            }
        });

        await Funcionario.findOrCreate({
            where: { email: "admin@acervo7colinas.com.br" },
            defaults: {
                nomeCompleto: "Débora Gomes",
                cpf: "00000000003",
                matricula: 'FUN001',
                cargo: 'Atendente',
                setor: 'Atendimento',
                sexo: "Feminino",
                dataNascimento: "2001-10-16",
                email: "admin@acervo7colinas.com.br",
                telefone: "87999998822",
                senha: senhaUsuarioTeste,
                rua: "Rua dos palmares",
                numero: "01",
                cep: "55290000",
                bairro: "heliopolis",
                cidade: "garanhuns",
                complemento: "casa"
            }
        });

        await Entregador.findOrCreate({
            where: { email: "entregador@acervo7colinas.com.br" },
            defaults: {
                nomeCompleto: 'Entregador Teste',
                cpf: '00000000004',
                rg: '7234567',
                sexo: 'Masculino',
                dataNascimento: '2001-12-22',
                email: 'entregador@acervo7colinas.com.br',
                telefone: '87999991101',
                senha: senhaPadrao,
                rua: 'Rua das entregas',
                numero: '42',
                cep: '55290000',
                bairro: 'Centro',
                cidade: 'Garanhuns',
                complemento: 'casa',
                tipoVeiculo: 'Moto',
                disponibilidade: 'Manhã',
                placa: 'ABC1D23',
                tipoBicicleta: null,
                tamanhoBolsa: 'Grande',
                fotoPerfil: null,
                fotoCnh: null
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788550819341" },
            defaults: {
                titulo: "O Codificador Limpo",
                autor: "Robert C. Martin",
                isbn: "9788550819341",
                editora: "Alta Books",
                ano: 2020,
                descricao: "Então você quer ser um profissional do desenvolvimento de softwares. Quer erguer a cabeça e declarar para o mundo: “Eu sou um profissional!”. Quer que as pessoas olhem para você com respeito e o tratem com consideração. Você quer isso tudo. Certo? O termo “Profissionalismo” é, sem dúvida, um distintivo de honra e orgulho, mas também é um marcador de incumbência e responsabilidade, que inclui trabalhar bem e honestamente.",
                quantidadeExemplares: 2,
                genero: "Tecnologia",
                img: "/capas/o-codificador-limpo.jpg"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788535914849" },
            defaults: {
                titulo: "1984",
                autor: "George Orwell",
                isbn: "9788535914849",
                editora: "Companhia das Letras",
                ano: 2009,
                descricao: "Em um futuro próximo, um único soberano governa o estado totalitário da Oceania: o Grande Irmão. Embora nunca tenha sido visto, ninguém escapa à vigilância asfixiante do olho que tudo vê.",
                quantidadeExemplares: 3,
                genero: "Distopia",
                img: "/capas/1984.jpg"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788532508126" },
            defaults: {
                titulo: "A Hora da Estrela",
                autor: "Clarice Lispector",
                isbn: "9788532508126",
                editora: "Rocco",
                ano: 1998,
                descricao: "Pouco antes de morrer, em 1977, Clarice Lispector decide se afastar da inflexão intimista que caracteriza sua escrita para desafiar a realidade.",
                quantidadeExemplares: 4,
                genero: "Literatura Brasileira",
                img: "/capas/a-hora-da-estrela.jpg"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788532530783" },
            defaults: {
                titulo: "Harry Potter e a Pedra Filosofal",
                autor: "J. K. Rowling",
                isbn: "9788532530783",
                editora: "Rocco",
                ano: 2017,
                descricao: "Harry Potter é um garoto cujos pais, feiticeiros, foram assassinados por um poderosíssimo bruxo quando ele ainda era um bebê.",
                quantidadeExemplares: 5,
                genero: "Fantasia",
                img: "/capas/harry-potter-e-a-pedra-filosofal.jpg"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788520933838" },
            defaults: {
                titulo: "Memórias Póstumas de Brás Cubas",
                autor: "Machado de Assis",
                isbn: "9788520933838",
                editora: "Nova Fronteira",
                ano: 2014,
                descricao: "Em 1881, Machado de Assis lançou aquele que seria um divisor de águas não só em sua obra, mas na literatura brasileira.",
                quantidadeExemplares: 3,
                genero: "Literatura Brasileira",
                img: "/capas/memorias-postumas-de-bras-cubas.jpg"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788595081536" },
            defaults: {
                titulo: "Uma Dobra no Tempo",
                autor: "Madeleine L'Engle",
                isbn: "9788595081536",
                editora: "HarperCollins",
                ano: 2018,
                descricao: "Após uma noite de forte tempestade, uma visita estranha chega à casa da família Murry e convoca Meg e seu irmão Charles Wallace para uma aventura extraordinária.",
                quantidadeExemplares: 1,
                genero: "Ficção Científica",
                img: "/capas/uma-dobra-no-tempo.jpg"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788580572261" },
            defaults: {
                titulo: "A Culpa é das Estrelas",
                autor: "John Green",
                isbn: "9788580572261",
                editora: "Intrínseca",
                ano: 2012,
                descricao: "Hazel Grace Lancaster e Augustus Waters são dois adolescentes que se conhecem em um grupo de apoio para pacientes com câncer.",
                quantidadeExemplares: 2,
                genero: "Romance",
                img: "/capas/a-culpa-e-das-estrelas.jpg"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788537813386" },
            defaults: {
                titulo: "Alice no País das Maravilhas",
                autor: "Lewis Carroll",
                isbn: "9788537813386",
                editora: "Zahar",
                ano: 2015,
                descricao: "Alice é despertada de um leve sono ao pé de uma árvore por um coelho peculiar e segue uma aventura fantástica.",
                quantidadeExemplares: 3,
                genero: "Fantasia",
                img: "/capas/alice-no-pais-das-maravilhas.jpg"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788595084742" },
            defaults: {
                titulo: "O Hobbit",
                autor: "J. R. R. Tolkien",
                isbn: "9788595084742",
                editora: "HarperCollins",
                ano: 2019,
                descricao: "Bilbo Bolseiro era um dos hobbits mais respeitáveis do Condado até que o mago Gandalf bate à sua porta.",
                quantidadeExemplares: 3,
                genero: "Fantasia",
                img: "/capas/o-hobbit.jpg"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788544001608" },
            defaults: {
                titulo: "Os Miseráveis",
                autor: "Victor Hugo",
                isbn: "9788544001608",
                editora: "Martin Claret",
                ano: 2014,
                descricao: "Um clássico da literatura mundial que denuncia injustiças humanas através da história de Jean Valjean.",
                quantidadeExemplares: 1,
                genero: "Clássico",
                img: "/capas/os-miseraveis.jpg"
            }
        });

        console.log('Tabelas sincronizadas e banco populado com sucesso!');
    } catch (error) {
        console.error('Erro ao popular o banco:', error);
    }
}

seedDatabase();