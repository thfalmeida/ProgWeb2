import { Request, Response } from 'express';

const servicos = [
  {
      id: 0,
      nome: "Au au",
      valor: "23"
  }
];

export const getAllServicos = (req: Request, res: Response) => {
  res.json(servicos);
};

export const getServicoById = (req: Request, res: Response) => {
  const user = servicos.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Servico not found');
  }
};

export const createServico = (req: Request, res: Response) => {
  const { id, nome, idade } = req.body;
  servicos.push({ id, nome, valor: idade});
  res.status(201).json({ id, nome });
};

export const updateServico = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;
  const servico = servicos.find(u => u.id === parseInt(id));
  if (servico) {
    servico.nome = nome;
    res.json(servico);
  } else {
    res.status(404).send('Servico not found');
  }
};

export const deleteServico = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = servicos.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    servicos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Servico not found');
  }
};
