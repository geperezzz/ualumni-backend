/*
  Warnings:

  - Added the required column `isVisible` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "isVisible" BOOLEAN NOT NULL;
