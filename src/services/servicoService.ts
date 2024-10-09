import { PrismaClient } from "@prisma/client";


export class ServicoService{
    private prisma = new PrismaClient();

    public async getAllServicos(){
        return await this.prisma.servico.findMany();
    }

    public async getServicoById(id: number){
        return await this.prisma.servico.findUnique({ where: { id } });
      };
      
      public async createServico (nome: string, valor: number, descricao: string){
        return await this.prisma.servico.create({data: {
          nome: nome,
          valor: valor,
          descricao: descricao
        }})
      }
      
    public async updateServico(id: number, nome:string, valor: number, descricao: string){
        const data = {
          nome: nome,
          valor: valor,
          descricao: descricao
        }
        const servico = await this.prisma.servico.update(
          { where: { id }, data})
        return servico
      }
      
      public async deleteServico(id: number){
        return await this.prisma.servico.delete({ where: { id }})
      };
      

}