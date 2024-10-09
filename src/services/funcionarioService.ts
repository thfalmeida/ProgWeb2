import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FuncionarioService{
 
public async getAllFuncionarios(){
  return await prisma.funcionario.findMany();
};

public async getFuncionarioById(id: number){
  return await prisma.funcionario.findUnique({ where: { id } });
};

public async createFuncionario (nome: string, userId:number){
  return await prisma.funcionario.create({data: {
    nome: nome,
    userId: userId
  }})
}

public async updateFuncionario(id: number, nome:string){
  const data = {
    nome: nome
  }
  return await prisma.funcionario.update(
    { where: { id }, data})
}

public async deleteFuncionario(id: number){
  return await prisma.funcionario.delete({ where: { id }})
};

}