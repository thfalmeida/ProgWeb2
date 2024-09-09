// src/controllers/userController.ts
import { Request, Response } from 'express';
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'your-secret-key'; // Substitua por uma chave secreta segura

export class UserController {
  static async register(req: Request, res: Response) {
    const { login, password, role } = req.body;

    if (!login || !password || !role) {
      console.log(login);
      console.log(password);
      console.log(role);

      return res.status(400).json({ message: 'Email, senha e role são obrigatórios' });
    }

    if(role !== "CLIENTE" && role !== "FUNCIONARIO"){
      return res.status(400).json({message: "O Role deve ser CLIENTE ou FUNCIONARIO"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          login,
          password: hashedPassword,
          role: role as UserRole,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }

  static async login(req: Request, res: Response) {
    const { login, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { login },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  }
}
