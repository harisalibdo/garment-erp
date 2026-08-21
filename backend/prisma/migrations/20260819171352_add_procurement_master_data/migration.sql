-- AlterTable
ALTER TABLE "ItemBatch" ADD COLUMN     "color" TEXT,
ADD COLUMN     "fabricTypeId" TEXT,
ADD COLUMN     "pricePerUnit" DECIMAL(65,30),
ADD COLUMN     "supplierDeliveryChallanNumber" TEXT,
ADD COLUMN     "supplierId" TEXT,
ADD COLUMN     "supplierInvoiceNumber" TEXT,
ADD COLUMN     "totalAmount" DECIMAL(65,30);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FabricType" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FabricType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_code_key" ON "Supplier"("code");

-- CreateIndex
CREATE UNIQUE INDEX "FabricType_code_key" ON "FabricType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "FabricType_name_key" ON "FabricType"("name");

-- AddForeignKey
ALTER TABLE "ItemBatch" ADD CONSTRAINT "ItemBatch_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBatch" ADD CONSTRAINT "ItemBatch_fabricTypeId_fkey" FOREIGN KEY ("fabricTypeId") REFERENCES "FabricType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
