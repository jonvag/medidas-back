import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Usuario from '../models/usuario';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../interfaces/User';

//const JWT_SECRET = process.env.JWT_SECRET ; 


export const login = async (req: Request, res: Response) => {

    const { email, pass } = req.body;

    try {

        const user: User = await Usuario.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            console.log("Fallo de inicio de sesión: user no encontrado con el email ", email);
            return res.status(400).json({
                msg: `No existe un user con el email ${email}`
            });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(pass, user.pass);
        if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });

        const payload = {
            uid: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            status: user.status
            // Puedes añadir aquí cualquier otro identificador de user necesario (ej., rol)
        };

        // Generar token JWT
        const token = await generateToken(user);


        console.log("Usuario ha iniciado sesión exitosamente: ", email);
        res.send({
            msg: "Usuario aceptado.",
            id: payload.uid,
            name: payload.name,
            lastname: payload.lastname,
            email: payload.email,
            status: payload.status,
            token,
        });

    } catch (error) {
        console.error("Error durante el inicio de sesión:", error); // Usa console.error para errores reales
        res.status(500).json({
            msg: 'Hable con el administrador: Error en el servidor durante el login'
        });
    }
};

export const register = async (req: Request, res: Response) => {

    try {
        const { name, lastname, email, pass } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hash de contraseña
        const hashedPass = await bcrypt.hash(pass, 10); // 10 salt rounds

        // Crear nuevo usuario
        const user: User = await Usuario.create({
            name: name,
            lastname: lastname,
            email: email,
            pass: hashedPass,
            status: true
        });

        // Generar token JWT
        const token = await generateToken(user);

        const response = {
            token,
            user: {
                id: user.id,
                username: user.email
            }
        };

        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }

}

export const profile = async (req: Request, res: Response) => {
    return res.json({ user: req.user });
}


const generateToken = async (user: any) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );
}
