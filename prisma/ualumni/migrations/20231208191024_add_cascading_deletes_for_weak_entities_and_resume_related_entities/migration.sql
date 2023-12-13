-- DropForeignKey
ALTER TABLE "HigherEducationStudy" DROP CONSTRAINT "HigherEducationStudy_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "IndustryOfInterest" DROP CONSTRAINT "IndustryOfInterest_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_alumniWhoAppliedEmail_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_jobOfferId_fkey";

-- DropForeignKey
ALTER TABLE "JobOfferTechnicalSkill" DROP CONSTRAINT "JobOfferTechnicalSkill_jobOfferId_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioItem" DROP CONSTRAINT "PortfolioItem_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "PositionOfInterest" DROP CONSTRAINT "PositionOfInterest_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "ResumeCiapCourse" DROP CONSTRAINT "ResumeCiapCourse_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "ResumeLanguage" DROP CONSTRAINT "ResumeLanguage_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "ResumeSoftSkill" DROP CONSTRAINT "ResumeSoftSkill_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "ResumeTechnicalSkill" DROP CONSTRAINT "ResumeTechnicalSkill_resumeOwnerEmail_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalSkill" DROP CONSTRAINT "TechnicalSkill_categoryName_fkey";

-- AddForeignKey
ALTER TABLE "JobOfferTechnicalSkill" ADD CONSTRAINT "JobOfferTechnicalSkill_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_alumniWhoAppliedEmail_fkey" FOREIGN KEY ("alumniWhoAppliedEmail") REFERENCES "Alumni"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeCiapCourse" ADD CONSTRAINT "ResumeCiapCourse_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSoftSkill" ADD CONSTRAINT "ResumeSoftSkill_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalSkill" ADD CONSTRAINT "TechnicalSkill_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "SkillCategory"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeTechnicalSkill" ADD CONSTRAINT "ResumeTechnicalSkill_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguage" ADD CONSTRAINT "ResumeLanguage_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HigherEducationStudy" ADD CONSTRAINT "HigherEducationStudy_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionOfInterest" ADD CONSTRAINT "PositionOfInterest_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryOfInterest" ADD CONSTRAINT "IndustryOfInterest_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE CASCADE ON UPDATE CASCADE;
