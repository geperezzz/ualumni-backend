-- CreateTable
CREATE TABLE "JobOffer" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "careerId" UUID NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graduate" (
    "email" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,

    CONSTRAINT "Graduate_pkey" PRIMARY KEY ("email")
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
    "id" UUID NOT NULL,
    "numberOfDownloads" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CiapCourse" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CiapCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftSkill" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalSkill" (
    "resumeId" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TechnicalSkill_pkey" PRIMARY KEY ("resumeId","name")
);

-- CreateTable
CREATE TABLE "Language" (
    "resumeId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "masteryLevel" INTEGER NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("resumeId","name")
);

-- CreateTable
CREATE TABLE "PortfolioItem" (
    "resumeId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PortfolioItem_pkey" PRIMARY KEY ("resumeId","title")
);

-- CreateTable
CREATE TABLE "HigherEducationStudy" (
    "resumeId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HigherEducationStudy_pkey" PRIMARY KEY ("resumeId","title")
);

-- CreateTable
CREATE TABLE "PositionOfInterest" (
    "resumeId" UUID NOT NULL,
    "positionName" TEXT NOT NULL,

    CONSTRAINT "PositionOfInterest_pkey" PRIMARY KEY ("resumeId","positionName")
);

-- CreateTable
CREATE TABLE "IndustryOfInterest" (
    "resumeId" UUID NOT NULL,
    "industryName" TEXT NOT NULL,

    CONSTRAINT "IndustryOfInterest_pkey" PRIMARY KEY ("resumeId","industryName")
);

-- CreateTable
CREATE TABLE "GraduateResume" (
    "graduateEmail" TEXT NOT NULL,
    "resumeId" UUID NOT NULL,
    "careerId" UUID NOT NULL,

    CONSTRAINT "GraduateResume_pkey" PRIMARY KEY ("graduateEmail","resumeId","careerId")
);

-- CreateTable
CREATE TABLE "_ResumeToSoftSkill" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CiapCourseToResume" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Career_name_key" ON "Career"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GraduateResume_resumeId_key" ON "GraduateResume"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "_ResumeToSoftSkill_AB_unique" ON "_ResumeToSoftSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ResumeToSoftSkill_B_index" ON "_ResumeToSoftSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CiapCourseToResume_AB_unique" ON "_CiapCourseToResume"("A", "B");

-- CreateIndex
CREATE INDEX "_CiapCourseToResume_B_index" ON "_CiapCourseToResume"("B");

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_graduateWhoAppliedEmail_fkey" FOREIGN KEY ("graduateWhoAppliedEmail") REFERENCES "Graduate"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalSkill" ADD CONSTRAINT "TechnicalSkill_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HigherEducationStudy" ADD CONSTRAINT "HigherEducationStudy_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionOfInterest" ADD CONSTRAINT "PositionOfInterest_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryOfInterest" ADD CONSTRAINT "IndustryOfInterest_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraduateResume" ADD CONSTRAINT "GraduateResume_graduateEmail_fkey" FOREIGN KEY ("graduateEmail") REFERENCES "Graduate"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraduateResume" ADD CONSTRAINT "GraduateResume_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraduateResume" ADD CONSTRAINT "GraduateResume_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToSoftSkill" ADD CONSTRAINT "_ResumeToSoftSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToSoftSkill" ADD CONSTRAINT "_ResumeToSoftSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "SoftSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CiapCourseToResume" ADD CONSTRAINT "_CiapCourseToResume_A_fkey" FOREIGN KEY ("A") REFERENCES "CiapCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CiapCourseToResume" ADD CONSTRAINT "_CiapCourseToResume_B_fkey" FOREIGN KEY ("B") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
