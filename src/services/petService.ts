export class PetService{
pets = [
    {
        id: 0,
        nome: "Au au",
        idade: "23",
        raça: "vira-lata"
    }
  ];
 
  public getAllPets(){
    return this.pets;
  }

  public getPetById(id: number){
    const pet = this.pets.find(u => u.id === id);
    return pet ?  pet : null;
  }

  public deletePetById(id: number){
    const index = this.pets.findIndex(u => u.id === (id));
    if (index !== -1) {
        const pet = this.pets.splice(index, 1);
        return pet;
    } else {
        return null;
    }
  }

  public createPet(id: number, nome: string, idade: string, raça: string){
    const pet = {id: id, nome: nome, idade: idade, raça: raça}
    this.pets.push(pet);
    return this.pets[this.pets.length -1];
  }

  public updatePet(id: number, nome: string, idade: string, raça: string){
    const pet = this.pets.find(u => u.id === (id));
    if (pet) {
      pet.nome = nome;
      pet.idade = idade;
      pet.raça = raça
      return pet;
    } else {
      return null;
    }
  }
}