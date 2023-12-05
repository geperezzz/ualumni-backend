/*
  Warnings:

  - Added the required column `isVisible` to the `JobOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobOffer" ADD COLUMN     "isVisible" BOOLEAN NOT NULL,
ADD COLUMN     "visibleSince" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
