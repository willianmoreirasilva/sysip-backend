-- DropForeignKey
ALTER TABLE "Phones" DROP CONSTRAINT "Phones_dpt_id_fkey";

-- AlterTable
ALTER TABLE "Phones" ALTER COLUMN "dpt_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "Phones_dpt_id_fkey" FOREIGN KEY ("dpt_id") REFERENCES "Departaments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
