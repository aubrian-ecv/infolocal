/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[ArticleId,UserId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[HubId,UserId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_ArticleId_fkey`;

-- AlterTable
ALTER TABLE `Like` DROP PRIMARY KEY,
    ADD COLUMN `HubId` INTEGER NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `ArticleId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Hub` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HubToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HubToUser_AB_unique`(`A`, `B`),
    INDEX `_HubToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Like_ArticleId_UserId_key` ON `Like`(`ArticleId`, `UserId`);

-- CreateIndex
CREATE UNIQUE INDEX `Like_HubId_UserId_key` ON `Like`(`HubId`, `UserId`);

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_ArticleId_fkey` FOREIGN KEY (`ArticleId`) REFERENCES `Article`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_HubId_fkey` FOREIGN KEY (`HubId`) REFERENCES `Hub`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HubToUser` ADD CONSTRAINT `_HubToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Hub`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HubToUser` ADD CONSTRAINT `_HubToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
