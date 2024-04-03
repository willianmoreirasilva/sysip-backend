-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Computer" (
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

    CONSTRAINT "Computer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network_address" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Network_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ip_address" (
    "id" SERIAL NOT NULL,
    "network_id" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "network_ip" TEXT NOT NULL,
    "gatway" TEXT,
    "dns_one" TEXT,
    "dns_two" TEXT,

    CONSTRAINT "Ip_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Print" (
    "id" SERIAL NOT NULL,
    "network_ip_id" TEXT NOT NULL,
    "dpt_id" INTEGER NOT NULL,
    "sector" TEXT,
    "hostname" TEXT,
    "model" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT,

    CONSTRAINT "Print_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "dpt_id" INTEGER NOT NULL,
    "network_ip_id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "sector" TEXT,
    "model" TEXT,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Computer_network_ip_id_key" ON "Computer"("network_ip_id");

-- CreateIndex
CREATE UNIQUE INDEX "Ip_address_network_ip_key" ON "Ip_address"("network_ip");

-- CreateIndex
CREATE UNIQUE INDEX "Print_network_ip_id_key" ON "Print"("network_ip_id");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_network_ip_id_key" ON "Phone"("network_ip_id");

-- AddForeignKey
ALTER TABLE "Computer" ADD CONSTRAINT "Computer_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computer" ADD CONSTRAINT "Computer_network_ip_id_fkey" FOREIGN KEY ("network_ip_id") REFERENCES "Ip_address"("network_ip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computer" ADD CONSTRAINT "Computer_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ip_address" ADD CONSTRAINT "Ip_address_network_id_fkey" FOREIGN KEY ("network_id") REFERENCES "Network_address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Print" ADD CONSTRAINT "Print_network_ip_id_fkey" FOREIGN KEY ("network_ip_id") REFERENCES "Ip_address"("network_ip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Print" ADD CONSTRAINT "Print_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_network_ip_id_fkey" FOREIGN KEY ("network_ip_id") REFERENCES "Ip_address"("network_ip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
