import { Router } from 'express';
import { getContactos, getContacto, postContacto, putContacto, deleteContacto, getArchivoTexto } from '../controllers/contactos';



const router = Router();


router.get('/',       getContactos );
router.get('/archivato',       getArchivoTexto );
router.get('/:id',    getContacto );
router.post('/',      postContacto );
router.put('/:id',    putContacto );
router.delete('/:id', deleteContacto );



export default router;