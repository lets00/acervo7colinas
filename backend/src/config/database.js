import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('acervo7colinas', 'postgres', 'postgres123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

export default sequelize;