import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Livro from './Livro.js';

const Exemplar = sequelize.define('Exemplar', {
    id_livro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Livro,
            key: 'id'
        }
    },
    disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    data_aquisicao: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    secao: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'exemplares',
    timestamps: false
});

Livro.hasMany(Exemplar, {
    foreignKey: 'id_livro',
    onDelete: 'CASCADE'
});

Exemplar.belongsTo(Livro, {
    foreignKey: 'id_livro'
});

export default Exemplar;