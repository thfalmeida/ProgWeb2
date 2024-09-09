import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PetService{
 
  public async getAllPet(){
    return await prisma.pet.findMany();
  };
  
  public async getPetById(id: number){
    return await prisma.pet.findUnique({ where: { id } });
  };
  
  public async createPet (id: number, nome: string, clienteId: number){
    return await prisma.pet.create({data: {
      nome: nome,
      clienteId: clienteId
    }})
  }
  
  public async updatePet(id: number, nome:string, clienteId: number){
    const data = {
      nome: nome,
      clienteId: clienteId
    }
    return await prisma.pet.update(
      { where: { id }, data})
  }
  
  public async deletePet(id: number){
    return await prisma.pet.delete({ where: { id }})
  };
  
  }