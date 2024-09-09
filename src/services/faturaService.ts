// model Fatura {
//   id               Int                @id @default(autoincrement())
//   clienteId        Int
//   cliente          Cliente            @relation(fields: [clienteId], references: [id])
//   fechada          FaturaStatus       @default(ABERTA)
//   servicoRealizado ServicoRealizado[]
// }

import { PrismaClient } from "@prisma/client";

export class FaturaService{
    private prisma = new PrismaClient();

    public async getAllFatura(){
        return await this.prisma.fatura.findMany();
    }

    public async getFaturaById(id: number){
        return await this.prisma.fatura.findUnique({ where: { id } });
      };
      
    public async createFatura (clienteId: number){
        return await this.prisma.fatura.create({data: {
        clienteId: clienteId
        }})
    }
      
    public async updateFatura (id: number, clienteId: number){
        const data = {
            clienteId: clienteId
        }
        return await this.prisma.fatura.update({where: { id }, data})
    }
      
    public async deleteFatura(id: number){
        return await this.prisma.fatura.delete({ where: { id }})
    };
}