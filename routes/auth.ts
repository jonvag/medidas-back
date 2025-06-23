import { Router } from 'express';
import { login, register, profile } from '../controllers/auth';
import { verifyToken } from '../middlewares/authMiddleware';



const router = Router();


router.post('/login',       login );
router.post('/register',    register );
router.get('/profile', verifyToken, profile);


export default router;