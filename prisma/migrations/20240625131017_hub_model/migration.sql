/*
  Warnings:

  - Added the required column `keywords` to the `Hub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Hub` ADD COLUMN `keywords` VARCHAR(191) NOT NULL;
