-- CreateTable
CREATE TABLE "ClubSeasonalStats" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "otl" INTEGER NOT NULL DEFAULT 0,
    "adj" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ClubSeasonalStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClubSeasonalStats" ADD CONSTRAINT "ClubSeasonalStats_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubSeasonalStats" ADD CONSTRAINT "ClubSeasonalStats_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
