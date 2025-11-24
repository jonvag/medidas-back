import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import { Op } from 'sequelize';

import Goal from '../models/goals';

export const putClientGoals = async (req: Request, res: Response) => {

    const { body } = req;
    const { client_id } = body;

    try {
        const newGoal = {
            client_id: client_id,
            motivo_consulta: body.motivo_consulta,
            obje_esperado: body.obje_esperado,
            tabaco: body.tabaco,
            alcohol: body.alcohol,
            hora_dormir: body.hora_dormir,
            hora_despertar: body.hora_despertar,
            horas_sueno: body.horas_sueno,
            info_adicional: body.info_adicional
        }

        const goal = await Goal.findOne({
            where: {
                client_id: client_id
            }
        });
        if (!goal) {
            console.log("Creando nuevo goal para client_id:", client_id);
            const goalCrear = await Goal.create(newGoal);
            res.status(200).json({
                msg: 'goal creado',
                data: goalCrear,
                status: 200
            });
        } else {
            console.log("Actualizando goal existente para client_id:", client_id);
            await goal.update(newGoal);
            res.status(201).json({
                msg: 'goal actualizado',
                data: goal,
                status: 201
            });
        }
    } catch (error) {

        console.log("error api put contacto", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const gerClientsGoals = async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log("se procede a identificar goals del id  ", id);

    try {
        const paciente = await Goal.findOne({
            where: {
                client_id: id
            }
        });

        if (paciente) {
            res.json(paciente);
        } else {
            res.status(404).json({
                msg: `No existe un paciente con el  id ${id}`
            });
        }

    } catch (error) {

        console.log(" api gerClientsUser fallo", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}