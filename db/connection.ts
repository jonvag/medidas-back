import { Sequelize } from 'sequelize';

const DB_DATABASE = process.env.DB_DATABASE || 'medidasbd';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || ''; // Si no tienes contraseña local, déjalo vacío
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT_NUMBER: number = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : 3306;


const db = new Sequelize(
  DB_DATABASE || 'medidasbd', 
  DB_USER || 'root', 
  DB_PASSWORD || '', 
  { 
    host: DB_HOST || 'localhost', 
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT || '3306')
  }
);

/* const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT_NUMBER
}); */

/* const db = new Sequelize('railway', 'root', 'NHPUuGdzjSXGnBNxCIQmwefXMepdfTbx', {
  host: 'mysql.railway.internal',
  dialect: 'mysql',
  port: 3306
}); */

/* const db = new Sequelize('mysql://root:NHPUuGdzjSXGnBNxCIQmwefXMepdfTbx@shuttle.proxy.rlwy.net:35976/railway', {
  dialect: 'mysql',
  // Opciones adicionales, si las necesitas. Por ejemplo, para desactivar logging:
  logging: false, // Desactiva los logs SQL de Sequelize (opcional, bueno para producción)
  dialectOptions: {
    // Ejemplo de opciones adicionales para MySQL si tuvieras SSL/TLS, etc.
    // ssl: {
    //     require: true,
    //     rejectUnauthorized: false // Puede ser necesario para algunos entornos de Railway/cloud si usas SSL
    // }
  },
  pool: { // Configuración del pool de conexiones (opcional, pero buena práctica)
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}); */


/* const db = new Sequelize('talentoa_medidas', 'talentoa_jonmedidas', 'jon102003123', {
    host: 'talentoactivoglobal.com',
    dialect: 'mysql',
    port: 3306
});   */


/* esto si no existe la crea */
/* (async () => {
    await db.sync({ force: true }); // Sincronizar modelo con la base de datos
    const existe = await db.query(`SELECT * FROM usuarios ;`);
    console.log("\n la consulta es esta:" , existe[0])
    if (existe[0].length > 0) { 
      console.log('\n La tabla "Usuarios" existe\n');
    } else {
      console.log(' La tabla "Usuarios" no existe');
    }
  })(); */

/* (async () => {
  await db.sync({ force: true }); // Sincronizar modelo con la base de datos
  const existe = await db.query(`SELECT * FROM jonapisc_plataforma.usuarios ;`);
  console.log("la consulta es esta:" , existe)
  if (existe[0].length > 0) {
    console.log('La tabla "Usuarios" existe');
  } else {
    console.log('La tabla "Usuarios" no existe');
  }
})(); */


export default db;
