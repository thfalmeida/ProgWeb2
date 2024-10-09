/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Funcionario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Funcionario" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_userId_key" ON "Cliente"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_userId_key" ON "Funcionario"("userId");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
