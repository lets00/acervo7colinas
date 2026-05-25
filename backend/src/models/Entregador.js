import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Entregador = sequelize.define('Entregador', {
    nomeCompleto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tipoVeiculo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disponibilidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoBicicleta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tamanhoBolsa: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fotoPerfil: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fotoCnh: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'entregadores'
});

export default Entregador;