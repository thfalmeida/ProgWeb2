import { Router } from 'express';
import { getAllClientes, createCliente, deleteCliente, getClienteById, updateCliente} from '../controllers/clienteController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cliente
 *   description: Operações CRUD de clientes
 */


/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna uma lista de clientes
 *     tags: [Cliente]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
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
router.get('/', getAllClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Retorna um cliente específico pelo ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente retornado com sucesso
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
 *         description: Cliente não encontrado
 */
router.get('/:id', getClienteById);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Cliente]
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
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', createCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
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
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/:id', updateCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Remove um cliente pelo ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       204:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/:id', deleteCliente);

export default router;