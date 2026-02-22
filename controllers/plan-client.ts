import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import { Op } from 'sequelize';
import { Client, Plan } from '../models'

import Goal from '../models/goals';
import Agent from '../models/agents';

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

export const getUserClientsPlans = async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log("se procede a identificar los planes de los clientes del user id  ", id);

    try {

        const plan_paciente = await Client.findAll({
            where: {
                user_id: id
            },
            include: [{
                model: Plan,
                // Puedes especificar qué columnas del plan quieres traer
                //attributes: ['lacteos', 'vegetales', 'frutas'],
                as: 'plan_nutricional'
            }, {
                model: Agent,
                attributes: ['codigo'], // Aquí especificas que solo quieres el campo 'codigo'
                as: 'agente_asociado' // Descomenta esta línea si usas un alias en la asociación
            }]

        });


        /*         const plan_paciente = await Plan.findOne({
                    where: {
                        client_id: id
                    }
                }); */

        if (plan_paciente) {
            res.json(plan_paciente);
        } else {
            res.status(404).json({
                msg: `No existe un paciente con el  id ${id}`
            });
        }

    } catch (error) {

        console.log(" api geClientPlans fallo", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const getClientPlans = async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log("se procede a identificar el plan del id  ", id);

    try {
        const plan_paciente = await Plan.findOne({
            where: {
                client_id: id
            }
        });

        if (plan_paciente) {
            res.json(plan_paciente);
        } else {
            res.status(404).json({
                msg: `No existe un paciente con el  id ${id}`
            });
        }

    } catch (error) {

        console.log(" api geClientPlans fallo", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putClientPlan = async (req: Request, res: Response) => {

    const { body } = req;
    const { client_id } = body;

    try {
        const planUpdate = {
            client_id: client_id,
            lacteos: body.lacteos,
            almidones: body.almidones,
            vegetales: body.vegetales,
            frutas: body.frutas,
            carnes_magra: body.carnes_magra,
            carnes_semi: body.carnes_semi,
            carnes_grasa: body.carnes_grasa,
            grasas: body.grasas
        }

        const plan = await Plan.findOne({
            where: {
                client_id: client_id
            }
        });

        if (!plan) {
            console.log("Creando nuevo plan para client_id:", client_id);
            const planCrear = await Plan.create(planUpdate);
            res.status(200).json({
                msg: 'plan creado',
                data: planCrear,
                status: 200
            });
        } else {
            console.log("Actualizando plan existente para client_id:", client_id);
            await plan.update(planUpdate);

            //actualizar el codigo del agente asociado al cliente
            let codigoAvailable:string = "El codigo ya esta registrado a otro cliente por favor cambiarlo por otro";
            let codClientStatus:number = 0; //0 ok, 1 error
            const agentCodDisponible = await Agent.findOne({
                where: {
                    codigo: body.codigo,
                    client_id: { [Op.ne]: client_id } // Asegura que el código no esté asociado a otro cliente
                }
            });

            if (!agentCodDisponible) {
                const agenteAsociado = await Agent.findOne({
                    where: {
                        client_id: client_id
                    }
                });

                if (agenteAsociado) {
                    await agenteAsociado.update({ codigo: body.codigo });
                    codigoAvailable = "Código actualizado correctamente";
                } else {
                    console.log("No se encontró el agente asociado para el cliente con id:", client_id);
                    codigoAvailable = "no se encontró el agente asociado para el cliente, por favor asignar un agente con ese código";
                    codClientStatus = 1;
                }
            } else {
                console.log("No se encontró el cliente con id:", client_id);
                codigoAvailable = "El código ya esta registrado a otro cliente por favor cambiarlo por otro";
                codClientStatus = 1;
            }


            res.status(201).json({
                msg: 'plan actualizado',
                data: plan,
                status: 201,
                codClient: {
                    status: codClientStatus,
                    detail: codigoAvailable
                }
            });
        }

    } catch (error) {

        console.log("error api put contacto", error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}