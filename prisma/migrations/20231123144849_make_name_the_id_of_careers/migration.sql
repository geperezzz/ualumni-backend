/*
  Warnings:

  - The primary key for the `Career` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Career` table. All the data in the column will be lost.
  - The primary key for the `GraduateResume` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `careerId` on the `GraduateResume` table. All the data in the column will be lost.
  - You are about to drop the column `careerId` on the `JobOffer` table. All the data in the column will be lost.
  - Added the required column `careerName` to the `GraduateResume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `careerName` to the `JobOffer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GraduateResume" DROP CONSTRAINT "GraduateResume_careerId_fkey";

-- DropForeignKey
ALTER TABLE "JobOffer" DROP CONSTRAINT "JobOffer_careerId_fkey";

-- DropIndex
DROP INDEX "Career_name_key";

-- AlterTable
ALTER TABLE "Career" DROP CONSTRAINT "Career_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Career_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "GraduateResume" DROP CONSTRAINT "GraduateResume_pkey",
DROP COLUMN "careerId",
ADD COLUMN     "careerName" TEXT NOT NULL,
ADD CONSTRAINT "GraduateResume_pkey" PRIMARY KEY ("graduateEmail", "resumeId", "careerName");

-- AlterTable
ALTER TABLE "JobOffer" DROP COLUMN "careerId",
ADD COLUMN     "careerName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_careerName_fkey" FOREIGN KEY ("careerName") REFERENCES "Career"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraduateResume" ADD CONSTRAINT "GraduateResume_careerName_fkey" FOREIGN KEY ("careerName") REFERENCES "Career"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
