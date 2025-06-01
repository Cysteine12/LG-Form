/*
  Warnings:

  - You are about to drop the column `admission_letter` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `admission_letter_type` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `lg_id` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `lg_id_type` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `school_id` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `school_id_type` on the `submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `submission` DROP COLUMN `admission_letter`,
    DROP COLUMN `admission_letter_type`,
    DROP COLUMN `lg_id`,
    DROP COLUMN `lg_id_type`,
    DROP COLUMN `school_id`,
    DROP COLUMN `school_id_type`;

-- CreateTable
CREATE TABLE `File` (
    `id` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `file_type` ENUM('SCHOOL_ID', 'LG_ID', 'ADMISSION_TYPE') NOT NULL,
    `data` LONGBLOB NOT NULL,
    `submission_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_submission_id_fkey` FOREIGN KEY (`submission_id`) REFERENCES `Submission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
