import { Router } from 'express';
import { ServicoController} from '../controllers/servicoController';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware';

const router = Router();
const servicoController = new ServicoController();

/**
 * @swagger
 * tags:
 *   name: servico
 *   description: Operações CRUD de servico
 */


/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Retorna uma lista de servicos
 *     tags: [servico]
 *     responses:
 *       200:
 *         description: Lista de servico retornada com sucesso
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
router.get('/',authenticateJWT, authorizeRole(['FUNCIONARIO','CLIENTE']), servicoController.getAllServicos);

/**
 * @swagger
 * /servicos/{id}:
 *   get:
 *     summary: Retorna um servico específico pelo ID
 *     tags: [servico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do servico
 *     responses:
 *       200:
 *         description: servico retornado com sucesso
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
 *         description: servico não encontrado
 */
router.get('/:id',authenticateJWT, authorizeRole(['FUNCIONARIO', 'CLIENTE']), servicoController.getServicoById);

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cria um novo servico
 *     tags: [servico]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - valor
 *             properties:
 *               nome:
 *                 type: string
 *               valor:
 *                 type: string
 *     responses:
 *       201:
 *         description: servico criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/',authenticateJWT, authorizeRole(['FUNCIONARIO']), servicoController.createServico);

/**
 * @swagger
 * /servicos/{id}:
 *   put:
 *     summary: Atualiza um servico existente
 *     tags: [servico]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do servico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - valor
 *             properties:
 *               nome:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       200:
 *         description: servico atualizado com sucesso
 *       404:
 *         description: servico não encontrado
 */
router.put('/:id',authenticateJWT, authorizeRole(['FUNCIONARIO']), servicoController.updateServico);


/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     summary: Remove um servico pelo ID
 *     tags: [servico]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do servico
 *     responses:
 *       204:
 *         description: servico removido com sucesso
 *       404:
 *         description: servico não encontrado
 */
router.delete('/:id',authenticateJWT, authorizeRole(['FUNCIONARIO']), servicoController.deleteServico);






export default router;