import sequelize from "./database.js";
import Funcionario from "../models/Funcionario.js";
import Livro from "../models/Livro.js";

async function syncDataBase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Tabelas sicronizadas com sucesso!');
    } catch (error) {
        console.error('Erro ao sicronizar tabelas!', error);
    }
}

syncDataBase();