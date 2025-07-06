import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';
import { User } from '../interfaces/User';

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
        const userInstance = await Usuario.findByPk(decoded.id);

        if (!userInstance) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = userInstance.get({ plain: true });

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