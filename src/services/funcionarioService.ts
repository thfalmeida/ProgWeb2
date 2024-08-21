export class FuncionarioService{

funcionarios = [
  {
      id: 0,
      nome: "Funcionario"
  }
];

public getAllFuncionarios(){
  return(this.funcionarios);
};

public getFuncionarioById = (id: number) => {
  const user = this.funcionarios.find(u => u.id === id);
  return user ? user : null;
};

public createFuncionario (id: number, nome: string){
  this.funcionarios.push({ id, nome});
  return this.getFuncionarioById(id);
};

public updateFuncionario(id: number, nome:string){
  const funcionario = this.funcionarios.find(u => u.id === (id));
  if (funcionario) {
    funcionario.nome = nome;
    return funcionario;
  } else {
    return null;
  }
};

public deleteFuncionario(id: number){
  const index = this.funcionarios.findIndex(u => u.id === (id));
  if (index !== -1) {
    const funcionario = this.funcionarios.splice(index, 1);
    return funcionario;
  } else {
    return null;
  }
};

}