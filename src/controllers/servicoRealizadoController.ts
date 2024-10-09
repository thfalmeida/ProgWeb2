import { Request, Response } from 'express';
import { ServicoRealizadoService } from "../services/servicoRealizadoService";
import { ServicoRealizadoValidation } from '../validation/servicoRealizadoValidation';

const servicoRealizadoService = new ServicoRealizadoService()
export class ServicoRealizadoController{

public async getAllServicosRealizados(req: Request, res: Response){
  console.log("Requisicao errada")
   const servicos = await servicoRealizadoService.getAllServicosRealizados()
    res.json(servicos);
}

  public async getServicoRealizadoByID(req: Request, res: Response){ 
    console.log("Requisicao errada byID")
    res.json('Falha')
      res.json(servicoRealizadoService.getServicoRealizadoById(parseInt(req.params.id)));
  }

  public getServicoRealizadoByFaturaID(req: Request, res: Response){
    console.log("Requisicao errada")
      res.json(servicoRealizadoService.getServicoRealizadoById(parseInt(req.params.faturaId)));
  }

  public async getServicoRealizadoByClientID(req: Request, res: Response){
    const clienteId = req.body.clientId;
    const servicos = await servicoRealizadoService.getServicoRealizadoByClienteId(clienteId)
    res.json(servicos);
  }

  public async createServicoRealizado(req: Request, res: Response){
    const { clienteId, servicoId, petId} = req.body;

    console.log({clienteId, servicoId, petId})
    try{
        const validationError = ServicoRealizadoValidation.validate({ clienteId, servicoId, petId})
        if(validationError){
          res.status(400).json({erros: validationError})
        }
        const servicoRealizado = await servicoRealizadoService.createServicoRealizado(servicoId, clienteId, petId);
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
      const { id, clienteId, servicoId, petId} = req.body;
      // const servicoRealizado = this.servicoRealizadoService.updateServicoRealizado(id, servicoId, clienteId,  petId);  
      console.log({ id, clienteId, servicoId, petId})
      try{
          const validationError = ServicoRealizadoValidation.validate({ clienteId, servicoId, petId})
          if(validationError){
            res.status(400).json({erros: validationError})
            return;
          }
      
          const servicoRealizado = await servicoRealizadoService.updateServicoRealizado(id, servicoId, clienteId, petId);  
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
    const id = parseInt(req.params.id)
    console.log(id)
      const servicoRealizado = servicoRealizadoService.deleteServicoRealizado(id);
      res.json(servicoRealizado)
  }

    
} 