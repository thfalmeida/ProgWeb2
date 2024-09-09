/*
  Warnings:

  - Added the required column `descricao` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "descricao" TEXT NOT NULL;
