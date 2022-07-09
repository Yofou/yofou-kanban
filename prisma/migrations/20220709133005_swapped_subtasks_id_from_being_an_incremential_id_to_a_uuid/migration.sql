/*
  Warnings:

  - The primary key for the `SubTask` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubTask_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SubTask_id_seq";
