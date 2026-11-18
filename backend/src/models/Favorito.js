import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Livro from './Livro.js';

const Favorito = sequelize.define('Favorito', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'favoritos',
    timestamps: false
});

Usuario.hasMany(Favorito, {
    foreignKey: 'user_id'
});

Favorito.belongsTo(Usuario, {
    foreignKey: 'user_id'
});

Livro. hasMany(Favorito, {
    foreignKey: 'livro_id'
});

Favorito. belongsTo(Livro, {
    foreignKey: 'livro_id'
});

export default Favorito;