import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';
import User from '../interfaces/User';

export const verifyToken = async (req: User, res: Response, next: NextFunction) => {
    console.log("verifitoken ingreso")
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        console.log("Token del middleware ", token);

        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
        const user:User = await Usuario.findByPk(decoded.id);
        console.log("Token del user ", user);



        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        const safeUser = {
        "id": user.id,
        "name": user.name,
        "lastname": user.lastname,
        "email": user.email,
        "status": user.status,
        "createdAt": "2025-06-23T14:23:14.000Z",
        "updatedAt": "2025-06-23T14:23:14.000Z"
    }

        req.user = safeUser;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token inválido' });
    }
};