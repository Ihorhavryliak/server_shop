/*
  Warnings:

  - You are about to drop the column `parentId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "_Category" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Category_AB_unique" ON "_Category"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_B_index" ON "_Category"("B");

-- AddForeignKey
ALTER TABLE "_Category" ADD CONSTRAINT "_Category_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category" ADD CONSTRAINT "_Category_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
