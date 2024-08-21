import { Request, Response } from 'express';
import { FuncionarioService } from '../services/funcionarioService';

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

  public createFuncionario = (req: Request, res: Response) => {
    const { id, nome} = req.body;
    const funcionario = this.funcionarioService.createFuncionario(id, nome);
    res.status(201).json(funcionario);
  };

  public updateFuncionario = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;
    const funcionario = this.funcionarioService.updateFuncionario(parseInt(id), nome);

    funcionario ? res.status(200).json(funcionario) : res.status(404).send("Funcionario não encontrado")
  };

  public deleteFuncionario = (req: Request, res: Response) => {
    const { id } = req.params;
    const funcionario = this.funcionarioService.deleteFuncionario(parseInt(id))

    funcionario ? res.status(200).json(funcionario) : res.status(404).send("Funcionario não encontrado")
  }
}