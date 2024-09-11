import { Request, Response } from 'express';
import { ServicoRealizadoService } from "../services/servicoRealizadoService";
import { ServicoRealizadoValidation } from '../validation/servicoRealizadoValidation';

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

    public async createServicoRealizado(req: Request, res: Response){
        const { funcionarioId, clienteId, servicoId, faturaId, petId} = req.body;

        try{
            const validationError = ServicoRealizadoValidation.validate({ funcionarioId, clienteId, servicoId, faturaId, petId})
            if(validationError){
              res.status(400).json({erros: validationError})
            }
        
            const servicoRealizado = await this.servicoRealizadoService.createServicoRealizado(servicoId, faturaId , clienteId, funcionarioId, petId);    
            res.status(201).json(servicoRealizado)
          }catch(error){
            if(error instanceof Error){
              return res.status(500).json({
                error: "Um erro inexperado foi encontrado durante o processamento da operacao,",
                info: error.message,
                stackTrace: error.stack
              })
            }
          } 
    }

    public async updateServicoRealizado(req: Request, res: Response){
        const { id, clienteId, servicoId, faturaId, petId, funcionarioId} = req.body;
        const servicoRealizado = this.servicoRealizadoService.updateServicoRealizado(id, servicoId, faturaId, clienteId, funcionarioId, petId);  
        
        try{
            const validationError = ServicoRealizadoValidation.validate({ funcionarioId, clienteId, servicoId, faturaId, petId})
            if(validationError){
              res.status(400).json({erros: validationError})
            }
        
            const servicoRealizado = await this.servicoRealizadoService.updateServicoRealizado(id, servicoId, faturaId, clienteId, funcionarioId, petId);  
            res.status(201).json(servicoRealizado)
          }catch(error){
            if(error instanceof Error){
              return res.status(500).json({
                error: "Um erro inexperado foi encontrado durante o processamento da operacao,",
                info: error.message,
                stackTrace: error.stack
              })
            }
          } 
    }

    public deleteServicoRealizado(req: Request, res:Response){
        const servicoRealizado = this.servicoRealizadoService.deleteServicoRealizado(parseInt(req.params.clienteId));
        res.json(servicoRealizado)
    }

    
}