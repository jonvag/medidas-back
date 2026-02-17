import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Agent = db.define('Agent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    chat_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    plataforma: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
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

export default Agent;