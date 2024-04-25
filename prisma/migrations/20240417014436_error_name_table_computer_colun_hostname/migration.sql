/*
  Warnings:

  - You are about to drop the column `hotsname` on the `Computers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Computers" DROP COLUMN "hotsname",
ADD COLUMN     "hostname" TEXT;
