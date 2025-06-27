import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Client from '../models/client';
import { Op } from 'sequelize';
import PesoClient from '../models/peso-client';

export const getClientInfo = async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log("se procede a identificar la info del  cliente de id  ", id)

    try {
        const client = await Client.findOne({
            where: {
                id: id
            }
        });

        if (client) {
            res.json(client);
        } else {
            res.status(201).json({
                msg: `No existe un client con el  id ${id}`
            });
        }

    } catch (error) {

        console.log(" api gerClientsUser fallo", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const getClientPeso = async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log("se procede a identificar la peso del  cliente de id  ", id)

    try {
        const pesosClient = await PesoClient.findAll({
            where: {
                client_id: id,
            }
        });

        if (pesosClient) {
            res.json(pesosClient);
        } else {
            res.status(201).json({
                msg: `No existe un pesosClient con el  id ${id}`
            });
        }

    } catch (error) {

        console.log(" api gerClientsUser fallo", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}