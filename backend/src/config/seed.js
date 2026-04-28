import sequelize from "./database.js";
import Funcionario from "../models/Funcionario.js";
import Livro from "../models/Livro.js";

async function seedDatabase() {
    try {
        await sequelize.sync({ alter: true });

        await Funcionario.bulkCreate([
            {
                nomeCompleto: 'Administrador do Sistema',
                cpf: '00000000001',
                matricula: 'ADM001',
                cargo: 'Administrador',
                setor: 'Administração',
                email: 'admin@acervo7colinas.com.br',
                telefone: '87999990001',
                tipoAcesso: 'Administrador',
                disponibilidade: 'Ativo'
            },
            {
                nomeCompleto: 'Funcionário da Biblioteca',
                cpf: '00000000002',
                matricula: 'FUN001',
                cargo: 'Atendente',
                setor: 'Atendimento',
                email: 'funcionario@acervo7colinas.com.br',
                telefone: '87999990002',
                tipoAcesso: 'Funcionário comum',
                disponibilidade: 'Ativo'
            },
            {
                nomeCompleto: 'Usuário Teste',
                cpf: '00000000003',
                matricula: 'USR001',
                cargo: 'Usuário',
                setor: 'Usuários',
                email: 'usuario@acervo7colinas.com.br',
                telefone: '87999990003',
                tipoAcesso: 'Usuário',
                disponibilidade: 'Ativo'
            },
            {
                nomeCompleto: 'Entregador Teste',
                cpf: '00000000004',
                matricula: 'ENT001',
                cargo: 'Entregador',
                setor: 'Entregas',
                email: 'entregador@acervo7colinas.com.br',
                telefone: '87999990004',
                tipoAcesso: 'Entregador',
                disponibilidade: 'Ativo'
            }
        ]);

        await Livro.bulkCreate([
            {
                titulo: "O Codificador Limpo",
                autor: "Robert C. Martin",
                isbn: "9788550819341",
                editora: "Alta Books",
                ano: 2020,
                descricao: "Então você quer ser um profissional do desenvolvimento de softwares. Quer erguer a cabeça e declarar para o mundo: “Eu sou um profissional!”. Quer que as pessoas olhem para você com respeito e o tratem com consideração. Você quer isso tudo. Certo? O termo “Profissionalismo” é, sem dúvida, um distintivo de honra e orgulho, mas também é um marcador de incumbência e responsabilidade, que inclui trabalhar bem e honestamente. Verdadeiros profissionais praticam e trabalham firme para manter suas habilidades afiadas e prontas. Não é o bastante simplesmente fazer suas tarefas diárias e chamar isso de prática. Realizar seu trabalho diário é performance, e não prática. Prática é quando você especificamente exercita as habilidades fora do seu ambiente de trabalho com o único propósito de potencializá-las. O Codificador Limpo contém muitos conselhos pragmáticos que visam transformar o comportamento do profissional de software. O autor transmite valiosos ensinamentos sobre ética, respeito, responsabilidade, sinceridade e comprometimento, através de sua experiência como programador.",
                quantidadeExemplares: 2,
                genero: "Tecnologia",
                img: "/capas/o-codificador-limpo.jpg",
            },
            {
                titulo: "1984",
                autor: "George Orwell",
                isbn: "9788535914849",
                editora: "Companhia das Letras",
                ano: 200,
                descricao: "Em um futuro próximo, um único soberano governa o estado totalitário da Oceania: o Grande Irmão. Embora nunca tenha sido visto, ninguém escapa à vigilância asfixiante do olho que tudo vê, ao poder da Polícia do Pensamento ou às imposições do Ministério da Verdade. Nada, entretanto, é aparentemente proibido, pois vigora uma única regra: rejeitar as provas materiais que seus olhos e ouvidos oferecem. Nesse clima de vigilância, Winston Smith, funcionário do Ministério da Verdade e encarregado de reescrever a história conforme a versão oficial do Partido, transcorre seus dias na lúgubre cidade de Londres, repleta de manifestos e fotos do Grande Irmão. A princípio um trabalhador e membro exemplar do partido, seguindo tudo à risca e sem sequer levantar uma questão, Winston vai se dando lentamente conta do universo da mentira onde vive até tomar coragem de participar da organização secreta para destruir o partido com Júlia, sua amada. Ambos lutam para manter vivo dentro de si a pequena semente de humanidade que lhes resta, mas já sabem: ninguém escapa à vigilância do Grande Irmão.",
                quantidadeExemplares: 3,
                genero: "Distopia",
                img: "/capas/1984.jpg",
            },
            {
                titulo: "A Hora da Estrela",
                autor: "Clarice Lispector",
                isbn: "9788532508126",
                editora: "Rocco",
                ano: 1998,
                descricao: "Pouco antes de morrer, em 1977, Clarice Lispector decide se afastar da inflexão intimista que caracteriza sua escrita para desafiar a realidade. O resultado desse salto na extroversão é A hora da estrela, o livro mais surpreendente que escreveu. Se desde Perto do coração selvagem, seu romance de estreia, Clarice estava de corpo inteiro, todo o tempo, no centro de seus relatos, agora a cena é ocupada por personagens que em nada se parecem com ela. A nordestina Macabéa, a protagonista de A hora da estrela, é uma mulher miserável, que mal tem consciência de existir. Depois de perder seu único elo com o mundo, uma velha tia, ela viaja para o Rio, onde aluga um quarto, se emprega como datilógrafa e gasta suas horas ouvindo a Rádio Relógio. Apaixona-se, então, por Olímpico de Jesus, um metalúrgico nordestino, que logo a trai com uma colega de trabalho. Desesperada, Macabéa consulta uma cartomante, que lhe prevê um futuro luminoso, bem diferente do que a espera.",
                quantidadeExemplares: 4,
                genero: "Literatura Brasileira",
                img: "/capas/a-hora-da-estrela.jpg",
            },
            {
                titulo: "Harry Potter e a Pedra Filosofal",
                autor: "J. K. Rowling",
                isbn: "9788532530783",
                editora: "Rocco",
                ano: 2017,
                descricao: "Harry Potter é um garoto cujos pais, feiticeiros, foram assassinados por um poderosíssimo bruxo quando ele ainda era um bebê. Ele foi levado, então, para a casa dos tios que nada tinham a ver com o sobrenatural. Pelo contrário. Até os 10 anos, Harry foi uma espécie de gata borralheira: maltratado pelos tios, herdava roupas velhas do primo gorducho, tinha óculos remendados e era tratado como um estorvo. No dia de seu aniversário de 11 anos, entretanto, ele parece deslizar por um buraco sem fundo, como o de Alice no país das maravilhas, que o conduz a um mundo mágico. Descobre sua verdadeira história e seu destino: ser um aprendiz de feiticeiro até o dia em que terá que enfrentar a pior força do mal, o homem que assassinou seus pais. O menino de olhos verde, magricela e desengonçado, tão habituado à rejeição, descobre, também, que é um herói no universo dos magos. Potter fica sabendo que é a única pessoa a ter sobrevivido a um ataque do tal bruxo do mal e essa é a causa da marca em forma de raio que ele carrega na testa. Ele não é um garoto qualquer, ele sequer é um feiticeiro qualquer ele é Harry Potter, símbolo de poder, resistência e um líder natural entre os sobrenaturais.",
                quantidadeExemplares: 5,
                genero: "Fantasia",
                img: "/capas/harry-potter-e-a-pedra-filosofal.jpg",
            },
            {
                titulo: "Memórias Póstumas de Brás Cubas",
                autor: "Machado de Assis",
                isbn: "9788520933838",
                editora: "Nova Fronteira",
                ano: 2014,
                descricao: "Em 1881, Machado de Assis lançou aquele que seria um divisor de águas não só em sua obra, mas na literatura brasileira: Memórias póstumas de Brás Cubas. Ao mesmo tempo em que marca a fase mais madura do autor, o livro é considerado a transição do romantismo para o realismo. Num primeiro momento, a prosa fragmentária e livre de Memórias póstumas, misturando elegância e abuso, refinamento e humor negro, causou estranheza, inclusive entre a crítica. Com o tempo, no entanto, o defunto autor que dedica sua obra ao verme que primeiro roeu as frias carnes de seu cadáver tornou-se um dos personagens mais populares da nossa literatura. Sua história, uma celebração do nada que foi sua vida, foi transformada em filmes, peças e HQs, e teve incontáveis edições no Brasil e no mundo, conquistando admiradores que vão de Susan Sontag a Woody Allen. Esta edição reproduz o prólogo do próprio autor à terceira edição do livro, em que ele responde às dúvidas dos primeiros leitores. Traz ainda prefácio de Hélio de Seixas Guimarães, professor livre-docente na USP e pesquisador do CNPq, e estabelecimento de texto e notas de Marta de Senna, cocriadora e editora da revista eletrônica Machado de Assis em Linha, e Marcelo Diego, pesquisador da obra de Machado na Universidade Princeton.",
                quantidadeExemplares: 3,
                genero: "Literatura Brasileira",
                img: "/capas/memorias-postumas-de-bras-cubas.jpg",
            },
            {
                titulo: "Uma Dobra no Tempo",
                autor: "Madeleine L'Engle",
                isbn: "9788595081536",
                editora: "HarperCollins",
                ano: 2018,
                descricao: "Um clássico da fantasia e da ficção científica emerge!Após uma noite de forte tempestade, uma visita estranha chega à casa da família Murry e convoca Meg, seu irmão Charles Wallace e o amigo deles, Calvin O'Keefe para uma aventura muito perigosa e extraordinária – uma viagem que ameaçará suas vidas e o nosso universo.Uma dobra no tempo é o primeiro da aclamada série em cinco volumes de Madeleine L'Engle. Sua adaptação cinematográfica chega às telas em uma megaprodução Disney em março de 2018.",
                quantidadeExemplares: 1,
                genero: "Ficção Científica",
                img: "/capas/uma-dobra-no-tempo.jpg",
            },
            {
                titulo: "A Culpa é das Estrelas",
                autor: "John Green",
                isbn: "9788580572261",
                editora: "Intrínseca",
                ano: 2012,
                descricao: "Hazel Grace Lancaster e Augustus Waters são dois adolescentes que se conhecem em um grupo de apoio para pacientes com câncer. Por causa da doença, Hazel sempre descartou a ideia de se envolver amorosamente, mas acaba cedendo ao se apaixonar por Augustus. Juntos, eles viajam para Amsterdã, onde embarcam em uma jornada inesquecível.",
                quantidadeExemplares: 2,
                genero: "Romance",
                img: "/capas/a-culpa-e-das-estrelas.jpg",
            },
            {
                titulo: "Alice no País das Maravilhas",
                autor: "Lewis Carroll",
                isbn: "9788537813386",
                editora: "Zahar",
                ano: 2015,
                descricao: "Uma menina, um coelho e uma história capazes de fazer qualquer um de nós voltar a sonhar. Alice é despertada de um leve sono ao pé de uma árvore por um coelho peculiar. Uma criatura alva e falante com roupas engraçadas, que consulta seu relógio e reclama do próprio atraso. Curiosa como toda criança, Alice segue o animal até cair em um buraco sem fim que mudou para sempre a literatura infantil. Mais de 150 anos depois, Alice no País das Maravilhas continua repleto de ensinamentos para aqueles que ousaram seguir o Coelho Branco até sua toca.",
                quantidadeExemplares: 3,
                genero: "Fantasia",
                img: "/capas/alice-no-pais-das-maravilhas.jpg",
            },
            {
                titulo: "O Hobbit",
                autor: "J. R. R. Tolkien",
                isbn: "9788595084742",
                editora: "HarperCollins",
                ano: 2019,
                descricao: "Bilbo Bolseiro era um dos mais respeitáveis hobbits de todo o Condado até que, um dia, o mago Gandalf bate à sua porta. A partir de então, toda sua vida pacata e campestre soprando anéis de fumaça com seu belo cachimbo começa a mudar. Ele é convocado a participar de uma aventura por ninguém menos do que Thorin Escudo-de-Carvalho, um príncipe do poderoso povo dos Anãos. Esta jornada fará Bilbo, Gandalf e 13 anãos atravessarem a Terra-média, passando por inúmeros perigos, como os imensos trols, as Montanhas Nevoentas infestadas de gobelins ou a muito antiga e misteriosa Trevamata, até chegarem (se conseguirem) na Montanha Solitária. Lá está um incalculável tesouro, mas há um porém. Deitado em cima dele está Smaug, o Dourado, um dragão malicioso que... bem, você terá que ler para descobrir.",
                quantidadeExemplares: 3,
                genero: "Fantasia",
                img: "/capas/o-hobbit.jpg",
            },
            {
                titulo: "Os Miseráveis",
                autor: "Victor Hugo",
                isbn: "9788544001608",
                editora: "Martin Claret",
                ano: 2014,
                descricao: "Um clássico da literatura mundial, esta obra é uma poderosa denúncia a todos os tipos de injustiça humana. Narra a emocionante história de Jean Valjean ― o homem que, por ter roubado um pão, é condenado a dezenove anos de prisão. Os miseráveis é um livro inquietantemente religioso e político, com uma das narrativas mais envolventes já criadas.",
                quantidadeExemplares: 1,
                genero: "Clássico",
                img: "/capas/os-miseraveis.jpg",
            },
        ]);

        console.log('Banco populado com sucesso!');
    } catch (error) {
        console.error('Erro ao popular o banco:', error);
    }
}

seedDatabase();