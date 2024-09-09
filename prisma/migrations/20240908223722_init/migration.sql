/*
  Warnings:

  - The `fechada` column on the `Fatura` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FaturaStatus" AS ENUM ('ABERTA', 'FECHADA', 'PAGA');

-- AlterTable
ALTER TABLE "Fatura" DROP COLUMN "fechada",
ADD COLUMN     "fechada" "FaturaStatus" NOT NULL DEFAULT 'ABERTA';
