/*
  Warnings:

  - You are about to drop the column `end_date` on the `HigherEducationStudy` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `HigherEducationStudy` table. All the data in the column will be lost.
  - Added the required column `password` to the `Graduate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `HigherEducationStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `HigherEducationStudy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Graduate" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HigherEducationStudy" DROP COLUMN "end_date",
DROP COLUMN "start_date",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
