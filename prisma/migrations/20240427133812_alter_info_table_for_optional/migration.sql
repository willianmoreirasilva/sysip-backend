-- DropForeignKey
ALTER TABLE "Printers" DROP CONSTRAINT "Printers_dpt_id_fkey";

-- DropForeignKey
ALTER TABLE "Printers" DROP CONSTRAINT "Printers_network_ip_id_fkey";

-- AlterTable
ALTER TABLE "Printers" ALTER COLUMN "network_ip_id" DROP NOT NULL,
ALTER COLUMN "dpt_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Printers" ADD CONSTRAINT "Printers_network_ip_id_fkey" FOREIGN KEY ("network_ip_id") REFERENCES "Ips_addresses"("network_ip") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Printers" ADD CONSTRAINT "Printers_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "Departaments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
