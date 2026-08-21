-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'OPS_HEAD', 'WAREHOUSE', 'QA');

-- CreateEnum
CREATE TYPE "BatchType" AS ENUM ('RAW_FABRIC', 'CUT_BUNDLE', 'FINISHED_CATALOG');

-- CreateEnum
CREATE TYPE "ProcessingStage" AS ENUM ('WAREHOUSE_RAW', 'CUTTING', 'EMBROIDERY', 'STITCHING', 'HANDWORK', 'QA_INSPECTION', 'PACKED_CATALOG');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'WAREHOUSE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemBatch" (
    "id" TEXT NOT NULL,
    "type" "BatchType" NOT NULL,
    "currentStage" "ProcessingStage" NOT NULL DEFAULT 'WAREHOUSE_RAW',
    "quantity" DECIMAL(65,30) NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "parentBatchId" TEXT,
    "currentVendorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorLedger" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "referenceChallan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorLedger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ItemBatch" ADD CONSTRAINT "ItemBatch_parentBatchId_fkey" FOREIGN KEY ("parentBatchId") REFERENCES "ItemBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBatch" ADD CONSTRAINT "ItemBatch_currentVendorId_fkey" FOREIGN KEY ("currentVendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorLedger" ADD CONSTRAINT "VendorLedger_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
