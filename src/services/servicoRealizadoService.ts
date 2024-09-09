import { PrismaClient } from "@prisma/client";

export class ServicoRealizadoService{
    private prisma = new PrismaClient();

    public async getAllServicosRealizados(){
        return await this.prisma.servicoRealizado.findMany();
    }

    public async getServicoRealizadoById(id: number){
        return await this.prisma.servicoRealizado.findUnique({ where: { id } });
      };
      
    public async createServicoRealizado (servicoId: number, faturaId: number, clienteId: number, funcionarioId: number, petId: number){
        return await this.prisma.servicoRealizado.create({data: {
        servicoId: servicoId,
        faturaId: faturaId,
        clienteId: clienteId,
        funcionarioId: funcionarioId,
        petId: petId
        }})
    }
      
    public async updateServicoRealizado (id: number, servicoId: number, faturaId: number, clienteId: number, funcionarioId: number, petId: number){
        const data = {
            servicoId: servicoId,
            faturaId: faturaId,
            clienteId: clienteId,
            funcionarioId: funcionarioId,
            petId: petId
        }
        return await this.prisma.servicoRealizado.update({where: { id }, data})
    }
      
    public async deleteServicoRealizado(id: number){
        return await this.prisma.servicoRealizado.delete({ where: { id }})
    };
}