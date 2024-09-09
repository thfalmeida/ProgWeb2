import { Router } from 'express';
import { FuncionarioController} from '../controllers/funcionarioController';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware';

const router = Router();
const funcionarioController = new FuncionarioController();
/**
 * @swagger
 * tags:
 *   name: Funcionario
 *   description: Operações CRUD de funcionario
 */


/**
 * @swagger
 * /funcionarios:
 *   get:
 *     summary: Retorna uma lista de funcionarios
 *     tags: [Funcionario]
 *     responses:
 *       200:
 *         description: Lista de funcionario retornada com sucesso
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
router.get('/',authenticateJWT, authorizeRole(['FUNCIONARIO']), funcionarioController.getAllFuncionarios);


/**
 * @swagger
 * /funcionarios/{id}:
 *   get:
 *     summary: Retorna um Funcionario específico pelo ID
 *     tags: [Funcionario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Funcionario
 *     responses:
 *       200:
 *         description: Funcionario retornado com sucesso
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
 *         description: Funcionario não encontrado
 */
router.get('/:id',authenticateJWT, authorizeRole(['FUNCIONARIO']), funcionarioController.getFuncionarioById);

/**
 * @swagger
 * /funcionarios:
 *   post:
 *     summary: Cria um novo Funcionario
 *     tags: [Funcionario]
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
 *         description: Funcionario criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/',authenticateJWT, authorizeRole(['FUNCIONARIO']), funcionarioController.createFuncionario);


/**
 * @swagger
 * /funcionarios/{id}:
 *   put:
 *     summary: Atualiza um Funcionario existente
 *     tags: [Funcionario]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Funcionario
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
 *         description: Funcionario atualizado com sucesso
 *       404:
 *         description: Funcionario não encontrado
 */
router.put('/:id',authenticateJWT, authorizeRole(['FUNCIONARIO']), funcionarioController.updateFuncionario);



/**
 * @swagger
 * /funcionarios/{id}:
 *   delete:
 *     summary: Remove um Funcionario pelo ID
 *     tags: [Funcionario]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Funcionario
 *     responses:
 *       204:
 *         description: Funcionario removido com sucesso
 *       404:
 *         description: Funcionario não encontrado
 */
router.delete('/:id',authenticateJWT, authorizeRole(['FUNCIONARIO']), funcionarioController.deleteFuncionario);



export default router;

