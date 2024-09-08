import { PrismaClient } from "@prisma/client";
import { ClienteModel } from "../models/clienteModel";

const prisma = new PrismaClient();

export class ClienteService{

    clientes = [
        {
            id: 0,
            nome: "Cliente",
            telefone: "4002-8922",
            endereco: "Rua 1, 100"
        }
      ];

    public async getAllClientes(){
        return await prisma.cliente.findMany();
    }

    public async getClienteById(id: number){
      return await prisma.cliente.findUnique({ where: { id } });
    }

    public async createCliente(nome: string, telefone: string, endereco:string){
        return await prisma.cliente.create({data: {
          nome: nome,
          telefone: telefone,
          endereco: endereco
        }})

        // return this.clientes.find(u => u.id === id);
    }

    public async updateCliente(id: number, nome: string, telefone: string, endereco:string ){
      const data = {
        nome: nome,
        telefone: telefone,
        endereco : endereco
      }
      return await prisma.cliente.update(
        { where: { id }, data})
    }

    public async deleteCliente(id: number){
      return prisma.cliente.delete({ where: { id } });
    }
}
