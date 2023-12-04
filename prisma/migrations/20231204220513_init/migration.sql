-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ALUMNI');

-- CreateTable
CREATE TABLE "JobOffer" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyContact" TEXT NOT NULL,
    "companyLogo" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "offerLocation" TEXT NOT NULL,
    "offerTimestamp" TIMESTAMP(3) NOT NULL,
    "careerName" TEXT NOT NULL,
    "contractTypeName" TEXT NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractType" (
    "name" TEXT NOT NULL,

    CONSTRAINT "ContractType_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Career" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Alumni" (
    "email" TEXT NOT NULL,
    "address" TEXT,
    "telephoneNumber" TEXT,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graduation" (
    "careerName" TEXT NOT NULL,
    "alumniEmail" TEXT NOT NULL,
    "graduationDate" DATE NOT NULL,

    CONSTRAINT "Graduation_pkey" PRIMARY KEY ("careerName","alumniEmail")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "jobOfferId" UUID NOT NULL,
    "alumniWhoAppliedEmail" TEXT NOT NULL,
    "applicationTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("jobOfferId","alumniWhoAppliedEmail")
);

-- CreateTable
CREATE TABLE "Resume" (
    "ownerEmail" TEXT NOT NULL,
    "numberOfDownloads" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "visibleSince" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aboutMe" TEXT,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("ownerEmail")
);

-- CreateTable
CREATE TABLE "CiapCourse" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "CiapCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeCiapCourse" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "courseId" UUID NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "ResumeCiapCourse_pkey" PRIMARY KEY ("resumeOwnerEmail","courseId")
);

-- CreateTable
CREATE TABLE "SoftSkill" (
    "name" TEXT NOT NULL,

    CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ResumeSoftSkill" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "ResumeSoftSkill_pkey" PRIMARY KEY ("resumeOwnerEmail","skillName")
);

-- CreateTable
CREATE TABLE "SkillCategory" (
    "name" TEXT NOT NULL,

    CONSTRAINT "SkillCategory_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "TechnicalSkill" (
    "name" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "TechnicalSkill_pkey" PRIMARY KEY ("name","categoryName")
);

-- CreateTable
CREATE TABLE "ResumeTechnicalSkill" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "skillCategoryName" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "ResumeTechnicalSkill_pkey" PRIMARY KEY ("resumeOwnerEmail","skillName","skillCategoryName")
);

-- CreateTable
CREATE TABLE "Language" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ResumeLanguage" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "languageName" TEXT NOT NULL,
    "masteryLevel" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "ResumeLanguage_pkey" PRIMARY KEY ("resumeOwnerEmail","languageName")
);

-- CreateTable
CREATE TABLE "PortfolioItem" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sourceLink" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "PortfolioItem_pkey" PRIMARY KEY ("resumeOwnerEmail","title")
);

-- CreateTable
CREATE TABLE "HigherEducationStudy" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "endDate" DATE NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "HigherEducationStudy_pkey" PRIMARY KEY ("resumeOwnerEmail","title")
);

-- CreateTable
CREATE TABLE "PositionOfInterest" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "positionName" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "PositionOfInterest_pkey" PRIMARY KEY ("resumeOwnerEmail","positionName")
);

-- CreateTable
CREATE TABLE "IndustryOfInterest" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "industryName" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "IndustryOfInterest_pkey" PRIMARY KEY ("resumeOwnerEmail","industryName")
);

-- CreateTable
CREATE TABLE "_CareerToSkillCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "CiapCourse_name_date_key" ON "CiapCourse"("name", "date");

-- CreateIndex
CREATE UNIQUE INDEX "_CareerToSkillCategory_AB_unique" ON "_CareerToSkillCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CareerToSkillCategory_B_index" ON "_CareerToSkillCategory"("B");

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_careerName_fkey" FOREIGN KEY ("careerName") REFERENCES "Career"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_contractTypeName_fkey" FOREIGN KEY ("contractTypeName") REFERENCES "ContractType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumni" ADD CONSTRAINT "Alumni_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graduation" ADD CONSTRAINT "Graduation_careerName_fkey" FOREIGN KEY ("careerName") REFERENCES "Career"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graduation" ADD CONSTRAINT "Graduation_alumniEmail_fkey" FOREIGN KEY ("alumniEmail") REFERENCES "Alumni"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_alumniWhoAppliedEmail_fkey" FOREIGN KEY ("alumniWhoAppliedEmail") REFERENCES "Alumni"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "Alumni"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeCiapCourse" ADD CONSTRAINT "ResumeCiapCourse_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeCiapCourse" ADD CONSTRAINT "ResumeCiapCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "CiapCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSoftSkill" ADD CONSTRAINT "ResumeSoftSkill_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSoftSkill" ADD CONSTRAINT "ResumeSoftSkill_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "SoftSkill"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalSkill" ADD CONSTRAINT "TechnicalSkill_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "SkillCategory"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeTechnicalSkill" ADD CONSTRAINT "ResumeTechnicalSkill_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeTechnicalSkill" ADD CONSTRAINT "ResumeTechnicalSkill_skillName_skillCategoryName_fkey" FOREIGN KEY ("skillName", "skillCategoryName") REFERENCES "TechnicalSkill"("name", "categoryName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguage" ADD CONSTRAINT "ResumeLanguage_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguage" ADD CONSTRAINT "ResumeLanguage_languageName_fkey" FOREIGN KEY ("languageName") REFERENCES "Language"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HigherEducationStudy" ADD CONSTRAINT "HigherEducationStudy_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionOfInterest" ADD CONSTRAINT "PositionOfInterest_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryOfInterest" ADD CONSTRAINT "IndustryOfInterest_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareerToSkillCategory" ADD CONSTRAINT "_CareerToSkillCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Career"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareerToSkillCategory" ADD CONSTRAINT "_CareerToSkillCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SkillCategory"("name") ON DELETE CASCADE ON UPDATE CASCADE;
