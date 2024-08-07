import { Request, Response } from 'express';

const funcionarios = [
  {
      id: 0,
      nome: "Funcionario"
  }
];

export const getAllFuncionarios = (req: Request, res: Response) => {
  res.json(funcionarios);
};

export const getFuncionarioById = (req: Request, res: Response) => {
  const user = funcionarios.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Funcionario not found');
  }
};

export const createFuncionario = (req: Request, res: Response) => {
  const { id, nome} = req.body;
  funcionarios.push({ id, nome});
  res.status(201).json({ id, nome });
};

export const updateFuncionario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;
  const funcionario = funcionarios.find(u => u.id === parseInt(id));
  if (funcionario) {
    funcionario.nome = nome;
    res.json(funcionario);
  } else {
    res.status(404).send('Funcionario not found');
  }
};

export const deleteFuncionario = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = funcionarios.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    funcionarios.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Funcionario not found');
  }
};
