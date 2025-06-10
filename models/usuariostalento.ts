import { Sequelize, DataTypes, Model } from 'sequelize';
/* import db from '../db/connection'; */
import * as fs from 'fs';
import { json } from 'express';


const Usuariotxt = () => {
  return new Promise((resolve, reject) => {
    try {
      const archivo:string = fs.readFileSync('public/archivotalento.txt', 'utf8');

      setTimeout(() => {
        // Simular conexión a la base de datos
        console.log("estoy en set time out");
        resolve(archivo); // Resuelve la promesa con el archivo
      }, 5000); // 2000 es el tiempo de retraso en milisegundos

    } catch (err) {
      console.log("No se leyo archivo");
      console.error(err);
      reject(err); // Rechaza la promesa con el error
    }
  });
}


const sequelize = new Sequelize('jonapisc_plataforma', 'jonapisc_plata', 'jon102003123', {
  host: 'jonapiscope.com',
  dialect: 'mysql',
  port: 3306
}); 

class User extends Model {}

User.init({
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey:true
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  user_estado: {
    type: DataTypes.BOOLEAN,
  }
}, {
  sequelize,
  modelName: 'User'
})




module.exports = User;
export default Usuariotxt;