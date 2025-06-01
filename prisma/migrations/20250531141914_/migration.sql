/*
  Warnings:

  - The values [MAlE] on the enum `Submission_sex` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `submission` MODIFY `sex` ENUM('MALE', 'FEMALE') NOT NULL;
