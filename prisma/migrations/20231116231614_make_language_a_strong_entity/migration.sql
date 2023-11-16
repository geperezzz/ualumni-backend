/*
  Warnings:

  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `masteryLevel` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `Language` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_resumeId_fkey";

-- AlterTable
ALTER TABLE "Language" DROP CONSTRAINT "Language_pkey",
DROP COLUMN "masteryLevel",
DROP COLUMN "resumeId",
ADD CONSTRAINT "Language_pkey" PRIMARY KEY ("name");

-- CreateTable
CREATE TABLE "ResumeLanguage" (
    "resumeId" UUID NOT NULL,
    "languageName" TEXT NOT NULL,
    "masteryLevel" INTEGER NOT NULL,

    CONSTRAINT "ResumeLanguage_pkey" PRIMARY KEY ("resumeId","languageName")
);

-- AddForeignKey
ALTER TABLE "ResumeLanguage" ADD CONSTRAINT "ResumeLanguage_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguage" ADD CONSTRAINT "ResumeLanguage_languageName_fkey" FOREIGN KEY ("languageName") REFERENCES "Language"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
