import {
  BatchType,
  MeasurementUnit,
  Prisma,
  ProcessingStage,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReceiveFabricDto } from './dto/receive-fabric.dto';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('creates a raw fabric batch atomically and returns its Tag 1 ID', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-08-19T10:00:00Z'));

    const transaction = {
      supplier: {
        findUnique: jest
          .fn()
          .mockResolvedValue({ id: 'supplier-id', active: true }),
      },
      fabricType: {
        findUnique: jest
          .fn()
          .mockResolvedValue({ id: 'fabric-type-id', active: true }),
      },
      itemBatch: {
        count: jest.fn().mockResolvedValue(4),
        create: jest.fn().mockResolvedValue({
          id: '2608-ZT-LAWN-T5',
          totalAmount: new Prisma.Decimal(175000),
        }),
      },
    };
    const prisma = {
      $transaction: jest.fn(
        async (operation: (client: typeof transaction) => Promise<unknown>) =>
          operation(transaction),
      ),
    };
    const service = new InventoryService(prisma as unknown as PrismaService);
    const dto: ReceiveFabricDto = {
      supplierCode: 'ZT',
      fabricType: 'LAWN',
      quantity: 500,
      unitOfMeasure: MeasurementUnit.YARDS,
      color: 'BLACK',
      supplierInvoiceNumber: 'INV-001',
      supplierDeliveryChallanNumber: 'DC-001',
      pricePerUnit: 350,
    };

    await expect(service.receiveRawFabric(dto)).resolves.toEqual({
      success: true,
      message: 'Raw fabric received successfully',
      batchId: '2608-ZT-LAWN-T5',
      totalAmount: '175000.00',
    });
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(transaction.itemBatch.count).toHaveBeenCalledTimes(1);
    expect(transaction.itemBatch.create).toHaveBeenCalledWith({
      data: {
        id: '2608-ZT-LAWN-T5',
        type: BatchType.RAW_FABRIC,
        currentStage: ProcessingStage.WAREHOUSE_RAW,
        quantity: 500,
        unitOfMeasure: MeasurementUnit.YARDS,
        supplierId: 'supplier-id',
        fabricTypeId: 'fabric-type-id',
        color: 'BLACK',
        supplierInvoiceNumber: 'INV-001',
        supplierDeliveryChallanNumber: 'DC-001',
        pricePerUnit: 350,
        totalAmount: new Prisma.Decimal(175000),
      },
      select: { id: true, totalAmount: true },
    });
  });
});
