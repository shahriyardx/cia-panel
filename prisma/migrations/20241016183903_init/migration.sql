-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'unknown');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('left_wing', 'right_wing', 'left_defense', 'right_defense', 'center', 'goalie');

-- CreateEnum
CREATE TYPE "Hand" AS ENUM ('left', 'right');

-- CreateEnum
CREATE TYPE "MatchSide" AS ENUM ('home', 'away');

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
    "blazeId" TEXT NOT NULL,
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
    "user_ip" TEXT,
    "console_ip" TEXT,
    "console_agent" TEXT,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "npsso" TEXT NOT NULL,
    "xapi" TEXT NOT NULL,
    "support_server" TEXT NOT NULL DEFAULT '1283055660866600960',
    "seasonId" TEXT,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "left_wing" TEXT NOT NULL,
    "right_wing" TEXT NOT NULL,
    "left_defense" TEXT NOT NULL,
    "right_defense" TEXT NOT NULL,
    "center" TEXT NOT NULL,
    "goalie" TEXT NOT NULL,
    "playstation" TEXT NOT NULL,
    "xbox" TEXT NOT NULL,
    "signup_add_roles" TEXT[],
    "signup_remove_roles" TEXT[],

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "ip" TEXT NOT NULL,

    CONSTRAINT "Logins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InviteCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InviteCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "homeGoal" TEXT NOT NULL,
    "awayGoal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchClub" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "goalsAgainst" TEXT NOT NULL,
    "clubDivision" TEXT NOT NULL,
    "cNhlOnlineGameType" TEXT NOT NULL,
    "garaw" TEXT NOT NULL,
    "gfraw" TEXT NOT NULL,
    "losses" TEXT NOT NULL,
    "memberString" TEXT NOT NULL,
    "opponentClubId" TEXT NOT NULL,
    "opponentScore" TEXT NOT NULL,
    "opponentTeamArtAbbr" TEXT NOT NULL,
    "passa" TEXT NOT NULL,
    "passc" TEXT NOT NULL,
    "ppg" TEXT NOT NULL,
    "ppo" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "scoreString" TEXT NOT NULL,
    "shots" TEXT NOT NULL,
    "teamArtAbbr" TEXT NOT NULL,
    "teamSide" "MatchSide" NOT NULL,
    "toa" TEXT NOT NULL,
    "winnerByDnf" TEXT NOT NULL,
    "winnerByGoalieDnf" TEXT NOT NULL,

    CONSTRAINT "MatchClub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchPLayer" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blazeId" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "glbrksavepct" TEXT NOT NULL,
    "glbrksaves" TEXT NOT NULL,
    "glbrkshots" TEXT NOT NULL,
    "gldsaves" TEXT NOT NULL,
    "glga" TEXT NOT NULL,
    "glgaa" TEXT NOT NULL,
    "glpensavepct" TEXT NOT NULL,
    "glpensaves" TEXT NOT NULL,
    "glpenshots" TEXT NOT NULL,
    "glpkclearzone" TEXT NOT NULL,
    "glpokechecks" TEXT NOT NULL,
    "glsavepct" TEXT NOT NULL,
    "glsaves" TEXT NOT NULL,
    "glshots" TEXT NOT NULL,
    "glsoperiods" TEXT NOT NULL,
    "isGuest" TEXT NOT NULL,
    "opponentClubId" TEXT NOT NULL,
    "opponentScore" TEXT NOT NULL,
    "opponentTeamId" TEXT NOT NULL,
    "player_dnf" TEXT NOT NULL,
    "playerLevel" TEXT NOT NULL,
    "pNhlOnlineGameType" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "posSorted" TEXT NOT NULL,
    "ratingDefense" TEXT NOT NULL,
    "ratingOffense" TEXT NOT NULL,
    "ratingTeamplay" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "skassists" TEXT NOT NULL,
    "skbs" TEXT NOT NULL,
    "skdeflections" TEXT NOT NULL,
    "skfol" TEXT NOT NULL,
    "skfopct" TEXT NOT NULL,
    "skfow" TEXT NOT NULL,
    "skgiveaways" TEXT NOT NULL,
    "skgoals" TEXT NOT NULL,
    "skgwg" TEXT NOT NULL,
    "skhits" TEXT NOT NULL,
    "skinterceptions" TEXT NOT NULL,
    "skpassattempts" TEXT NOT NULL,
    "skpasses" TEXT NOT NULL,
    "skpasspct" TEXT NOT NULL,
    "skpenaltiesdrawn" TEXT NOT NULL,
    "skpim" TEXT NOT NULL,
    "skpkclearzone" TEXT NOT NULL,
    "skplusmin" TEXT NOT NULL,
    "skpossession" TEXT NOT NULL,
    "skppg" TEXT NOT NULL,
    "sksaucerpasses" TEXT NOT NULL,
    "skshg" TEXT NOT NULL,
    "skshotattempts" TEXT NOT NULL,
    "skshotonnetpct" TEXT NOT NULL,
    "skshotpct" TEXT NOT NULL,
    "skshots" TEXT NOT NULL,
    "sktakeaways" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "teamSide" TEXT NOT NULL,
    "toi" TEXT NOT NULL,
    "toiseconds" TEXT NOT NULL,
    "playername" TEXT NOT NULL,
    "clientPlatform" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchPLayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Url_text_key" ON "Url"("text");

-- CreateIndex
CREATE UNIQUE INDEX "InviteCode_userId_key" ON "InviteCode"("userId");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logins" ADD CONSTRAINT "Logins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchClub" ADD CONSTRAINT "MatchClub_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchClub" ADD CONSTRAINT "MatchClub_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPLayer" ADD CONSTRAINT "MatchPLayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPLayer" ADD CONSTRAINT "MatchPLayer_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPLayer" ADD CONSTRAINT "MatchPLayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
