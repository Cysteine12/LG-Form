/*
  Warnings:

  - You are about to drop the column `file_type` on the `file` table. All the data in the column will be lost.
  - Added the required column `filetype` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `file_type`,
    ADD COLUMN `filetype` ENUM('SCHOOL_ID', 'LG_ID', 'ADMISSION_LETTER') NOT NULL,
    ADD COLUMN `mimetype` VARCHAR(191) NOT NULL;
