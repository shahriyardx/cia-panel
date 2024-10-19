/*
  Warnings:

  - Changed the type of `teamSide` on the `MatchClub` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "MatchClub" DROP COLUMN "teamSide",
ADD COLUMN     "teamSide" TEXT NOT NULL;

-- DropEnum
DROP TYPE "MatchSide";
