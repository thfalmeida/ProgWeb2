import { Request, Response } from 'express';
import { ClienteService } from '../services/clienteService';

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
    const { id, nome, telefone, endereco } = req.body;
    const retorno = await this.clienteService.createCliente(nome, telefone, endereco)
    res.status(201).json(retorno);
  };

  public updateCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, telefone, endereco } = req.body;
    const cliente = await this.clienteService.updateCliente(parseInt(id), nome, telefone, endereco);
    if(cliente)
        res.status(200).json(cliente);
    else
      res.status(404).json("Cliente não encontrado")
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