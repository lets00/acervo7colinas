import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('acervo7colinas', 'postgres', 'postgres123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

export default sequelize;