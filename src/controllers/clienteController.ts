import { Request, Response } from 'express';
import { ClienteService } from '../services/clienteService';

export class ClienteController{
  private clienteService: ClienteService;
  
  constructor(){
    this.clienteService = new ClienteService();
  }


  public getAllClientes = (req: Request, res: Response) => {
    res.json(this.clienteService.getAllClientes());
  };

  public getClienteById = (req: Request, res: Response) => {
    res.json(this.clienteService.getClienteById(parseInt(req.params.id)));
  };

  public createCliente = (req: Request, res: Response) => {
    const { id, nome, telefone, endereco } = req.body;
    res.status(201).json(this.clienteService.createCliente(id, nome, telefone, endereco));
  };

  public updateCliente = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;
    const cliente = this.clienteService.updateCliente(parseInt(id), nome);
    if(cliente)
        res.status(200).json(cliente);
    else
      res.status(404).json("Cliente não encontrado")
  };

  public deleteCliente = (req: Request, res: Response) => {
    const { id } = req.params;
    const cliente = this.clienteService.deleteCliente(parseInt(id));
    if (cliente){
      res.status(204).json(cliente);
    } else {
      res.status(404).send('Cliente não encontrado');
    }
  }
}