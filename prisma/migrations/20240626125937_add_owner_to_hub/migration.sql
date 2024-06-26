/*
  Warnings:

  - You are about to drop the `_HubToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Hub` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_HubToUser` DROP FOREIGN KEY `_HubToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_HubToUser` DROP FOREIGN KEY `_HubToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Hub` ADD COLUMN `ownerId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_HubToUser`;

-- CreateTable
CREATE TABLE `_hubsJoined` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_hubsJoined_AB_unique`(`A`, `B`),
    INDEX `_hubsJoined_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Hub` ADD CONSTRAINT `Hub_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_hubsJoined` ADD CONSTRAINT `_hubsJoined_A_fkey` FOREIGN KEY (`A`) REFERENCES `Hub`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_hubsJoined` ADD CONSTRAINT `_hubsJoined_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
