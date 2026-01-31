import { Router } from 'express';
import { gerClientsGoals, putClientGoals } from '../controllers/datos-client';
import { getClientPlans, getUserClientsPlans, putClientPlan } from '../controllers/plan-client';



const router = Router();

router.put('/goals', putClientGoals );
router.get('/goals/:id', gerClientsGoals );


router.get('/plan/user/:id', getUserClientsPlans );
router.get('/plan/client/:id', getClientPlans );
router.put('/plan', putClientPlan );


export default router;