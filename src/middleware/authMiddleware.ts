// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";

import jwt from 'jsonwebtoken';
import { env } from 'process';

const JWT_SECRET = "senha_secreta"
const prisma = new PrismaClient();

interface JwtPayload {
  id: number;
  role: string;
  clienteId: number;
  funcionarioId:number;
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: 'Token inválido' });
    }
  const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload; // Verifica e decodifica o token

  const userId = decoded.clienteId || decoded.funcionarioId;

  req.body.clienteId = userId;

  if(userId){
    const users = await prisma.user.findUnique({
      where: { id: userId },
      include: { cliente: true, funcionario: true },
    });

    req.user = user as JwtPayload;
  }

  // Busca o usuário e verifica se ele é Cliente ou Funcionário

    
    next();
  });
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    next();
  };
};

