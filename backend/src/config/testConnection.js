import sequelize from "./database.js";

async function testarConexao() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o PostgreSQL realizada com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o PostgreSQL:', error);
    }
}

testarConexao();