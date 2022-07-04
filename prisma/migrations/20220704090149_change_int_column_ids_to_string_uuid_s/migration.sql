/*
  Warnings:

  - The primary key for the `Columns` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_columnId_fkey";

-- AlterTable
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Columns_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Columns_id_seq";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "columnId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
