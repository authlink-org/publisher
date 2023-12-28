-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "clerk" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "aboutme" TEXT,
    "views" INTEGER NOT NULL,
    "linkvertise_api" TEXT,
    "workink_api" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL,
    "image_url" TEXT,
    "youtube_url" TEXT,
    "profileClerk" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL,
    "generations" INTEGER NOT NULL,
    "skips" INTEGER NOT NULL,
    "profileClerk" TEXT,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_clerk_key" ON "Profile"("clerk");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_profileClerk_fkey" FOREIGN KEY ("profileClerk") REFERENCES "Profile"("clerk") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_profileClerk_fkey" FOREIGN KEY ("profileClerk") REFERENCES "Profile"("clerk") ON DELETE SET NULL ON UPDATE CASCADE;
