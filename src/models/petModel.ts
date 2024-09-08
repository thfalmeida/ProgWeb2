import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PetModel {
  static async getAll() {
    return prisma.pet.findMany();
  }

  static async getById(id: number) {
    return prisma.pet.findUnique({ where: { id } });
  }

  static async create(data: PetModel) {
    return prisma.pet.create({ data });
  }

  static async update(id: number, data: PetModel) {
    return prisma.pet.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.pet.delete({ where: { id } });
  }
}
