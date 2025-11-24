import { Router } from 'express';
import { gerClientsGoals, putClientGoals } from '../controllers/datos-client';



const router = Router();

router.put('/goals', putClientGoals );
router.get('/goals/:id', gerClientsGoals );



export default router;