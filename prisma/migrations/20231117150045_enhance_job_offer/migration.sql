/*
  Warnings:

  - You are about to drop the column `company` on the `JobOffer` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `JobOffer` table. All the data in the column will be lost.
  - Added the required column `companyContact` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyLogo` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractTypeName` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerDate` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerLocation` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `JobOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobOffer" DROP COLUMN "company",
DROP COLUMN "title",
ADD COLUMN     "companyContact" TEXT NOT NULL,
ADD COLUMN     "companyLogo" BYTEA NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "contractTypeName" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "offerDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "offerLocation" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ContractType" (
    "name" TEXT NOT NULL,

    CONSTRAINT "ContractType_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_contractTypeName_fkey" FOREIGN KEY ("contractTypeName") REFERENCES "ContractType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
