/*
  Warnings:

  - The primary key for the `SoftSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SoftSkill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ResumeToSoftSkill" DROP CONSTRAINT "_ResumeToSoftSkill_B_fkey";

-- AlterTable
ALTER TABLE "SoftSkill" DROP CONSTRAINT "SoftSkill_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "_ResumeToSoftSkill" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_ResumeToSoftSkill" ADD CONSTRAINT "_ResumeToSoftSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "SoftSkill"("name") ON DELETE CASCADE ON UPDATE CASCADE;
