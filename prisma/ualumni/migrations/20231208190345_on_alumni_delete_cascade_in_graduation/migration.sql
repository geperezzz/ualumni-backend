-- DropForeignKey
ALTER TABLE "Graduation" DROP CONSTRAINT "Graduation_alumniEmail_fkey";

-- AddForeignKey
ALTER TABLE "Graduation" ADD CONSTRAINT "Graduation_alumniEmail_fkey" FOREIGN KEY ("alumniEmail") REFERENCES "Alumni"("email") ON DELETE CASCADE ON UPDATE CASCADE;
