import { Router } from 'express';
import { login, register, profile, logout } from '../controllers/auth';
import { verifyToken } from '../middlewares/authMiddleware';



const router = Router();


router.post('/login',       login );
router.post('/register',    register );
router.get('/profile', verifyToken, profile);
router.post('/logout', verifyToken, logout); 


export default router;