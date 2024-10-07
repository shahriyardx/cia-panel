-- CreateTable
CREATE TABLE "Logins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "ip" TEXT NOT NULL,

    CONSTRAINT "Logins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logins" ADD CONSTRAINT "Logins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
