/*
  Warnings:

  - You are about to drop the column `user` on the `Users_Admins` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users_Admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Users_Admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users_Admins" DROP COLUMN "user",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_Admins_email_key" ON "Users_Admins"("email");
