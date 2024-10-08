-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_text_key" ON "Url"("text");
