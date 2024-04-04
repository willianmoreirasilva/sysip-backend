/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Computer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Departament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ip_address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Network_address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Phone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Print` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Computer" DROP CONSTRAINT "Computer_dpt_id_fkey";

-- DropForeignKey
ALTER TABLE "Computer" DROP CONSTRAINT "Computer_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Computer" DROP CONSTRAINT "Computer_network_ip_id_fkey";

-- DropForeignKey
ALTER TABLE "Ip_address" DROP CONSTRAINT "Ip_address_network_id_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_dpt_id_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_network_ip_id_fkey";

-- DropForeignKey
ALTER TABLE "Print" DROP CONSTRAINT "Print_dpt_id_fkey";

-- DropForeignKey
ALTER TABLE "Print" DROP CONSTRAINT "Print_network_ip_id_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Computer";

-- DropTable
DROP TABLE "Departament";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Ip_address";

-- DropTable
DROP TABLE "Network_address";

-- DropTable
DROP TABLE "Phone";

-- DropTable
DROP TABLE "Print";

-- CreateTable
CREATE TABLE "Computers" (
    "id" SERIAL NOT NULL,
    "dpt_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "network_ip_id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "sector" TEXT,
    "hotsname" TEXT,
    "mac" TEXT,
    "processor" TEXT,
    "mem" TEXT,
    "hd" TEXT,
    "so" TEXT,

    CONSTRAINT "Computers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departaments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Departaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Networks_addresses" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Networks_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ips_addresses" (
    "id" SERIAL NOT NULL,
    "network_id" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "network_ip" TEXT NOT NULL,
    "gatway" TEXT,
    "dns_one" TEXT,
    "dns_two" TEXT,

    CONSTRAINT "Ips_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Printers" (
    "id" SERIAL NOT NULL,
    "network_ip_id" TEXT NOT NULL,
    "dpt_id" INTEGER NOT NULL,
    "sector" TEXT,
    "hostname" TEXT,
    "model" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT,

    CONSTRAINT "Printers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phones" (
    "id" SERIAL NOT NULL,
    "dpt_id" INTEGER NOT NULL,
    "network_ip_id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "sector" TEXT,
    "model" TEXT,

    CONSTRAINT "Phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Admins" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Users_Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Computers_network_ip_id_key" ON "Computers"("network_ip_id");

-- CreateIndex
CREATE UNIQUE INDEX "Ips_addresses_network_ip_key" ON "Ips_addresses"("network_ip");

-- CreateIndex
CREATE UNIQUE INDEX "Printers_network_ip_id_key" ON "Printers"("network_ip_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phones_network_ip_id_key" ON "Phones"("network_ip_id");

-- AddForeignKey
ALTER TABLE "Computers" ADD CONSTRAINT "Computers_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computers" ADD CONSTRAINT "Computers_network_ip_id_fkey" FOREIGN KEY ("network_ip_id") REFERENCES "Ips_addresses"("network_ip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computers" ADD CONSTRAINT "Computers_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "Departaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ips_addresses" ADD CONSTRAINT "Ips_addresses_network_id_fkey" FOREIGN KEY ("network_id") REFERENCES "Networks_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Printers" ADD CONSTRAINT "Printers_network_ip_id_fkey" FOREIGN KEY ("network_ip_id") REFERENCES "Ips_addresses"("network_ip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Printers" ADD CONSTRAINT "Printers_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "Departaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "Phones_network_ip_id_fkey" FOREIGN KEY ("network_ip_id") REFERENCES "Ips_addresses"("network_ip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "Phones_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "Departaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
