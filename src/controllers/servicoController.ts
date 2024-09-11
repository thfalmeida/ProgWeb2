import { Request, Response } from 'express';
import { ServicoService } from '../services/servicoService';
import { ServicoValidation } from '../validation/servicoValidation';

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
    const { nome, valor, descricao} = req.body;

    try{
      const validationError = ServicoValidation.validate({nome})
      if(validationError){
        res.status(400).json({erros: validationError})
      }
  
      const servico = this.servicoService.createServico(nome, valor, descricao);
      res.status(201).json(servico);
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

  public updateServico = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, valor, descricao } = req.body;

    try{
      const validationError = ServicoValidation.validate({nome})
      if(validationError){
        res.status(400).json({erros: validationError})
      }
  
      const servico = this.servicoService.updateServico(parseInt(id), nome, valor, descricao);
      servico ? res.status(200).json(servico) : res.status(404).send("Servico não encontrado")
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

  public deleteServico = (req: Request, res: Response) => {
    const { id } = req.params;
    const servico = this.servicoService.deleteServico(parseInt(id));
    
    servico ? res.status(200).json(servico) : res.status(404).send("Servico não encontrado")
  };
}