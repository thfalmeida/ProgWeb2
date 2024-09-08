import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ServicoModel {
  static async getAll() {
    return prisma.servico.findMany();
  }

  static async getById(id: number) {
    return prisma.servico.findUnique({ where: { id } });
  }

  static async create(data: ServicoModel) {
    return prisma.servico.create({ data });
  }

  static async update(id: number, data: ServicoModel) {
    return prisma.servico.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.servico.delete({ where: { id } });
  }
}
