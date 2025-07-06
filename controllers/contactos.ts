import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Contacto from '../models/contactos';
import path from 'path'; 
import fs from 'fs/promises';

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

export const getArchivoTexto = async (req: Request, res: Response) => {
    // 1. Construye la ruta absoluta al archivo.
    // 'process.cwd()' te da el directorio de trabajo actual del Node.js (la raíz de tu proyecto).
    // 'path.join' es la mejor forma de construir rutas para que funcionen en cualquier sistema operativo.
    const filePath = path.join(process.cwd(), 'public', 'archivo.txt');

    try {
        // 2. Lee el contenido del archivo de forma asíncrona.
        // 'utf8' es la codificación común para archivos de texto.
        const fileContent = await fs.readFile(filePath, 'utf8');

        // 3. Envía el contenido del archivo como respuesta.
        // Establecemos el encabezado 'Content-Type' para indicar que estamos enviando texto plano.
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.send(fileContent);

    } catch (error) {
        // 4. Manejo de errores.
        // Si el archivo no se encuentra, o hay algún otro error al leerlo.
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return res.status(404).json({
                msg: 'El archivo "archivo.txt" no se encontró.'
            });
        }

        console.error("Error al leer el archivo:", error);
        res.status(500).json({
            msg: 'Error interno del servidor al procesar el archivo. Hable con el administrador.'
        });
    }
};

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


        const contacto = await Contacto.create(body);

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

