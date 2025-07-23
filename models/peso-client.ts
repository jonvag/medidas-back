// src/models/peso-client.ts (o donde tengas tus modelos)

import { DataTypes } from 'sequelize';
import db from '../db/connection'; 

const PesoClient = db.define('Weight', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    peso: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    estatura: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    cintura: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    muneca: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    brazo: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    abdominal: {
        type: DataTypes.STRING,
        allowNull: true 
    },cadera: {
        type: DataTypes.STRING,
        allowNull: true 
    },triceps: {
        type: DataTypes.STRING,
        allowNull: true 
    },subescapular: {
        type: DataTypes.STRING,
        allowNull: true 
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

export default PesoClient;