import { Router } from 'express';
import { PetController} from '../controllers/petController';

const router = Router();
const petController = new PetController();
/**
 * @swagger
 * tags:
 *   name: pet
 *   description: Operações CRUD de pet
 */


/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Retorna uma lista de pets
 *     tags: [pet]
 *     responses:
 *       200:
 *         description: Lista de pet retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/', petController.getAllpets);




/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Retorna um pet específico pelo ID
 *     tags: [pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: pet retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: pet não encontrado
 */
router.get('/:id', petController.getPetById);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Cria um novo pet
 *     tags: [pet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: pet criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', petController.createPet);



/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Atualiza um pet existente
 *     tags: [pet]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: number
 *     responses:
 *       200:
 *         description: pet atualizado com sucesso
 *       404:
 *         description: pet não encontrado
 */
router.put('/:id', petController.updatePet);





/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Remove um pet pelo ID
 *     tags: [pet]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     responses:
 *       204:
 *         description: pet removido com sucesso
 *       404:
 *         description: pet não encontrado
 */
router.delete('/:id', petController.deletePet);



export default router;