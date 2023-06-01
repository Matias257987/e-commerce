-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_videojuegoId_fkey";

-- DropForeignKey
ALTER TABLE "consoles" DROP CONSTRAINT "consoles_videojuegoId_fkey";

-- DropForeignKey
ALTER TABLE "languages" DROP CONSTRAINT "languages_videojuegoId_fkey";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "videojuegoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "consoles" ALTER COLUMN "videojuegoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "languages" ALTER COLUMN "videojuegoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_videojuegoId_fkey" FOREIGN KEY ("videojuegoId") REFERENCES "videojuego"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_videojuegoId_fkey" FOREIGN KEY ("videojuegoId") REFERENCES "videojuego"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consoles" ADD CONSTRAINT "consoles_videojuegoId_fkey" FOREIGN KEY ("videojuegoId") REFERENCES "videojuego"("id") ON DELETE SET NULL ON UPDATE CASCADE;
