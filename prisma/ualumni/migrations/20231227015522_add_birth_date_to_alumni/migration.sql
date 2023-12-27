/*
  Warnings:

  - Added the required column `birthDate` to the `Alumni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alumni" ADD COLUMN     "birthDate" DATE NOT NULL;
