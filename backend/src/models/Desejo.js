import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Livro from './Livro.js';

const Desejo = sequelize.define('Desejo', {
    desejo_id: {
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
    }
}, {
    tableName: 'desejos',
    timestamps: false
});

Usuario.hasMany(Desejo, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Desejo.belongsTo(Usuario, {
    foreignKey: 'user_id'
});

Livro.hasMany(Desejo, {
    foreignKey: 'livro_id',
    onDelete: 'CASCADE'
});

Desejo.belongsTo(Livro, {
    foreignKey: 'livro_id'
});

export default Desejo;