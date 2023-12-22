-- CreateTable
CREATE TABLE "AlumniToVerify" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "AlumniToVerify_pkey" PRIMARY KEY ("email")
);
