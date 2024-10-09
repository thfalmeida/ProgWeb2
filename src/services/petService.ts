import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PetService{
 
  public async getAllPet(){
    return await prisma.pet.findMany();
  };

  public async getPetByClient(clienteId: number){
    const pets = await prisma.pet.findMany({
      where: { clienteId: clienteId },
    });

    return pets;
  }
  
  public async getPetById(id: number){
    return await prisma.pet.findUnique({ where: { id } });
  };
  
  public async createPet (nome: string, clienteId: number){
    console.log(`Nome: ${nome}, clienteId: ${clienteId}`);
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

    console.log(id);
    return await prisma.pet.update(
      { where: { id }, data: {nome}})
  }
  
  public async deletePet(id: number){
    return await prisma.pet.delete({ where: { id }})
  };
  
  }