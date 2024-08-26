import { Router } from 'express';
import { ServicoRealizadoController} from '../controllers/servicoRealizadoController';

const router = Router();
const servicoRealizadoController = new ServicoRealizadoController();
/**
 * @swagger
 * tags:
 *   name: Servicos Realizados
 *   description: Operações CRUD de serviços contratados
 */


/**
 * @swagger
 * /servicoContratado:
 *   get:
 *     summary: Retorna uma lista de todos os serviços contratados
 *     tags: [ServicoRealizado]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: number
 *                 faturaId:
 *                   type: number
 *                 servicoId:
 *                   type: number
 */
router.get('/', servicoRealizadoController.getAllServicosRealizados);

/**
 * @swagger
 * /servicoContratado/{id}:
 *   get:
 *     summary: Retorna um servico contratado específico pelo ID
 *     tags: [ServicoRealizado]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do servico contratado
 *     responses:
 *       200:
 *         description: Servico contratado retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: number
 *                 faturaId:
 *                   type: number
 *                 servicoId:
 *                   type: number
 *       404:
 *         description: Serviço contratado não encontrado
 */
router.get('/:id', servicoRealizadoController.getServicoRealizadoByID);

/**
 * @swagger
 * /servicoContratado/cliente/{id}:
 *   get:
 *     summary: Retorna um servico contratado específico pelo ID do cliente contratante
 *     tags: [ServicoRealizado]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do servico contratado
 *     responses:
 *       200:
 *         description: Servico contratado retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: number
 *                 faturaId:
 *                   type: number
 *                 servicoId:
 *                   type: number
 *       404:
 *         description: Serviço contratado não encontrado
 */
router.get('/:id', servicoRealizadoController.getServicoRealizadoByClienteID);

/**
 * @swagger
 * /servicoContratado/fatura/{id}:
 *   get:
 *     summary: Retorna um cliente específico pelo ID da fatura
 *     tags: [ServicoRealizado]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do servico contratado
 *     responses:
 *       200:
 *         description: Servico contratado retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: number
 *                 faturaId:
 *                   type: number
 *                 servicoId:
 *                   type: number
 *       404:
 *         description: Serviço contratado não encontrado
 */
router.get('/:id', servicoRealizadoController.getServicoRealizadoByFaturaID);

/**
 * @swagger
 * /servicoContratado:
 *   post:
 *     summary: Cadastra um novo serviço contratado
 *     tags: [ServicoRealizado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - clienteId
 *               - faturaId
 *               - servicoId 
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: number
 *                 faturaId:
 *                   type: number
 *                 servicoId:
 *                   type: number
 *     responses:
 *       201:
 *         description: Servico contratado e cadastrado com sucesso.
 *       400:
 *         description: Dados inválidos
 */
router.post('/', servicoRealizadoController.createServicoRealizado);

/**
 * @swagger
 * /servicoContratado/{id}:
 *   put:
 *     summary: Atualiza um servico contratado existente
 *     tags: [ServicoRealizado]
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
 *               - id
 *               - clienteId
 *               - faturaId
 *               - servicoId 
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: number
 *                 faturaId:
 *                   type: number
 *                 servicoId:
 *                   type: number
 *     responses:
 *       201:
 *         description: Servico contratado e cadastrado com sucesso.
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', servicoRealizadoController.createServicoRealizado);

/**
 * @swagger
 * /servicoContratado/{id}:
 *   delete:
 *     summary: Remove um servico contratado pelo ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do servico contratado
 *     responses:
 *       204:
 *         description: Servico contratado removido com sucesso
 *       404:
 *         description: não encontrado
 */
router.delete('/:id', servicoRealizadoController.deleteServicoRealizado);

export default router;