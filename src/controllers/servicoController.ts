import { Request, Response } from 'express';
import { ServicoService } from '../services/servicoService';

export class ServicoController {
  private servicoService : ServicoService;

  constructor(){
    this.servicoService = new ServicoService;
  }


  public getAllServicos = (req: Request, res: Response) => {
    res.json(this.servicoService.getAllServicos());
  };

  public getServicoById = (req: Request, res: Response) => {
    const servico = this.servicoService.getServicoById(parseInt(req.params.id))
    servico ? res.status(200).json(servico) : res.status(404).send("Servico não encontrado")
  };

  public createServico = (req: Request, res: Response) => {
    const { id, nome, valor, descricao} = req.body;
    const servico = this.servicoService.createServico(id, nome, valor, descricao);
    res.status(201).json(servico);
  };

  public updateServico = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, valor, descricao } = req.body;
    const servico = this.servicoService.updateServico(parseInt(id), nome, valor, descricao);
    servico ? res.status(200).json(servico) : res.status(404).send("Servico não encontrado")
  };

  public deleteServico = (req: Request, res: Response) => {
    const { id } = req.params;
    const servico = this.servicoService.deleteServico(parseInt(id));
    
    servico ? res.status(200).json(servico) : res.status(404).send("Servico não encontrado")
  };
}