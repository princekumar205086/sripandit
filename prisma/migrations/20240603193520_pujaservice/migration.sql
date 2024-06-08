/*
  Warnings:

  - You are about to alter the column `desc` on the `pujaservice` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `pujaservice` MODIFY `desc` VARCHAR(191) NOT NULL;
