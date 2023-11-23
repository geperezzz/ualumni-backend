/*
  Warnings:

  - The primary key for the `JobApplication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `graduateWhoAppliedEmail` on the `JobApplication` table. All the data in the column will be lost.
  - You are about to drop the `Graduate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GraduateResume` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alumniWhoAppliedEmail` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GraduateResume" DROP CONSTRAINT "GraduateResume_careerId_fkey";

-- DropForeignKey
ALTER TABLE "GraduateResume" DROP CONSTRAINT "GraduateResume_graduateEmail_fkey";

-- DropForeignKey
ALTER TABLE "GraduateResume" DROP CONSTRAINT "GraduateResume_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_graduateWhoAppliedEmail_fkey";

-- AlterTable
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_pkey",
DROP COLUMN "graduateWhoAppliedEmail",
ADD COLUMN     "alumniWhoAppliedEmail" TEXT NOT NULL,
ADD CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("jobOfferId", "alumniWhoAppliedEmail");

-- DropTable
DROP TABLE "Graduate";

-- DropTable
DROP TABLE "GraduateResume";

-- CreateTable
CREATE TABLE "Alumni" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "AlumniResume" (
    "alumniEmail" TEXT NOT NULL,
    "resumeId" UUID NOT NULL,
    "careerId" UUID NOT NULL,

    CONSTRAINT "AlumniResume_pkey" PRIMARY KEY ("alumniEmail","resumeId","careerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlumniResume_resumeId_key" ON "AlumniResume"("resumeId");

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_alumniWhoAppliedEmail_fkey" FOREIGN KEY ("alumniWhoAppliedEmail") REFERENCES "Alumni"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumniResume" ADD CONSTRAINT "AlumniResume_alumniEmail_fkey" FOREIGN KEY ("alumniEmail") REFERENCES "Alumni"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumniResume" ADD CONSTRAINT "AlumniResume_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumniResume" ADD CONSTRAINT "AlumniResume_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
