-- CreateTable
CREATE TABLE "JobOfferTechnicalSkill" (
    "jobOfferId" UUID NOT NULL,
    "technicalSkillName" TEXT NOT NULL,
    "technicalSkillCategoryName" TEXT NOT NULL,

    CONSTRAINT "JobOfferTechnicalSkill_pkey" PRIMARY KEY ("jobOfferId","technicalSkillName","technicalSkillCategoryName")
);

-- AddForeignKey
ALTER TABLE "JobOfferTechnicalSkill" ADD CONSTRAINT "JobOfferTechnicalSkill_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOfferTechnicalSkill" ADD CONSTRAINT "JobOfferTechnicalSkill_technicalSkillName_technicalSkillCa_fkey" FOREIGN KEY ("technicalSkillName", "technicalSkillCategoryName") REFERENCES "TechnicalSkill"("name", "categoryName") ON DELETE RESTRICT ON UPDATE CASCADE;
