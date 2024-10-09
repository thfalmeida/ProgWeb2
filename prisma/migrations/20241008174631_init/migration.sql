/*
  Warnings:

  - You are about to drop the column `faturaId` on the `ServicoRealizado` table. All the data in the column will be lost.
  - You are about to drop the column `funcionarioId` on the `ServicoRealizado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServicoRealizado" DROP CONSTRAINT "ServicoRealizado_faturaId_fkey";

-- DropForeignKey
ALTER TABLE "ServicoRealizado" DROP CONSTRAINT "ServicoRealizado_funcionarioId_fkey";

-- AlterTable
ALTER TABLE "ServicoRealizado" DROP COLUMN "faturaId",
DROP COLUMN "funcionarioId";
