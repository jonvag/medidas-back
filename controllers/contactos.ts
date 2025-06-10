import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Contacto from '../models/contactos';



export const getContactos = async( req: Request , res: Response ) => {


    const contactos = await Contacto.findAll();
    console.log("\nbuscando contactos\n total", contactos.length   );

    if( contactos ) {
        res.json(contactos);
    } else {
        console.log("\nBase de datos vacia\n");

        res.status(404).json({
            msg: `Base de datos vacia`
        });
    }
}

export const getContacto = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const contacto = await Contacto.findByPk( id );

    if( contacto ) {
        res.json(contacto);
    } else {
        res.status(404).json({
            msg: `No existe un contacto con el  id ${ id }`
        });
    }
}

export const postContacto = async( req: Request , res: Response ) => {

    const { body } = req; 
    console.log("se procede a crear Contacto ", body)
    

    try {
        
        const existeEmail = await Contacto.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un contacto con el email ' + body.email
            });
        }


        const contacto = new Contacto(body);
        await contacto.save();

        setTimeout(() => {
            // Simular conexión a la base de datos
            console.log("estoy en set time out");
            res.json( contacto );
            // Resuelve la promesa con el archivo
          }, 2000); // 2000 es el tiempo de retraso en milisegundos



    } catch (error) {

        console.log(" api postContacto fallo", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }



}

export const putContacto = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const contacto = await Contacto.findByPk( id );
        if ( !contacto ) {
            return res.status(404).json({
                msg: 'No existe un contacto con el id ' + id
            });
        }

        await contacto.update( body );

        res.json( contacto );


    } catch (error) {

        console.log("error api put contacto", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }   
}


export const deleteContacto = async( req: Request , res: Response ) => {

/*     const { id } = req.params;

    const usuario = await Usuario.findByPk( id );
    if ( !usuario ) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    await usuario.update({ estado: false });


 */
    res.json("No disponible esta API");
}

