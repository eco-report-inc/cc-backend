/*
  Warnings:

  - Added the required column `foto` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `foto` VARCHAR(60) NOT NULL;
