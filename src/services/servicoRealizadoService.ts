export class ServicoRealizadoService{
    servicosRealizados = [{
        id: 0,
        clienteId: 0,
        servicoId: 0,
        faturaId: 0,
        petId: 0
    }]

    public getAllServicosRealizados(){
        return this.servicosRealizados;
    }

    public getServicoRealizadoById(id: number){
        const servicoRealizado = this.servicosRealizados.find(u => u.id === id);
        return servicoRealizado;
    }

    public getServicoRealizadoByCliente(id: number){
        const servicosRealizados = this.servicosRealizados.filter(u => u.clienteId === id);
        return servicosRealizados;
    }

    public getServicoRealizadoByFatura(id: number){
        const servicosRealizados = this.servicosRealizados.filter(u => u.faturaId === id);
        return servicosRealizados;
    }

    public createServicoRealizado(id: number, clienteId: number, servicoId: number, faturaId: number, petId: number){
        const servicoRealizado = {id: id, clienteId: clienteId, servicoId: servicoId, faturaId: faturaId, petId: petId};
        return servicoRealizado;
    }

    public updateServicoRealizado(id: number, clienteId: number, servicoId: number, faturaId: number, petId: number){
        const servicoRealizado = this.servicosRealizados.find(u => u.id === id);
        if(servicoRealizado){
            servicoRealizado.clienteId = clienteId;
            servicoRealizado.servicoId = servicoId;
            servicoRealizado.faturaId = faturaId;
            servicoRealizado.petId = petId;
        }
        return servicoRealizado;
    }

    public deleteServicoRealizadoById(id: number){
        const index = this.servicosRealizados.findIndex(u => u.id === id);
        const servicoRealizado = this.servicosRealizados.splice(index, 1);
        return servicoRealizado;
    }
}