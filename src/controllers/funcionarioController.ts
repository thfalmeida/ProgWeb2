import { Request, Response } from 'express';
import { FuncionarioService } from '../services/funcionarioService';
import { FuncionatioValidation } from '../validation/funcionarioValidation';

export class FuncionarioController{
  private funcionarioService: FuncionarioService;

  constructor(){
    this.funcionarioService = new FuncionarioService();
  }

  public getAllFuncionarios = (req: Request, res: Response) => {
    res.json(this.funcionarioService.getAllFuncionarios());
  };

  public getFuncionarioById = (req: Request, res: Response) => {
    const user = this.funcionarioService.getFuncionarioById(parseInt(req.params.id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('Funcionario not found');
    }
  }

  public createFuncionario =  async (req: Request, res: Response) => {
    const { nome, userId} = req.body;
    
    try{
      const validationError = FuncionatioValidation.validate({nome})
      if(validationError){
        res.status(400).json({erros: validationError})
      }
      const funcionario =  await this.funcionarioService.createFuncionario(nome, userId);
      res.status(201).json(funcionario);
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

  public updateFuncionario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;
    
    try{
      const validationError = FuncionatioValidation.validate({nome})
      if(validationError){
        res.status(400).json({erros: validationError})
      }

      const funcionario = await this.funcionarioService.updateFuncionario(parseInt(id), nome);
      funcionario ? res.status(200).json(funcionario) : res.status(404).send("Funcionario não encontrado")
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

  public deleteFuncionario = (req: Request, res: Response) => {
    const { id } = req.params;
    const funcionario = this.funcionarioService.deleteFuncionario(parseInt(id))

    funcionario ? res.status(200).json(funcionario) : res.status(404).send("Funcionario não encontrado")
  }
}