import { Request, Response } from 'express';
import { PetService } from '../services/petService';
import { PetValidation } from '../validation/petValidation';

export class PetController{
  private petService: PetService;

  constructor(){
    this.petService = new PetService();
  }


public getAllpets = async (req: Request, res: Response) => {
  console.log("Getting pet list")
  const pets = await this.petService.getAllPet()

  console.log(pets);
  res.json(pets);
};

public getPetByClienteId = async (req: Request, res: Response) => {
  const clientId = req.body.clientId;
  const pets = await this.petService.getPetByClient(clientId)
  res.json(pets);
};

public getPetById = (req: Request, res: Response) => {
  const pet = this.petService.getPetById(parseInt(req.params.id))
  pet ? res.status(200).json(pet) : res.status(404).send("Pet não encontrado");
};

public createPet = async (req: Request, res: Response) => {
  const { nome, clienteId } = req.body;

  try{
    const validationError = PetValidation.validate({nome})
    if(validationError){
      res.status(400).json({erros: validationError})
    }

    const pet = await this.petService.createPet(nome, clienteId);
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