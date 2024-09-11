import { Request, Response } from 'express';
import { PetService } from '../services/petService';
import { PetValidation } from '../validation/petValidation';

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

public createPet = async (req: Request, res: Response) => {
  const { id, nome, clienteId } = req.body;

  try{
    const validationError = PetValidation.validate({nome})
    if(validationError){
      res.status(400).json({erros: validationError})
    }

    const pet = await this.petService.createPet(id, nome, clienteId);
    res.status(201).json(pet);
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

public updatePet = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, clienteId} = req.body;

  try{
    const validationError = PetValidation.validate({nome})
    if(validationError){
      res.status(400).json({erros: validationError})
    }

    const pet = this.petService.updatePet(parseInt(id), nome, clienteId)
    pet ? res.status(200).json(pet) : res.status(404).send("Pet não encontrado");
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

public deletePet = (req: Request, res: Response) => {
  const { id } = req.params;
  const pet = this.petService.deletePet(parseInt(id));
  pet ? res.status(200).json(pet) : res.status(404).send("Pet não encontrado")
};
}