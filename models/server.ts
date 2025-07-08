import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import authRoutes from '../routes/auth';
import contactoRoutes from '../routes/contacto';
import clientRoutes from '../routes/client';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from "../docs/swagger";
import 'dotenv/config';

import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        console.log('Conectando a base de datos......');

        try {
            await db.authenticate();
            console.log('\n Database online a traves de db.authenticate \n');
        } catch (error) {

            if (error instanceof Error) {
                console.error('Error de conexión a la base de datos:', error.message);
                throw new Error('Error al conectar con la base de datos: ' + error.message);
            } else {
                console.error('Error desconocido al conectar a la base de datos:', error);
                throw new Error('Error desconocido al conectar a la base de datos');
            }
        }

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup)),
            this.app.use('/auth', authRoutes),
            this.app.use('/api/usuarios', userRoutes),
            //this.app.use( '/api/usuarios', contactoRoutes )
            this.app.use('/api/client', clientRoutes),
            this.app.use('/api/contacto', contactoRoutes)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('\nServidor corriendo en puerto ' + this.port + '\n');
            console.log('\nDB_HOST ' +  process.env.DB_HOST + '\n');
            console.log('\nDB_USER ' + process.env.DB_USER + '\n');
            console.log('\nDB_DATABASE ' + process.env.DB_DATABASE + '\n');
            console.log('\nDB_PASSWORD ' + process.env.DB_PASSWORD + '\n');
            console.log('\nDB_PORT ' + process.env.DB_PORT + '\n');
        })
    }
}

export default Server;
