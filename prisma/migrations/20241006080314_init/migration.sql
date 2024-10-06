-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'unknown');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('left_wing', 'right_wing', 'left_defense', 'right_defense', 'center', 'goalie');

-- CreateEnum
CREATE TYPE "Hand" AS ENUM ('left', 'right');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "primaryConsole" TEXT NOT NULL,
    "psn" TEXT,
    "psn_account_id" TEXT,
    "gamertag" TEXT,
    "xbox_account_id" TEXT,
    "eaId" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "jerseyNumber" INTEGER NOT NULL,
    "primaryPosition" "Position" NOT NULL,
    "secondaryPosition" "Position" NOT NULL,
    "city" TEXT NOT NULL,
    "shootingHand" "Hand" NOT NULL,
    "phone" TEXT,
    "console_verified" BOOLEAN NOT NULL DEFAULT false,
    "console_ip" TEXT,
    "console_agent" TEXT,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "npsso" TEXT NOT NULL,
    "xapi" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
