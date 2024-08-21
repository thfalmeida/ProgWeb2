
export class ClienteService{

    clientes = [
        {
            id: 0,
            nome: "Cliente",
            telefone: "4002-8922",
            endereco: "Rua 1, 100"
        }
      ];

    public getAllClientes(){
        return this.clientes;
    }

    public getClienteById(id: number){
        const user = this.clientes.find(u => u.id === id);
        if (user) {
          return user;
        } else {
          return null;
        }
    }

    public createCliente(id: number, nome: string, telefone: string, endereco: string){
        this.clientes.push({ id, nome, telefone, endereco});
        return this.clientes.find(u => u.id === id);
    }

    public updateCliente(id: number, nome: string){
        const cliente = this.clientes.find(u => u.id === id);
        if (cliente) {
          cliente.nome = nome;
          return cliente;
        } else {
          return null;
        }
    }

    public deleteCliente(id: number){
        const index = this.clientes.findIndex(u => u.id === id);
        const cliente = this.clientes.splice(index, 1);
        return cliente;
    }
}
