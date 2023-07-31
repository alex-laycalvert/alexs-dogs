/*
  Warnings:

  - You are about to drop the column `name` on the `Image` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "name",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
