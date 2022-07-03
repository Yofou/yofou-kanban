/*
  Warnings:

  - Added the required column `columnId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "columnId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
