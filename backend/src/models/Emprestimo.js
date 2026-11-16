import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Livro from './Livro.js';
import Exemplar from './Exemplar.js';

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

    tipo_retirada: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'RETIRADA',
        validate: {
            isIn: [['ENTREGA', 'RETIRADA']]
        },
    },
    status_retirada: {
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
            isIn: [[
                'AGUARDANDO_APROVACAO',
                'PRONTO_PARA_RETIRADA',
                'RETIRADO',
                'CANCELADO'
            ]]
        }
    },

    exemplar_id: {
    type: DataTypes.INTEGER,
    allowNull: true
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

Exemplar.hasMany(Emprestimo, {
    foreignKey: 'exemplar_id'
});

Emprestimo.belongsTo(Exemplar, {
    foreignKey: 'exemplar_id'
});

export default Emprestimo;