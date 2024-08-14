import { Router } from 'express';
import { getAllServicos, createServico, deleteServico, getServicoById, updateServico} from '../controllers/servicoController';

const router = Router();


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
router.get('/', getAllServicos);

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
router.get('/:id', getServicoById);

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
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: servico criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', createServico);

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
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: number
 *     responses:
 *       200:
 *         description: servico atualizado com sucesso
 *       404:
 *         description: servico não encontrado
 */
router.put('/:id', updateServico);


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
router.delete('/:id', deleteServico);






export default router;