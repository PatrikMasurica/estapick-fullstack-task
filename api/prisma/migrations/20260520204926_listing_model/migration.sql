/*
  Warnings:

  - Added the required column `address` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathrooms` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `images` on the `Listing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bathrooms" INTEGER NOT NULL,
DROP COLUMN "images",
ADD COLUMN     "images" JSONB NOT NULL;
