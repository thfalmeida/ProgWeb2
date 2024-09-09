import { Request, Response } from 'express';
import { PetService } from '../services/petService';

export class PetController{
  private petService: PetService;

  constructor(){
    this.petService = new PetService();
  }


public getAllpets = (req: Request, res: Response) => {
  res.json();
};

public getPetById = (req: Request, res: Response) => {
  const pet = this.petService.getPetById(parseInt(req.params.id))
  pet ? res.status(200).json(pet) : res.status(404).send("Pet não encontrado");
};

public createPet = (req: Request, res: Response) => {
  const { id, nome, idade, raça } = req.body;

  const pet = this.petService.createPet(id, nome, idade);
  res.status(201).json(pet);
};

public updatePet = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, idade, raça } = req.body;
  const pet = this.petService.updatePet(parseInt(id), nome, idade)
  pet ? res.status(200).json(pet) : res.status(404).send("Pet não encontrado");
};

public deletePet = (req: Request, res: Response) => {
  const { id } = req.params;
  const pet = this.petService.deletePet(parseInt(id));
  pet ? res.status(200).json(pet) : res.status(404).send("Pet não encontrado")
};
}