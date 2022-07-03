/*
  Warnings:

  - Added the required column `userId` to the `Boards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boards" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
