/*
  Warnings:

  - You are about to drop the column `data` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `file` table. All the data in the column will be lost.
  - Added the required column `filepath` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `data`,
    DROP COLUMN `filename`,
    ADD COLUMN `filepath` LONGBLOB NOT NULL;
