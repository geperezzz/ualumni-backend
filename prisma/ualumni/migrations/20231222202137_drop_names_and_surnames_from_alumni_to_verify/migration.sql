/*
  Warnings:

  - You are about to drop the column `names` on the `AlumniToVerify` table. All the data in the column will be lost.
  - You are about to drop the column `surnames` on the `AlumniToVerify` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AlumniToVerify" DROP COLUMN "names",
DROP COLUMN "surnames";
