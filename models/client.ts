import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Contacto = db.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estatura: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    peso: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    circunferencia: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
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

 
export default Contacto;