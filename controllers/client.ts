import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import { Op } from 'sequelize';

import Client from '../models/client';
import PesoClient from '../models/peso-client';
import { Agent, Plan } from '../models';


export const getClients = async (req: Request, res: Response) => {


    const clientes = await Client.findAll();
    console.log("\nbuscando clientes\n total", clientes.length);

    if (clientes) {
        res.json(clientes);
    } else {
        console.log("\nBase de datos vacia\n");

        res.status(404).json({
            msg: `Base de datos vacia`
        });
    }
}

export const gerClientsUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log("se procede a identificar los clientes del user  ", id)


    try {
        const clients = await Client.findAll({
            where: {
                user_id: id,
                status: {
                    [Op.ne]: 'eliminado'  // <-- ¡Esta es la condición para excluir!
                }
            }
        });

        if (clients) {
            res.json(clients);
        } else {
            res.status(404).json({
                msg: `No existe un clients con el  id ${id}`
            });
        }

    } catch (error) {

        console.log(" api gerClientsUser fallo", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const postClient = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existeEmail = await Client.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(202).json({
                msg: 'Ya existe un Cliente con el email ' + body.email
            });
        }

        const client = await Client.create(body);

        const newPeso = {
            client_id: (client as any).id,
            peso: body.peso,
            estatura: body.estatura,
            cintura: body.cintura,
            muneca: body.muneca,
            brazo: body.brazo,
            abdominal: body.abdominal,
            cadera: body.cadera,
            triceps: body.triceps,
            subescapular: body.subescapular,
        }

        const newPesoCreate = await PesoClient.create(newPeso);

        const newPlanInicial = {
            client_id: (client as any).id,
            lacteos: '0',
            almidones: '0',
            vegetales: '0',
            frutas: '0',
            carnes_magra: '0',
            carnes_semi: '0',
            carnes_grasa: '0',
            grasas: '0' 
        }

        const newPlanInicialCreate = await Plan.create(newPlanInicial);

        const newCodigo = {
            client_id: (client as any).id,
            codigo: '',
            chat_id: '0',
            plataforma: '0',
            status: 'Sin Clave'
        }

        const newCodigoCreate = await Agent.create(newCodigo);

        res.json(client);

    } catch (error) {

        console.log(" api postClient fallo", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const puClient = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {

        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(202).json({
                msg: 'No existe un client con el id ' + id
            });
        }

        await client.update(body);

        const newPeso = {
            client_id: id,
            peso: body.peso,
            estatura: body.estatura,
            cintura: body.circunferencia,
            muneca: body.muneca,
            brazo: body.brazo,
            abdominal: body.abdominal,
            cadera: body.cadera,
            triceps: body.triceps,
            subescapular: body.subescapular
        }

        const newPesoCreate = await PesoClient.create(newPeso);

        res.json(client);
    } catch (error) {

        console.log("error api put contacto", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteCliente = async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log("deleteCliente ", id);
    try {

        const cliente = await Client.findByPk(id);
        if (!cliente) {
            return res.status(404).json({
                msg: 'No existe un cliente con el id ' + id
            });
        }
        console.log(" cliente encontrado ", cliente);

        await cliente.update({ status: 'eliminado' });
        res.json('Cliente de  id ' + id + ' eliminado con exito');

    } catch (error) {

        console.log(" api deleteCliente fallo", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}