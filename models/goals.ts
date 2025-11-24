import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Goal = db.define('Goal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER
    },
    motivo_consulta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    obje_esperado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tabaco: {
        type: DataTypes.STRING,
        allowNull: true
    },
    alcohol: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hora_dormir: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hora_despertar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    horas_sueno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    info_adicional: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
});


export default Goal;