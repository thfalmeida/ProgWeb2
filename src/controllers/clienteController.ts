import { Request, Response } from 'express';
import { ClienteService } from '../services/clienteService';
import { ClienteValidation } from '../validation/clienteValidation';

export class ClienteController{
  private clienteService: ClienteService;
  
  constructor(){
    this.clienteService = new ClienteService();
  }


  public getAllClientes = async (req: Request, res: Response) => {
    res.json(await this.clienteService.getAllClientes());
  };

  public getClienteById = async (req: Request, res: Response) => {
    res.json(await this.clienteService.getClienteById(parseInt(req.params.id)));
  };

  public createCliente = async (req: Request, res: Response) => {
    const {nome, telefone, endereco } = req.body;
    try{
      const validationError = ClienteValidation.validate({nome, telefone, endereco})
      if(validationError){
        res.status(400).json({erros: validationError})
      }
      const retorno = await this.clienteService.createCliente(nome, telefone, endereco)
      res.status(201).json(retorno);
    }catch(error){
      if(error instanceof Error){
        return res.status(500).json({
          error: "Um erro inexperado foi encontrado durante o processamento da operacao,",
          info: error.message,
          stackTrace: error.stack
        })
      }
    }
    
  };

  public updateCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, telefone, endereco } = req.body;
    
    try{
      const validationError = ClienteValidation.validate({nome, telefone, endereco})
      if(validationError){
        res.status(400).json({erros: validationError})
      }
      const cliente = await this.clienteService.updateCliente(parseInt(id), nome, telefone, endereco);
      if(cliente)
        res.status(200).json(cliente);
      else
        res.status(404).json("Cliente não encontrado")
    }catch(error){
      if(error instanceof Error){
        return res.status(500).json({
          error: "Um erro inexperado foi encontrado durante o processamento da operacao,",
          info: error.message,
          stackTrace: error.stack
        })
      }
    }
  
  };

  public deleteCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cliente = await this.clienteService.deleteCliente(parseInt(id));
    if (cliente){
      res.status(204).json(cliente);
    } else {
      res.status(404).send('Cliente não encontrado');
    }
  }
}