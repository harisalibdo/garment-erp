import { MeasurementUnit } from '@prisma/client';
export declare class ReceiveFabricDto {
    supplierCode: string;
    fabricType: string;
    color: string;
    quantity: number;
    unitOfMeasure: MeasurementUnit;
    supplierInvoiceNumber: string;
    supplierDeliveryChallanNumber: string;
    pricePerUnit: number;
}
