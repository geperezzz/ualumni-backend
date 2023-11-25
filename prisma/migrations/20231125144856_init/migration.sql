-- CreateTable
CREATE TABLE "JobOffer" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyContact" TEXT NOT NULL,
    "companyLogo" BYTEA NOT NULL,
    "department" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "offerLocation" TEXT NOT NULL,
    "offerDate" TIMESTAMP(3) NOT NULL,
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
CREATE TABLE "Alumni" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "telephoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "GraduationDates" (
    "graduateEmail" TEXT NOT NULL,
    "careerName" TEXT NOT NULL,
    "graduateDate" DATE NOT NULL,

    CONSTRAINT "GraduationDates_pkey" PRIMARY KEY ("graduateEmail","careerName")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "jobOfferId" UUID NOT NULL,
    "graduateWhoAppliedEmail" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("jobOfferId","graduateWhoAppliedEmail")
);

-- CreateTable
CREATE TABLE "Resume" (
    "ownerEmail" TEXT NOT NULL,
    "numberOfDownloads" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL,
    "aboutMe" TEXT,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("ownerEmail")
);

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "CiapCourse" (
    "name" TEXT NOT NULL,

    CONSTRAINT "CiapCourse_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ResumeCiapCourse" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "ciapCourseName" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "ResumeCiapCourse_pkey" PRIMARY KEY ("resumeOwnerEmail","ciapCourseName")
);

-- CreateTable
CREATE TABLE "SoftSkill" (
    "name" TEXT NOT NULL,

    CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ResumeSoftSkill" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "softSkillName" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "ResumeSoftSkill_pkey" PRIMARY KEY ("resumeOwnerEmail","softSkillName")
);

-- CreateTable
CREATE TABLE "TechnicalSkill" (
    "name" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "resumeOwnerEmail" TEXT,

    CONSTRAINT "TechnicalSkill_pkey" PRIMARY KEY ("categoryName","name")
);

-- CreateTable
CREATE TABLE "ResumeTechnicalSkill" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "technicalSkillName" TEXT NOT NULL,
    "technicalSkillCategory" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "ResumeTechnicalSkill_pkey" PRIMARY KEY ("technicalSkillName","resumeOwnerEmail","technicalSkillCategory")
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

    CONSTRAINT "ResumeLanguage_pkey" PRIMARY KEY ("languageName","resumeOwnerEmail")
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
    "endDate" TIMESTAMP(3) NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "HigherEducationStudy_pkey" PRIMARY KEY ("title","resumeOwnerEmail")
);

-- CreateTable
CREATE TABLE "PositionOfInterest" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "positionName" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "PositionOfInterest_pkey" PRIMARY KEY ("positionName","resumeOwnerEmail")
);

-- CreateTable
CREATE TABLE "IndustryOfInterest" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "industryName" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "IndustryOfInterest_pkey" PRIMARY KEY ("industryName","resumeOwnerEmail")
);

-- CreateTable
CREATE TABLE "_CareerToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AlumniToCareer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CareerToCategory_AB_unique" ON "_CareerToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CareerToCategory_B_index" ON "_CareerToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlumniToCareer_AB_unique" ON "_AlumniToCareer"("A", "B");

-- CreateIndex
CREATE INDEX "_AlumniToCareer_B_index" ON "_AlumniToCareer"("B");

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_careerName_fkey" FOREIGN KEY ("careerName") REFERENCES "Career"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_contractTypeName_fkey" FOREIGN KEY ("contractTypeName") REFERENCES "ContractType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraduationDates" ADD CONSTRAINT "GraduationDates_graduateEmail_fkey" FOREIGN KEY ("graduateEmail") REFERENCES "Alumni"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraduationDates" ADD CONSTRAINT "GraduationDates_careerName_fkey" FOREIGN KEY ("careerName") REFERENCES "Career"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_graduateWhoAppliedEmail_fkey" FOREIGN KEY ("graduateWhoAppliedEmail") REFERENCES "Alumni"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "Alumni"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeCiapCourse" ADD CONSTRAINT "ResumeCiapCourse_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeCiapCourse" ADD CONSTRAINT "ResumeCiapCourse_ciapCourseName_fkey" FOREIGN KEY ("ciapCourseName") REFERENCES "CiapCourse"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSoftSkill" ADD CONSTRAINT "ResumeSoftSkill_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSoftSkill" ADD CONSTRAINT "ResumeSoftSkill_softSkillName_fkey" FOREIGN KEY ("softSkillName") REFERENCES "SoftSkill"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalSkill" ADD CONSTRAINT "TechnicalSkill_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeTechnicalSkill" ADD CONSTRAINT "ResumeTechnicalSkill_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeTechnicalSkill" ADD CONSTRAINT "ResumeTechnicalSkill_technicalSkillName_technicalSkillCate_fkey" FOREIGN KEY ("technicalSkillName", "technicalSkillCategory") REFERENCES "TechnicalSkill"("name", "categoryName") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "_CareerToCategory" ADD CONSTRAINT "_CareerToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Career"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareerToCategory" ADD CONSTRAINT "_CareerToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlumniToCareer" ADD CONSTRAINT "_AlumniToCareer_A_fkey" FOREIGN KEY ("A") REFERENCES "Alumni"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlumniToCareer" ADD CONSTRAINT "_AlumniToCareer_B_fkey" FOREIGN KEY ("B") REFERENCES "Career"("name") ON DELETE CASCADE ON UPDATE CASCADE;
