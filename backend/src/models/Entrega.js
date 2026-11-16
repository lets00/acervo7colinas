import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Emprestimo from "./Emprestimo.js";
import Entregador from "./Entregador.js";

const Entrega = sequelize.define('Entrega', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    emprestimo_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    entregador_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    status: {
        type: DataTypes.ENUM(
            'SOLICITADO',
            'BUSCANDO_ENTREGADOR',
            'AGUARDANDO_ACEITE',
            'ENTREGADOR_ACEITOU',
            'SAIU-DA_BIBLIOTECA',
            'ENTREGUE',
            'SEM_ENTREGADOR',
            'CANCELADO'
        ),
        allowNull: false,
        defaultValue: 'SOLICITADO'
    },

    endereco_entrega: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'entregas',
    timestamps: true,
    underscored: true
});

Emprestimo.hasMany(Entrega, {
    foreignKey: 'emprestimo_id'
});

Entrega.belongsTo(Emprestimo, {
    foreignKey: 'emprestimo_id'
});

Entregador.hasMany(Entrega, {
    foreignKey: 'entregador_id'
});

Entrega.belongsTo(Entregador, {
    foreignKey: 'entregador_id'
});

export default Entrega;