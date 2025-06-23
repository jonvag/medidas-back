import { Sequelize } from 'sequelize';




const db = new Sequelize('medidas_db', 'root', '', { 
    host: 'localhost', 
    dialect: 'mysql',
    port: 3306
});  

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
