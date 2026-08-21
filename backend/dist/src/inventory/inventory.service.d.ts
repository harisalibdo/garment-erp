import { PrismaService } from '../prisma/prisma.service';
import { ReceiveFabricDto } from './dto/receive-fabric.dto';
export interface ReceiveFabricResult {
    success: true;
    message: string;
    batchId: string;
    totalAmount: string;
}
export declare class InventoryService {
    private readonly prisma;
    private readonly logger;
    private readonly transactionAttempts;
    constructor(prisma: PrismaService);
    receiveRawFabric(dto: ReceiveFabricDto): Promise<ReceiveFabricResult>;
    private generateBatchId;
    private isRetryableTransactionError;
}
