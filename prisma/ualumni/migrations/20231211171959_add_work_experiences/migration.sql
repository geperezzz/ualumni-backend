-- CreateTable
CREATE TABLE "WorkExperience" (
    "resumeOwnerEmail" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("resumeOwnerEmail","number")
);

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_resumeOwnerEmail_fkey" FOREIGN KEY ("resumeOwnerEmail") REFERENCES "Resume"("ownerEmail") ON DELETE CASCADE ON UPDATE CASCADE;
