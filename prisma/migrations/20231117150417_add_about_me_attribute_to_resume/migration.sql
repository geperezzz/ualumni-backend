/*
  Warnings:

  - Added the required column `aboutMe` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "aboutMe" TEXT NOT NULL;
