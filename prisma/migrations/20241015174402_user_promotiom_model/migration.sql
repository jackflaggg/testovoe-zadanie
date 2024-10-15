/*
  Warnings:

  - You are about to drop the `Promotion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_supplierId_fkey";

-- DropTable
DROP TABLE "Promotion";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionModel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "PromotionModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- AddForeignKey
ALTER TABLE "PromotionModel" ADD CONSTRAINT "PromotionModel_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
