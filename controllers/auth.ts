import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Usuario from '../models/usuario';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

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
            return res.status(201).json({
                msg: `No existe un user con el email ${email}`
            });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(pass, user.pass);
        if (!isMatch) return res.status(201).json({ error: 'Credenciales inválidas' });

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

        // 1. Validación de campos requeridos
        if (!name || !lastname || !email || !pass) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios',
                missingFields: {
                    name: !name,
                    lastname: !lastname,
                    email: !email,
                    pass: !pass
                }
            });
        }

        // 2. Validación de formato de email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'El formato del email es inválido'
            });
        }

        // 3. Validación de fortaleza de contraseña
        /* if (!validator.isStrongPassword(pass, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos'
            });
        } */

        // 4. Validación de longitud máxima (protección contra ataques DoS)
        if (name.length > 50 || lastname.length > 50 || email.length > 100 || pass.length > 255) {
            return res.status(400).json({
                success: false,
                message: 'Los campos exceden la longitud máxima permitida'
            });
        }

        // 5. Validación contra XSS (Cross-Site Scripting)
        if (validator.contains(name, '<script>') || validator.contains(lastname, '<script>')) {
            return res.status(400).json({
                success: false,
                message: 'Entrada no permitida'
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(200).json({ message: 'El usuario ya existe' });
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

export const logout = (req: Request, res: Response) => {
    console.log("Cerrando sesion ", req.user.email);
    try {
        // Opción 1: Simple respuesta de éxito (el cliente debe eliminar el token)
        res.status(200).json({ success: true, message: 'Logout exitoso' });

        // Opción 2: Si usas cookies (más seguro)
        // res.clearCookie('token').status(200).json({ success: true, message: 'Logout exitoso' });
    } catch (error) {
        console.error('Error en logout:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

const generateToken = async (user: any) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );
}
