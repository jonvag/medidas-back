// src/models/peso-client.ts (o donde tengas tus modelos)

import { DataTypes } from 'sequelize';
import db from '../db/connection'; 

const PesoClient = db.define('PesoClient', {
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
        allowNull: false 
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
}, {
    tableName: 'peso_clients' // <-- Aquí especificas el nombre exacto de la tabla
});

export default PesoClient;