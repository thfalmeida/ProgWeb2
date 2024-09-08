// src/models/productModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClienteModel {
  private id: String;
  private nome: String;
  private telefone: String;
  private endereco: String;

  constructor(id: string, nome: string, telefone: string, endereco: string){
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
  }

  


}
