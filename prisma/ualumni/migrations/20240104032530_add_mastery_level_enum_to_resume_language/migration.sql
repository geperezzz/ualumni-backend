/*
  Warnings:

  - Changed the type of `masteryLevel` on the `ResumeLanguage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MasteryLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- AlterTable
ALTER TABLE "ResumeLanguage" DROP COLUMN "masteryLevel",
ADD COLUMN     "masteryLevel" "MasteryLevel" NOT NULL;
