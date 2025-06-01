-- CreateTable
CREATE TABLE `Submission` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `dob` VARCHAR(191) NOT NULL,
    `sex` ENUM('MAlE', 'FEMALE') NOT NULL,
    `marital_status` ENUM('SINGLE', 'MARRIED') NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `matric` VARCHAR(191) NOT NULL,
    `phone` INTEGER NOT NULL,
    `admission_year` INTEGER NOT NULL,
    `school_level` INTEGER NOT NULL,
    `school_id` LONGBLOB NOT NULL,
    `school_id_type` VARCHAR(191) NOT NULL,
    `admission_letter` LONGBLOB NOT NULL,
    `admission_letter_type` VARCHAR(191) NOT NULL,
    `lg_origin` VARCHAR(191) NOT NULL,
    `lg_resident` VARCHAR(191) NOT NULL,
    `lg_id` LONGBLOB NOT NULL,
    `lg_id_type` LONGBLOB NOT NULL,
    `v_skill` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Submission_email_key`(`email`),
    UNIQUE INDEX `Submission_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
