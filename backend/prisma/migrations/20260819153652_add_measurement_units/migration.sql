/*
  Warnings:

  - The `unitOfMeasure` column on the `ItemBatch` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('YARDS', 'METERS', 'SUITS');

-- AlterTable
ALTER TABLE "ItemBatch" DROP COLUMN "unitOfMeasure",
ADD COLUMN     "unitOfMeasure" "MeasurementUnit" NOT NULL DEFAULT 'YARDS';
