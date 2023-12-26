/*
  Warnings:

  - You are about to drop the column `address` on the `AlumniToVerify` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `AlumniToVerify` table. All the data in the column will be lost.
  - You are about to drop the column `telephoneNumber` on the `AlumniToVerify` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AlumniToVerify" DROP COLUMN "address",
DROP COLUMN "role",
DROP COLUMN "telephoneNumber";
