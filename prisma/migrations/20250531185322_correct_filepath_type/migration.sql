/*
  Warnings:

  - You are about to alter the column `filepath` on the `file` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `file` MODIFY `filepath` VARCHAR(191) NOT NULL;
