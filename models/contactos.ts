import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Contacto = db.define('Contacto', {
    name: {
        type: DataTypes.STRING
    },
    empresa: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    mensaje: {
        type: DataTypes.STRING
    },
    evento: {
        type: DataTypes.STRING
    },
    id_evento: {
        type: DataTypes.NUMBER
    },

});

 
export default Contacto;