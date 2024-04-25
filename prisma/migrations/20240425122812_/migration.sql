/*
  Warnings:

  - You are about to drop the column `dns_one` on the `Ips_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `dns_two` on the `Ips_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `gatway` on the `Ips_addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Computers" ADD COLUMN     "code" TEXT;

-- AlterTable
ALTER TABLE "Ips_addresses" DROP COLUMN "dns_one",
DROP COLUMN "dns_two",
DROP COLUMN "gatway";

-- AlterTable
ALTER TABLE "Phones" ADD COLUMN     "code" TEXT;
