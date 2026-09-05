import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Livro from './Livro.js';

const Progresso = sequelize.define('Progresso', {
    progresso_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },

    livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Livro,
            key: 'id'
        }
    },

    numero_de_paginas_lidas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    data: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    tableName: 'progresso_leitura',
    timestamps: false
});

Usuario.hasMany(Progresso, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Progresso.belongsTo(Usuario, {
    foreignKey: 'user_id'
});

Livro.hasMany(Progresso, {
    foreignKey: 'livro_id',
    onDelete: 'CASCADE'
});

Progresso.belongsTo(Livro, {
    foreignKey: 'livro_id'
});

export default Progresso;
