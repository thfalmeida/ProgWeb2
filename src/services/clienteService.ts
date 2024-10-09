import { PrismaClient } from "@prisma/client";
import { ClienteModel } from "../models/clienteModel";



export class ClienteService{

  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
}
    public async getAllClientes(){
        return await this.prisma.cliente.findMany();
    }

    public async getClienteById(id: number){
      return await this.prisma.cliente.findUnique({ where: { id } });
    }

    public async createCliente(nome: string, telefone: string, endereco:string, userId:number){
        return await this.prisma.cliente.create({data: {
          nome: nome,
          telefone: telefone,
          userId: userId,
          endereco: endereco
        }})
    }

    public async updateCliente(id: number, nome: string, telefone: string, endereco:string ){
      const data = {
        nome: nome,
        telefone: telefone,
        endereco : endereco
      }
      return await this.prisma.cliente.update(
        { where: { id }, data})
    }

    public async deleteCliente(id: number){
      return this.prisma.cliente.delete({ where: { id } });
    }
}
