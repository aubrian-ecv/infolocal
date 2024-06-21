-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `publicationDate` DATETIME(3) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `imageCaption` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
