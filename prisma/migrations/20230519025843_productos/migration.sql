/*
  Warnings:

  - You are about to drop the column `favoriteIds` on the `usuario` table. All the data in the column will be lost.
  - The primary key for the `verificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `cuenta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sesion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cuenta" DROP CONSTRAINT "cuenta_userId_fkey";

-- DropForeignKey
ALTER TABLE "sesion" DROP CONSTRAINT "sesion_userId_fkey";

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "favoriteIds",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "verificationToken" DROP CONSTRAINT "verificationToken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "verificationToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "verificationToken_id_seq";

-- DropTable
DROP TABLE "cuenta";

-- DropTable
DROP TABLE "sesion";

-- CreateTable
CREATE TABLE "account" (
    "id" VARCHAR(36) NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" VARCHAR(36) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videojuego" (
    "id" VARCHAR(36) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "code" SERIAL NOT NULL,

    CONSTRAINT "videojuego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "console" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "console_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating" (
    "id" VARCHAR(36) NOT NULL,
    "score" INTEGER NOT NULL,
    "videojuegoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_categoriesTovideojuego" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
);

-- CreateTable
CREATE TABLE "_languagesTovideojuego" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
);

-- CreateTable
CREATE TABLE "_consoleTovideojuego" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "session_sessionToken_key" ON "session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "videojuego_code_key" ON "videojuego"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_categoriesTovideojuego_AB_unique" ON "_categoriesTovideojuego"("A", "B");

-- CreateIndex
CREATE INDEX "_categoriesTovideojuego_B_index" ON "_categoriesTovideojuego"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_languagesTovideojuego_AB_unique" ON "_languagesTovideojuego"("A", "B");

-- CreateIndex
CREATE INDEX "_languagesTovideojuego_B_index" ON "_languagesTovideojuego"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_consoleTovideojuego_AB_unique" ON "_consoleTovideojuego"("A", "B");

-- CreateIndex
CREATE INDEX "_consoleTovideojuego_B_index" ON "_consoleTovideojuego"("B");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_videojuegoId_fkey" FOREIGN KEY ("videojuegoId") REFERENCES "videojuego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoriesTovideojuego" ADD CONSTRAINT "_categoriesTovideojuego_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoriesTovideojuego" ADD CONSTRAINT "_categoriesTovideojuego_B_fkey" FOREIGN KEY ("B") REFERENCES "videojuego"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_languagesTovideojuego" ADD CONSTRAINT "_languagesTovideojuego_A_fkey" FOREIGN KEY ("A") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_languagesTovideojuego" ADD CONSTRAINT "_languagesTovideojuego_B_fkey" FOREIGN KEY ("B") REFERENCES "videojuego"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_consoleTovideojuego" ADD CONSTRAINT "_consoleTovideojuego_A_fkey" FOREIGN KEY ("A") REFERENCES "console"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_consoleTovideojuego" ADD CONSTRAINT "_consoleTovideojuego_B_fkey" FOREIGN KEY ("B") REFERENCES "videojuego"("id") ON DELETE CASCADE ON UPDATE CASCADE;
