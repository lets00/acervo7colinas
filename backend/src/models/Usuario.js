import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define('Usuario', {
    nomeCompleto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fotoPerfil: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fotoRg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comprovanteResidencial: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'usuarios'
});

export default Usuario;