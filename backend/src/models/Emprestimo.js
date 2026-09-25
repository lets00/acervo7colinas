import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Livro from './Livro.js';

const Emprestimo = sequelize.define('Emprestimo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_emprestimo: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    data_entrega: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    is_devolvido: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'emprestimos',
    timestamps: false
});

Usuario.hasMany(Emprestimo, {
    foreignKey: 'user_id'
});

Emprestimo.belongsTo(Usuario, {
    foreignKey: 'user_id'
});

Livro.hasMany(Emprestimo, {
    foreignKey: 'livro_id'
});

Emprestimo.belongsTo(Livro, {
    foreignKey: 'livro_id'
});

export default Emprestimo;