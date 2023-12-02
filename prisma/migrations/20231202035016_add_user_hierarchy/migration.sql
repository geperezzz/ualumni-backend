/*
  Warnings:

  - You are about to drop the column `names` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `surnames` on the `Alumni` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ALUMNI');

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_ownerEmail_fkey";

-- AlterTable
ALTER TABLE "Alumni" DROP COLUMN "names",
DROP COLUMN "password",
DROP COLUMN "surnames";

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "Alumni" ADD CONSTRAINT "Alumni_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "Alumni"("email") ON DELETE CASCADE ON UPDATE CASCADE;
