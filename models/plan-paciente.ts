import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Plan = db.define('Plan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER
    },
    lacteos: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vegetales: {
        type: DataTypes.STRING,
        allowNull: true
    },
    frutas: {
        type: DataTypes.STRING,
        allowNull: true
    },
    almidones: {
        type: DataTypes.STRING,
        allowNull: true
    },
    carnes_magra: {
        type: DataTypes.STRING,
        allowNull: true
    },
    carnes_semi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    carnes_grasa: {
        type: DataTypes.STRING,
        allowNull: true
    },
    grasas: {
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

export default Plan;