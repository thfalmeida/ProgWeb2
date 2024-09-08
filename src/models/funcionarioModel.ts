import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FuncionarioModel {
  static async getAll() {
    return prisma.funcionario.findMany();
  }

  static async getById(id: number) {
    return prisma.funcionario.findUnique({ where: { id } });
  }

  static async create(data: FuncionarioModel) {
    return prisma.funcionario.create({ data });
  }

  static async update(id: number, data: FuncionarioModel) {
    return prisma.funcionario.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.funcionario.delete({ where: { id } });
  }
}
