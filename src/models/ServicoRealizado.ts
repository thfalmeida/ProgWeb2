import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ServicoRealizadoModel {
  static async getAll() {
    return prisma.servicoRelizado.findMany();
  }

  static async getById(id: number) {
    return prisma.servicoRelizado.findUnique({ where: { id } });
  }

  static async create(data: ServicoRealizadoModel) {
    return prisma.servicoRelizado.create({ data });
  }

  static async update(id: number, data: ServicoRealizadoModel) {
    return prisma.servicoRelizado.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.servicoRelizado.delete({ where: { id } });
  }
}
