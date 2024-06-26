-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_ArticleId_fkey`;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `HubId` INTEGER NULL,
    ADD COLUMN `parentId` INTEGER NULL,
    MODIFY `ArticleId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Like` ADD COLUMN `CommentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_CommentId_fkey` FOREIGN KEY (`CommentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ArticleId_fkey` FOREIGN KEY (`ArticleId`) REFERENCES `Article`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_HubId_fkey` FOREIGN KEY (`HubId`) REFERENCES `Hub`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
