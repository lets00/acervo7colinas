import sequelize from "./database.js";
import Funcionario from "../models/Funcionario.js";
import Livro from "../models/Livro.js";
import Usuario from "../models/Usuario.js";
import Entregador from "../models/Entregador.js";
import Exemplar from "../models/Exemplar.js";
import Desejo from "../models/Desejo.js";
import Progresso from "../models/Progresso.js";
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
                email: 'usuario@acervo7colinas.com.br',
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
                email: 'funcionario@acervo7colinas.com.br',
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
                nomeCompleto: "Admin Teste",
                cpf: "00000000003",
                matricula: 'ADM001',
                cargo: 'Administrador',
                setor: 'Administração',
                email: "admin@acervo7colinas.com.br",
                telefone: "87999998722",
                senha: senhaPadrao,
                tipoAcesso: 'Administrador',
                disponibilidade: 'Ativo',
                fotoPerfil: null
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
                img: "/capas/o-codificador-limpo.jpg",
                quantidadePaginas: 256,
                idioma: "Português"
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
                img: "/capas/1984.jpg",
                quantidadePaginas: 416,
                idioma: "Português"
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
                img: "/capas/a-hora-da-estrela.jpg",
                quantidadePaginas: 104,
                idioma: "Português"
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
                img: "/capas/harry-potter-e-a-pedra-filosofal.jpg",
                quantidadePaginas: 208,
                idioma: "Português"
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
                img: "/capas/memorias-postumas-de-bras-cubas.jpg",
                quantidadePaginas: 356,
                idioma: "Português"
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
                img: "/capas/uma-dobra-no-tempo.jpg",
                quantidadePaginas: 240,
                idioma: "Português"
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
                img: "/capas/a-culpa-e-das-estrelas.jpg",
                quantidadePaginas: 288,
                idioma: "Português"
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
                img: "/capas/alice-no-pais-das-maravilhas.jpg",
                quantidadePaginas: 208,
                idioma: "Português"
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
                img: "/capas/o-hobbit.jpg",
                quantidadePaginas: 336,
                idioma: "Português"
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
                img: "/capas/os-miseraveis.jpg",
                quantidadePaginas: 1560,
                idioma: "Português"
            }
        });
        await Livro.findOrCreate({
            where: { isbn: "9786555204605" },
            defaults: {
                titulo: "Fundamentos da arquitetura de software: uma abordagem de engenharia: 1",
                autor: "Mark Richards, Neal Ford",
                isbn: "9786555204605",
                editora: "Alta Books",
                ano: 2024,
                descricao: "Fundamentos da Arquitetura de Software No mundo inteiro, pesquisas de salário colocam sistematicamente a arquitetura de software entre os dez melhores empregos, embora não exista nenhum guia real para ajudar os desenvolvedores a se tornarem arquitetos. Até agora. Este livro fornece a primeira visão geral completa de muitos aspectos da arquitetura de software. Aspirantes a arquitetos e os já praticantes examinarão da mesma forma as características e padrões da arquitetura, a determinação de componentes, as arquiteturas de diagramação, de apresentação, evolucionária e muitos outros tópicos. Mark Richards e Neal Ford, profissionais experientes que ensinam arquitetura de software profissionalmente há anos, focam os princípios da arquitetura que se aplicam a todas as camadas da tecnologia. Você explorará a arquitetura de software de um ponto de vista moderno, levando em conta todas as inovações da última década. Este livro examina: Padrão da arquitetura: a base técnica para muitas decisões de arquitetura. Componentes: identificação, acoplamento, coesão, particionamento e granularidade. Habilidades sociais: gestão eficiente da equipe, reuniões, negociação, apresentações etc. Modernidade: práticas de engenharia e abordagens operacionais que mudaram radicalmente nosúltimos anos. Arquitetura como disciplina de engenharia: resultados repetidos, métricas e avaliações concretas que acrescentam rigor à arquitetura de software.",
                quantidadeExemplares: 4,
                genero: "Tecnologia",
                img: "/capas/fundamentos-de-arquitetura-de-software.jpg",
                quantidadePaginas: 432,
                idioma: "Português"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "978-1449373320" },
            defaults: {
                titulo: "Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
                autor: "Martin Kleppmann",
                isbn: "978-1449373320",
                editora: "O'Reilly Media",
                ano: 2017,
                descricao: "Os dados estão no centro de muitos dos desafios do desenvolvimento de sistemas modernos. Questões como escalabilidade, consistência, confiabilidade, eficiência e manutenibilidade precisam ser resolvidas, enquanto uma enorme variedade de tecnologias, como bancos de dados relacionais, bancos NoSQL, processadores de fluxo e lote e sistemas de mensageria, tornam a escolha da arquitetura ideal ainda mais complexa. Neste guia prático e abrangente, Martin Kleppmann explora as vantagens e desvantagens das principais tecnologias de armazenamento e processamento de dados, apresentando os princípios fundamentais por trás dos sistemas distribuídos modernos. O livro ajuda engenheiros e arquitetos de software a tomar decisões mais bem fundamentadas, compreender os trade-offs entre consistência, escalabilidade, tolerância a falhas e complexidade, além de revelar a arquitetura de grandes serviços online e as pesquisas que influenciam os bancos de dados atuais.",
                quantidadeExemplares: 3,
                genero: "Tecnologia",
                img: "/capas/designing-data-intensive.jpg",
                quantidadePaginas: 590,
                idioma: "Inglês"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "9788535236996" },
            defaults: {
                titulo: "Entendendo Algoritmos: Um Guia Ilustrado Para Programadores E Outros Curiosos",
                autor: "Aditya Bhargava",
                isbn: "9788535236996",
                editora: "Novatec",
                ano: 2017,
                descricao: "Um guia ilustrado para programadores e outros curiosos. Um algoritmo nada mais é do que um procedimento passo a passo para a resolução de um problema. Os algoritmos que você mais utilizará como um programador já foram descobertos, testados e provados. Se você quer entendê-los, mas se recusa a estudar páginas e mais páginas de provas, este é o livro certo. Este guia cativante e completamente ilustrado torna simples aprender como utilizar os principais algoritmos nos seus programas. O livro Entendendo Algoritmos apresenta uma abordagem agradável para esse tópico essencial da ciência da computação. Nele, você aprenderá como aplicar algoritmos comuns nos problemas de programação enfrentados diariamente. Você começará com tarefas básicas como a ordenação e a pesquisa. Com a prática, você enfrentará problemas mais complexos, como a compressão de dados e a inteligência artificial. Cada exemplo é apresentado em detalhes e inclui diagramas e códigos completos em Python. Ao final deste livro, você terá dominado algoritmos amplamente aplicáveis e saberá quando e onde utilizá-los. O que este livro inclui A abordagem de algoritmos de pesquisa, ordenação e algoritmos gráficos Mais de 400 imagens com descrições detalhadas Comparações de desempenho entre algoritmos Exemplos de código em Python Este livro de fácil leitura e repleto de imagens é destinado a programadores autodidatas, engenheiros ou pessoas que gostariam de recordar o assunto.",
                quantidadeExemplares: 5,
                genero: "Tecnologia",
                img: "/capas/algoritmos.jpg",
                quantidadePaginas: 256,
                idioma: "Português"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "978-8575224625" },
            defaults: {
                titulo: "Python Fluente",
                autor: "Luciano Ramalho",
                isbn: "978-8575224625",
                editora: "Novatec",
                ano: 2015,
                descricao: "A simplicidade de Python permite que você se torne produtivo rapidamente, porém isso muitas vezes significa que você não estará usando tudo que ela tem a oferecer. Com este guia prático, você aprenderá a escrever um código Python eficiente e idiomático aproveitando seus melhores recursos – alguns deles, pouco conhecidos. O autor Luciano Ramalho apresenta os recursos essenciais da linguagem e bibliotecas de Python mostrando como você pode tornar o seu código mais conciso, mais rápido e mais legível ao mesmo tempo. Muitos programadores experientes tentam dobrar o Python para que ele se enquadre em padrões aprendidos com outras linguagens e jamais descobrem os recursos do Python que estão além de sua experiência. Com este livro, esses programadores Python aprenderão a ser totalmente proficientes em Python 3.Este livro inclui: O modelo de dados do Python: entenda como os métodos especiais são o segredo para o comportamento consistente dos objetos. Estruturas de dados: tire total proveito dos tipos embutidos e entenda a dualidade entre texto e bytes na era do Unicode. Funções como objetos: veja as funções Python como objetos de primeira classe e entenda como isso afeta alguns padrões de projeto populares. Técnicas de orientação a objetos: crie classes após dominar referências, mutabilidade, interfaces, sobrecarga de operadores e herança múltipla. Controle de fluxo: tire proveito de gerenciadores de contexto, geradores.",
                quantidadeExemplares: 3,
                genero: "Tecnologia",
                img: "/capas/python-fluente.jpg",
                quantidadePaginas: 800,
                idioma: "Português"
            }
        });

        await Livro.findOrCreate({
            where: { isbn: "978-8577807000" },
            defaults: {
                titulo: "O Programador Pragmático",
                autor: "Andrew Hunt, David Thomas",
                isbn: "978-8577807000",
                editora: "Bookman",
                ano: 2010,
                descricao: "O Programador Pragmático ilustra as melhores práticas e as principais armadilhas do desenvolvimento de software. Destinado a todos envolvidos com programação, de codificadores iniciantes a programadores experientes e gerentes responsáveis por projetos de software, apresenta lições simples que promovem rápidas melhorias na produtividade pessoal, precisão e satisfação profissional.",
                quantidadeExemplares: 4,
                genero: "Tecnologia",
                img: "/capas/o-programador-pragmatico.jpg",
                quantidadePaginas: 321,
                idioma: "Português"
            }
        });

        const paginasPorIsbn = {
            '9788550819341': 256,
            '9788535914849': 416,
            '9788532508126': 104,
            '9788532530783': 208,
            '9788520933838': 356,
            '9788595081536': 240,
            '9788580572261': 288,
            '9788537813386': 208,
            '9788595084742': 336,
            '9788544001608': 1560,
            '9786555204605': 432,
            '978-1449373320': 590,
            '9788535236996': 256,
            '978-8575224625': 800,
            '978-8577807000': 321
        };

        const livros = await Livro.findAll();

        for (const livro of livros) {
            const quantidadePaginas = paginasPorIsbn[livro.isbn];

            if (quantidadePaginas && livro.quantidadePaginas !== quantidadePaginas) {
                await livro.update({ quantidadePaginas });
            }
        }

        for (const livro of livros) {
            const totalExistente = await Exemplar.count({
                where: { id_livro: livro.id }
            });

            if (totalExistente === 0) {
                for (let i = 1; i <= livro.quantidadeExemplares; i++) {
                    await Exemplar.create({
                        id_livro: livro.id,
                        disponivel: i % 2 !== 0,
                        data_aquisicao: new Date(),
                        secao: livro.genero
                    });
                }
            }
        }

        console.log('Tabelas sincronizadas e banco populado com sucesso!');
    } catch (error) {
        console.error('Erro ao popular o banco:', error);
    }
}

seedDatabase();