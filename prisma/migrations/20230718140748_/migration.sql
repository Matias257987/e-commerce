/*
  Warnings:

  - You are about to drop the column `videojuegoId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `videojuegoId` on the `consoles` table. All the data in the column will be lost.
  - You are about to drop the column `videojuegoId` on the `languages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_videojuegoId_fkey";

-- DropForeignKey
ALTER TABLE "consoles" DROP CONSTRAINT "consoles_videojuegoId_fkey";

-- DropForeignKey
ALTER TABLE "languages" DROP CONSTRAINT "languages_videojuegoId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "videojuegoId";

-- AlterTable
ALTER TABLE "consoles" DROP COLUMN "videojuegoId";

-- AlterTable
ALTER TABLE "languages" DROP COLUMN "videojuegoId";

-- CreateTable
CREATE TABLE "videojuegoCategories" (
    "videojuegoId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "videojuegoCategories_pkey" PRIMARY KEY ("videojuegoId","categoryId")
);

-- CreateTable
CREATE TABLE "videojuegoLanguages" (
    "videojuegoId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "videojuegoLanguages_pkey" PRIMARY KEY ("videojuegoId","languageId")
);

-- CreateTable
CREATE TABLE "videojuegoConsoles" (
    "videojuegoId" TEXT NOT NULL,
    "consoleId" TEXT NOT NULL,

    CONSTRAINT "videojuegoConsoles_pkey" PRIMARY KEY ("videojuegoId","consoleId")
);

-- AddForeignKey
ALTER TABLE "videojuegoCategories" ADD CONSTRAINT "videojuegoCategories_videojuegoId_fkey" FOREIGN KEY ("videojuegoId") REFERENCES "videojuego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videojuegoCategories" ADD CONSTRAINT "videojuegoCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videojuegoLanguages" ADD CONSTRAINT "videojuegoLanguages_videojuegoId_fkey" FOREIGN KEY ("videojuegoId") REFERENCES "videojuego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videojuegoLanguages" ADD CONSTRAINT "videojuegoLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videojuegoConsoles" ADD CONSTRAINT "videojuegoConsoles_videojuegoId_fkey" FOREIGN KEY ("videojuegoId") REFERENCES "videojuego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videojuegoConsoles" ADD CONSTRAINT "videojuegoConsoles_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "consoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
