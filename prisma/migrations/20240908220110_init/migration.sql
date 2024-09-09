/*
  Warnings:

  - You are about to drop the column `name` on the `Funcionario` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Servico` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Funcionario" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;
