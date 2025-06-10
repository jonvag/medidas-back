import { Router } from 'express';
import { deleteCliente, gerClientsUser, getClients, postClient, puClient} from '../controllers/client';



const router = Router();

/**
 * Post track
 * @swagger
* /client:
*    get:
*      tags:
*        - client
*      summary: Update an existing pet.
*      description: Update an existing pet by Id.
*      operationId: updatePet
*      requestBody:
*        description: Update an existent pet in the store
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Pet'
*          application/xml:
*            schema:
*              $ref: '#/components/schemas/Pet'
*          application/x-www-form-urlencoded:
*            schema:
*              $ref: '#/components/schemas/Pet'
*        required: true
*      responses:
*        '200':
*          description: Successful operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Pet'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/Pet'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: Pet not found
*        '422':
*          description: Validation exception
*        default:
*          description: Unexpected error
*          content:
*            application/json:
*              schema:
*                $ref: "#/components/schemas/Error"
*      security:
*        - petstore_auth:
*            - write:pets
*            - read:pets
*/

router.get('/',       getClients );
router.get('/client-user/:id',    gerClientsUser );
router.post('/',      postClient );
router.put('/:id',    puClient );

router.delete('/:id', deleteCliente );


export default router;