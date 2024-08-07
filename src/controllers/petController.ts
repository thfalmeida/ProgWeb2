import { Request, Response } from 'express';

const pets = [
  {
      id: 0,
      nome: "Au au",
      idade: "23",
      raça: "vira-lata"
  }
];

export const getAllpets = (req: Request, res: Response) => {
  res.json(pets);
};

export const getPetById = (req: Request, res: Response) => {
  const user = pets.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Pet not found');
  }
};

export const createPet = (req: Request, res: Response) => {
  const { id, nome, idade, raça } = req.body;
  pets.push({ id, nome, idade, raça});
  res.status(201).json({ id, nome });
};

export const updatePet = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;
  const pet = pets.find(u => u.id === parseInt(id));
  if (pet) {
    pet.nome = nome;
    res.json(pet);
  } else {
    res.status(404).send('Pet not found');
  }
};

export const deletePet = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = pets.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    pets.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Pet not found');
  }
};
