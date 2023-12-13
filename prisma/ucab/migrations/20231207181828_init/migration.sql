-- CreateEnum
CREATE TYPE "StudentCareerStatus" AS ENUM ('ONGOING', 'DROPPED', 'FINISHED');

-- CreateTable
CREATE TABLE "Student" (
    "email" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Career" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "CiapCourse" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "completionDate" DATE NOT NULL,

    CONSTRAINT "CiapCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentCareer" (
    "studentEmail" TEXT NOT NULL,
    "careerName" TEXT NOT NULL,
    "status" "StudentCareerStatus" NOT NULL,
    "graduationDate" DATE,

    CONSTRAINT "StudentCareer_pkey" PRIMARY KEY ("studentEmail","careerName")
);

-- CreateTable
CREATE TABLE "_CiapCourseToStudent" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CiapCourseToStudent_AB_unique" ON "_CiapCourseToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_CiapCourseToStudent_B_index" ON "_CiapCourseToStudent"("B");

-- AddForeignKey
ALTER TABLE "StudentCareer" ADD CONSTRAINT "StudentCareer_studentEmail_fkey" FOREIGN KEY ("studentEmail") REFERENCES "Student"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCareer" ADD CONSTRAINT "StudentCareer_careerName_fkey" FOREIGN KEY ("careerName") REFERENCES "Career"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CiapCourseToStudent" ADD CONSTRAINT "_CiapCourseToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "CiapCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CiapCourseToStudent" ADD CONSTRAINT "_CiapCourseToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("email") ON DELETE CASCADE ON UPDATE CASCADE;
