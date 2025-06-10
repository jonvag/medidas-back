import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Usuario from '../models/usuario';



export const getUsuarios = async( req: Request , res: Response ) => {
    console.log("entrando api usuarios");

    const usuarios = await Usuario.findAll();
    console.log("\nbuscando usuarios\n", usuarios   );

    if( usuarios ) {
        res.json(usuarios);
    } else {
        console.log("\nBase de datos vacia\n");

        res.status(404).json({ 
            msg: `Base de datos vacia`
        });
    }
}

export const getUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if( usuario ) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el  id ${ id }`
        });
    }
}

export const postUsuario = async( req: Request , res: Response ) => {

    const { body } = req; 
    console.log("se procede a crear usuario ", body)
    

    try {
        
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }


        const usuario = new Usuario(body);
        await usuario.save();

        setTimeout(() => {
            // Simular conexión a la base de datos
            console.log("estoy en set time out");
            res.json( usuario );
            // Resuelve la promesa con el archivo
          }, 2000); // 2000 es el tiempo de retraso en milisegundos



    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }



}

export const putUsuario = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const usuario = await Usuario.findByPk( id );
        if ( !usuario ) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await usuario.update( body );

        res.json( usuario );


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }   
}


export const deleteUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );
    if ( !usuario ) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    await usuario.update({ estado: false });

    // await usuario.destroy();


    res.json(usuario);
}

