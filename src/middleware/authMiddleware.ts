// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from 'process';

const JWT_SECRET = "senha secreta super segura 100 aprovada"

interface JwtPayload {
  id: number;
  role: string;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = user as JwtPayload;
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

