/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the `_SavedArticles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_SavedArticles` DROP FOREIGN KEY `_SavedArticles_A_fkey`;

-- DropForeignKey
ALTER TABLE `_SavedArticles` DROP FOREIGN KEY `_SavedArticles_B_fkey`;

-- AlterTable
ALTER TABLE `Like` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`ArticleId`, `UserId`);

-- DropTable
DROP TABLE `_SavedArticles`;

-- CreateTable
CREATE TABLE `Bookmark` (
    `ArticleId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,

    PRIMARY KEY (`ArticleId`, `UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_ArticleId_fkey` FOREIGN KEY (`ArticleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
