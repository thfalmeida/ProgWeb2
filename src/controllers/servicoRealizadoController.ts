import { Request, Response } from 'express';
import { ServicoRealizadoService } from "../services/servicoRealizadoService";

export class ServicoRealizadoController{
    servicoRealizadoService: ServicoRealizadoService

    constructor(){
        this.servicoRealizadoService = new ServicoRealizadoService();
    }

    public getAllServicosRealizados(req: Request, res: Response){
        res.json(this.servicoRealizadoService.getAllServicosRealizados());
    }

    public getServicoRealizadoByID(req: Request, res: Response){
        res.json(this.servicoRealizadoService.getServicoRealizadoById(parseInt(req.params.id)));
    }

    public getServicoRealizadoByFaturaID(req: Request, res: Response){
        res.json(this.servicoRealizadoService.getServicoRealizadoById(parseInt(req.params.faturaId)));
    }

    public getServicoRealizadoByClienteID(req: Request, res: Response){
        res.json(this.servicoRealizadoService.getServicoRealizadoById(parseInt(req.params.clienteId)));
    }

    public createServicoRealizado(req: Request, res: Response){
        const { funcionarioId, clienteId, servicoId, faturaId, petId} = req.body;
        const servicoRealizado = this.servicoRealizadoService.createServicoRealizado(servicoId, faturaId , clienteId, funcionarioId, petId);    
        res.json(servicoRealizado)
    }

    public updateServicoRealizado(req: Request, res: Response){
        const { id, clienteId, servicoId, faturaId, petId, funcionarioId} = req.body;
        const servicoRealizado = this.servicoRealizadoService.updateServicoRealizado(id, servicoId, faturaId, clienteId, funcionarioId, petId);    
        res.json(servicoRealizado)
    }

    public deleteServicoRealizado(req: Request, res:Response){
        const servicoRealizado = this.servicoRealizadoService.deleteServicoRealizado(parseInt(req.params.clienteId));
        res.json(servicoRealizado)
    }

    
}