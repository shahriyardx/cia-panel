/*
  Warnings:

  - Added the required column `clubId` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MatchClub" DROP CONSTRAINT "MatchClub_clubAgainstId_fkey";

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "is_lagout" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_ot" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "MatchPlayer" ADD COLUMN     "clubId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ClubStats" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "ClubStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClubStats" ADD CONSTRAINT "ClubStats_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchClub" ADD CONSTRAINT "MatchClub_clubAgainstId_fkey" FOREIGN KEY ("clubAgainstId") REFERENCES "Club"("clubId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "MatchClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;
