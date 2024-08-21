export class ServicoService{
    servicos = [
        {
            id: 0,
            nome: "Banho",
            valor: "23"
        }
      ];

    public getAllServicos(){
        return this.servicos;
    }

    public getServicoById(id: number){
        const servico = this.servicos.find(u => u.id === id);
        return servico;
    }

    public createServico(id: number, nome: string, valor: string){
        const servico = {id: id, nome: nome, valor }
        this.servicos.push(servico);
        return this.servicos;
    }

    public deleteServicoById(id: number){
        const index = this.servicos.findIndex(u => u.id === id);
        const servico = this.servicos.splice(index, 1);
        return servico;
    }


    public updateServico(id: number, nome: string, valor: string){
        const servico = this.servicos.find(u => u.id === id);
        if (servico) {
            servico.nome = nome;
            servico.valor = valor;
          return servico;
        } else 
          return null;
    }

}