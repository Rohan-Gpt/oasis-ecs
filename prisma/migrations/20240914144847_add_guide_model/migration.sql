/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Authenticator";

-- CreateTable
CREATE TABLE "Guides" (
    "id" TEXT NOT NULL,
    "week" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "modules" INTEGER,
    "topics" TEXT[],
    "duration" TEXT,
    "guideLnk" TEXT NOT NULL,

    CONSTRAINT "Guides_pkey" PRIMARY KEY ("id")
);
