import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { BatchType, Prisma, ProcessingStage } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReceiveFabricDto } from './dto/receive-fabric.dto';

export interface ReceiveFabricResult {
  success: true;
  message: string;
  batchId: string;
  totalAmount: string;
}

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  private readonly transactionAttempts = 3;

  constructor(private readonly prisma: PrismaService) {}

  async receiveRawFabric(dto: ReceiveFabricDto): Promise<ReceiveFabricResult> {
    for (let attempt = 1; attempt <= this.transactionAttempts; attempt += 1) {
      try {
        const batch = await this.prisma.$transaction(
          async (transaction) => {
            const [supplier, fabricType] = await Promise.all([
              transaction.supplier.findUnique({
                where: { code: dto.supplierCode },
                select: { id: true, active: true },
              }),
              transaction.fabricType.findUnique({
                where: { code: dto.fabricType },
                select: { id: true, active: true },
              }),
            ]);

            if (!supplier?.active) {
              throw new NotFoundException('Selected supplier was not found');
            }
            if (!fabricType?.active) {
              throw new NotFoundException('Selected fabric type was not found');
            }

            const batchCount = await transaction.itemBatch.count();
            const batchId = this.generateBatchId(dto, batchCount + 1);
            const totalAmount = new Prisma.Decimal(dto.quantity).mul(
              dto.pricePerUnit,
            );

            return transaction.itemBatch.create({
              data: {
                id: batchId,
                type: BatchType.RAW_FABRIC,
                currentStage: ProcessingStage.WAREHOUSE_RAW,
                quantity: dto.quantity,
                unitOfMeasure: dto.unitOfMeasure,
                supplierId: supplier.id,
                fabricTypeId: fabricType.id,
                color: dto.color,
                supplierInvoiceNumber: dto.supplierInvoiceNumber,
                supplierDeliveryChallanNumber:
                  dto.supplierDeliveryChallanNumber,
                pricePerUnit: dto.pricePerUnit,
                totalAmount,
              },
              select: { id: true, totalAmount: true },
            });
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );

        return {
          success: true,
          message: 'Raw fabric received successfully',
          batchId: batch.id,
          totalAmount: batch.totalAmount?.toFixed(2) ?? '0.00',
        };
      } catch (error: unknown) {
        if (this.isRetryableTransactionError(error) && attempt < 3) {
          continue;
        }

        if (error instanceof HttpException) {
          throw error;
        }

        this.logger.error(
          'Unable to receive raw fabric',
          error instanceof Error ? error.stack : String(error),
        );

        if (this.isRetryableTransactionError(error)) {
          throw new ServiceUnavailableException(
            'Inventory is busy. Please submit the receipt again.',
          );
        }

        throw new InternalServerErrorException(
          'Unable to receive fabric at this time',
        );
      }
    }

    throw new ServiceUnavailableException(
      'Inventory is busy. Please submit the receipt again.',
    );
  }

  private generateBatchId(dto: ReceiveFabricDto, count: number): string {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');

    return `${year}${month}-${dto.supplierCode}-${dto.fabricType}-T${count}`;
  }

  private isRetryableTransactionError(error: unknown): boolean {
    return (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === 'P2034' || error.code === 'P2002')
    );
  }
}
