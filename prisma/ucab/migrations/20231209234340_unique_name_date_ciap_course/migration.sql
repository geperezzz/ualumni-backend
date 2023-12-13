/*
  Warnings:

  - A unique constraint covering the columns `[name,completionDate]` on the table `CiapCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CiapCourse_name_completionDate_key" ON "CiapCourse"("name", "completionDate");
