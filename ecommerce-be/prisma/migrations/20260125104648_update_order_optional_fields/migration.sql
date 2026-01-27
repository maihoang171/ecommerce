-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "recipientName" DROP NOT NULL,
ALTER COLUMN "recipientPhone" DROP NOT NULL,
ALTER COLUMN "shippingStreet" DROP NOT NULL,
ALTER COLUMN "shippingCity" DROP NOT NULL,
ALTER COLUMN "shippingDistrict" DROP NOT NULL,
ALTER COLUMN "shippingWard" DROP NOT NULL;
