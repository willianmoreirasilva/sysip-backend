/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Networks_addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Networks_addresses_address_key" ON "Networks_addresses"("address");
