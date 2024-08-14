import { Request, Response } from 'express';

const clientes = [
  {
      id: 0,
      nome: "Cliente",
      telefone: "4002-8922",
      endereco: "Rua 1, 100"
  }
];


export const getAllClientes = (req: Request, res: Response) => {
  res.json(clientes);
};

export const getClienteById = (req: Request, res: Response) => {
  const user = clientes.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Cliente not found');
  }
};

export const createCliente = (req: Request, res: Response) => {
  const { id, nome, telefone, endereco } = req.body;
  clientes.push({ id, nome, telefone, endereco});
  res.status(201).json({ id, nome });
};

export const updateCliente = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;
  const cliente = clientes.find(u => u.id === parseInt(id));
  if (cliente) {
    cliente.nome = nome;
    res.json(cliente);
  } else {
    res.status(404).send('Cliente not found');
  }
};

export const deleteCliente = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = clientes.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    clientes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Cliente not found');
  }
};
