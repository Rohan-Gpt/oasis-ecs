/*
  Warnings:

  - You are about to drop the column `guideLnk` on the `Guides` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guides" DROP COLUMN "guideLnk",
ADD COLUMN     "guideLink" TEXT;
