import { Router } from 'express';
import { getContactos, getContacto, postContacto, putContacto, deleteContacto } from '../controllers/contactos';



const router = Router();


router.get('/',       getContactos );
router.get('/:id',    getContacto );
router.post('/',      postContacto );
router.put('/:id',    putContacto );
router.delete('/:id', deleteContacto );



export default router;