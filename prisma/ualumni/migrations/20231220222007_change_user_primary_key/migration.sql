/*
  Warnings:

  - The primary key for the `Alumni` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Alumni` table. All the data in the column will be lost.
  - The primary key for the `Graduation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alumniEmail` on the `Graduation` table. All the data in the column will be lost.
  - The primary key for the `HigherEducationStudy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resumeOwnerEmail` on the `HigherEducationStudy` table. All the data in the column will be lost.
  - The primary key for the `IndustryOfInterest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resumeOwnerEmail` on the `IndustryOfInterest` table. All the data in the column will be lost.
  - The primary key for the `JobApplication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alumniWhoAppliedEmail` on the `JobApplication` table. All the data in the column will be lost.
  - The primary key for the `PortfolioItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resumeOwnerEmail` on the `PortfolioItem` table. All the data in the column will be lost.
  - The primary key for the `PositionOfInterest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resumeOwnerEmail` on the `PositionOfInterest` table. All the data in the column will be lost.
  - The primary key for the `Resume` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ownerEmail` on the `Resume` table. All the data in the column will be lost.
  - The primary key for the `ResumeCiapCourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resumeOwnerEmail` on the `ResumeCiapCourse` table. All the data in the column will be lost.
  - The primary key for the `ResumeLanguage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resumeOwnerEmail` on the `ResumeLanguage` table. All the data in the column will be lost.
  - The primary key for the `ResumeSoftSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resumeOwnerEmail` on the `ResumeSoftSkill` table. All the data in the column will be lost.
  - The primary key for the `ResumeTechnicalSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resumeOwnerEmail` on the `ResumeTechnicalSkill` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WorkExperience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resumeOwnerEmail` on the `WorkExperience` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alumniId` to the `Graduation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeOwnerId` to the `HigherEducationStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeOwnerId` to the `IndustryOfInterest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alumniWhoAppliedId` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeOwnerId` to the `PortfolioItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeOwnerId` to the `PositionOfInterest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeOwnerId` to the `ResumeCiapCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeOwnerId` to the `ResumeLanguage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeOwnerId` to the `ResumeSoftSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeOwnerId` to the `ResumeTechnicalSkill` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `resumeOwnerId` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alumni" DROP CONSTRAINT "Alumni_email_fkey";

-- DropForeignKey
ALTER TABLE "Graduation" DROP CONSTRAINT "Graduation_alumniEmail_fkey";

-- DropForeignKey
ALTER TABLE "HigherEducationStudy" DROP CONSTRAINT "HigherEducationStudy_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "IndustryOfInterest" DROP CONSTRAINT "IndustryOfInterest_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_alumniWhoAppliedEmail_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioItem" DROP CONSTRAINT "PortfolioItem_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "PositionOfInterest" DROP CONSTRAINT "PositionOfInterest_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_ownerEmail_fkey";

-- DropForeignKey
ALTER TABLE "ResumeCiapCourse" DROP CONSTRAINT "ResumeCiapCourse_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "ResumeLanguage" DROP CONSTRAINT "ResumeLanguage_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "ResumeSoftSkill" DROP CONSTRAINT "ResumeSoftSkill_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "ResumeTechnicalSkill" DROP CONSTRAINT "ResumeTechnicalSkill_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_resumeOwnerEmail_fkey";

-- AlterTable
ALTER TABLE "Alumni" DROP CONSTRAINT "Alumni_pkey",
DROP COLUMN "email",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Graduation" DROP CONSTRAINT "Graduation_pkey",
DROP COLUMN "alumniEmail",
ADD COLUMN     "alumniId" UUID NOT NULL,
ADD CONSTRAINT "Graduation_pkey" PRIMARY KEY ("careerName", "alumniId");

-- AlterTable
ALTER TABLE "HigherEducationStudy" DROP CONSTRAINT "HigherEducationStudy_pkey",
DROP COLUMN "resumeOwnerEmail",
ADD COLUMN     "resumeOwnerId" UUID NOT NULL,
ADD CONSTRAINT "HigherEducationStudy_pkey" PRIMARY KEY ("resumeOwnerId", "title");

-- AlterTable
ALTER TABLE "IndustryOfInterest" DROP CONSTRAINT "IndustryOfInterest_pkey",
DROP COLUMN "resumeOwnerEmail",
ADD COLUMN     "resumeOwnerId" UUID NOT NULL,
ADD CONSTRAINT "IndustryOfInterest_pkey" PRIMARY KEY ("resumeOwnerId", "industryName");

-- AlterTable
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_pkey",
DROP COLUMN "alumniWhoAppliedEmail",
ADD COLUMN     "alumniWhoAppliedId" UUID NOT NULL,
ADD CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("jobOfferId", "alumniWhoAppliedId");

-- AlterTable
ALTER TABLE "PortfolioItem" DROP CONSTRAINT "PortfolioItem_pkey",
DROP COLUMN "resumeOwnerEmail",
ADD COLUMN     "resumeOwnerId" UUID NOT NULL,
ADD CONSTRAINT "PortfolioItem_pkey" PRIMARY KEY ("resumeOwnerId", "title");

-- AlterTable
ALTER TABLE "PositionOfInterest" DROP CONSTRAINT "PositionOfInterest_pkey",
DROP COLUMN "resumeOwnerEmail",
ADD COLUMN     "resumeOwnerId" UUID NOT NULL,
ADD CONSTRAINT "PositionOfInterest_pkey" PRIMARY KEY ("resumeOwnerId", "positionName");

-- AlterTable
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_pkey",
DROP COLUMN "ownerEmail",
ADD COLUMN     "ownerId" UUID NOT NULL,
ADD CONSTRAINT "Resume_pkey" PRIMARY KEY ("ownerId");

-- AlterTable
ALTER TABLE "ResumeCiapCourse" DROP CONSTRAINT "ResumeCiapCourse_pkey",
DROP COLUMN "resumeOwnerEmail",
ADD COLUMN     "resumeOwnerId" UUID NOT NULL,
ADD CONSTRAINT "ResumeCiapCourse_pkey" PRIMARY KEY ("resumeOwnerId", "courseId");

-- AlterTable
ALTER TABLE "ResumeLanguage" DROP CONSTRAINT "ResumeLanguage_pkey",
DROP COLUMN "resumeOwnerEmail",
ADD COLUMN     "resumeOwnerId" UUID NOT NULL,
ADD CONSTRAINT "ResumeLanguage_pkey" PRIMARY KEY ("resumeOwnerId", "languageName");

-- AlterTable
ALTER TABLE "ResumeSoftSkill" DROP CONSTRAINT "ResumeSoftSkill_pkey",
DROP COLUMN "resumeOwnerEmail",
ADD COLUMN     "resumeOwnerId" UUID NOT NULL,
ADD CONSTRAINT "ResumeSoftSkill_pkey" PRIMARY KEY ("resumeOwnerId", "skillName");

-- AlterTable
ALTER TABLE "ResumeTechnicalSkill" DROP CONSTRAINT "ResumeTechnicalSkill_pkey",
DROP COLUMN "resumeOwnerEmail",
ADD COLUMN     "resumeOwnerId" UUID NOT NULL,
ADD CONSTRAINT "ResumeTechnicalSkill_pkey" PRIMARY KEY ("resumeOwnerId", "skillName", "skillCategoryName");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_pkey",
DROP COLUMN "resumeOwnerEmail",
ADD COLUMN     "resumeOwnerId" UUID NOT NULL,
ADD CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("resumeOwnerId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Alumni" ADD CONSTRAINT "Alumni_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graduation" ADD CONSTRAINT "Graduation_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_alumniWhoAppliedId_fkey" FOREIGN KEY ("alumniWhoAppliedId") REFERENCES "Alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_resumeOwnerId_fkey" FOREIGN KEY ("resumeOwnerId") REFERENCES "Resume"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeCiapCourse" ADD CONSTRAINT "ResumeCiapCourse_resumeOwnerId_fkey" FOREIGN KEY ("resumeOwnerId") REFERENCES "Resume"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSoftSkill" ADD CONSTRAINT "ResumeSoftSkill_resumeOwnerId_fkey" FOREIGN KEY ("resumeOwnerId") REFERENCES "Resume"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeTechnicalSkill" ADD CONSTRAINT "ResumeTechnicalSkill_resumeOwnerId_fkey" FOREIGN KEY ("resumeOwnerId") REFERENCES "Resume"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguage" ADD CONSTRAINT "ResumeLanguage_resumeOwnerId_fkey" FOREIGN KEY ("resumeOwnerId") REFERENCES "Resume"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_resumeOwnerId_fkey" FOREIGN KEY ("resumeOwnerId") REFERENCES "Resume"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HigherEducationStudy" ADD CONSTRAINT "HigherEducationStudy_resumeOwnerId_fkey" FOREIGN KEY ("resumeOwnerId") REFERENCES "Resume"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionOfInterest" ADD CONSTRAINT "PositionOfInterest_resumeOwnerId_fkey" FOREIGN KEY ("resumeOwnerId") REFERENCES "Resume"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryOfInterest" ADD CONSTRAINT "IndustryOfInterest_resumeOwnerId_fkey" FOREIGN KEY ("resumeOwnerId") REFERENCES "Resume"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;
