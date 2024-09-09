// src/routes/authRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *               - role
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado com sucesso
 */
router.post('/register', UserController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario logado com sucesso
 */
router.post('/login', UserController.login);

export default router;
