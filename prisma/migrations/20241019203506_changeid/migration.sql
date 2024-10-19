/*
  Warnings:

  - A unique constraint covering the columns `[clubId]` on the table `Club` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MatchClub" DROP CONSTRAINT "MatchClub_clubAgainstId_fkey";

-- DropForeignKey
ALTER TABLE "MatchClub" DROP CONSTRAINT "MatchClub_clubId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Club_clubId_key" ON "Club"("clubId");

-- AddForeignKey
ALTER TABLE "MatchClub" ADD CONSTRAINT "MatchClub_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchClub" ADD CONSTRAINT "MatchClub_clubAgainstId_fkey" FOREIGN KEY ("clubAgainstId") REFERENCES "Club"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;
