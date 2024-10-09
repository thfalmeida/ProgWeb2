import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ServicoRealizadoService{
    

    public async getAllServicosRealizados(){
        return await prisma.servicoRealizado.findMany();
    }

    public async getServicoRealizadoById(id: number){
        return await prisma.servicoRealizado.findUnique({ where: { id } });
    };

    public async getServicoRealizadoByClienteId(clienteId: number){
        const servicos = await prisma.servicoRealizado.findMany({ where: { clienteId: clienteId },       include: {
            pet: true,
            servico: true
          }, });
        return servicos
    };
    
      
    public async createServicoRealizado (servicoId: number, clienteId: number,petId: number){
        const servico = await prisma.servicoRealizado.create({data: {
            servicoId: servicoId,
            clienteId: clienteId,
            petId: petId
            }})
        return servico;
    }
      
    public async updateServicoRealizado (id: number, servicoId: number, clienteId: number,petId: number){
        const data = {
            servicoId: servicoId,
            clienteId: clienteId,
            petId: petId
        }
        return await prisma.servicoRealizado.update({where: { id }, data})
    }
      
    public async deleteServicoRealizado(id: number){
        await prisma.servicoRealizado.delete({ where: { id }})
        return true;
    };
}