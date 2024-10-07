-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "support_server" TEXT NOT NULL DEFAULT '1283055660866600960';

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
