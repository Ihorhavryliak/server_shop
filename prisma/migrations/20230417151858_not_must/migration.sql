-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "address_delivery" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "address_delivery" DROP NOT NULL;
