"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var InventoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let InventoryService = InventoryService_1 = class InventoryService {
    prisma;
    logger = new common_1.Logger(InventoryService_1.name);
    transactionAttempts = 3;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async receiveRawFabric(dto) {
        for (let attempt = 1; attempt <= this.transactionAttempts; attempt += 1) {
            try {
                const batch = await this.prisma.$transaction(async (transaction) => {
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
                        throw new common_1.NotFoundException('Selected supplier was not found');
                    }
                    if (!fabricType?.active) {
                        throw new common_1.NotFoundException('Selected fabric type was not found');
                    }
                    const batchCount = await transaction.itemBatch.count();
                    const batchId = this.generateBatchId(dto, batchCount + 1);
                    const totalAmount = new client_1.Prisma.Decimal(dto.quantity).mul(dto.pricePerUnit);
                    return transaction.itemBatch.create({
                        data: {
                            id: batchId,
                            type: client_1.BatchType.RAW_FABRIC,
                            currentStage: client_1.ProcessingStage.WAREHOUSE_RAW,
                            quantity: dto.quantity,
                            unitOfMeasure: dto.unitOfMeasure,
                            supplierId: supplier.id,
                            fabricTypeId: fabricType.id,
                            color: dto.color,
                            supplierInvoiceNumber: dto.supplierInvoiceNumber,
                            supplierDeliveryChallanNumber: dto.supplierDeliveryChallanNumber,
                            pricePerUnit: dto.pricePerUnit,
                            totalAmount,
                        },
                        select: { id: true, totalAmount: true },
                    });
                }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
                return {
                    success: true,
                    message: 'Raw fabric received successfully',
                    batchId: batch.id,
                    totalAmount: batch.totalAmount?.toFixed(2) ?? '0.00',
                };
            }
            catch (error) {
                if (this.isRetryableTransactionError(error) && attempt < 3) {
                    continue;
                }
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                this.logger.error('Unable to receive raw fabric', error instanceof Error ? error.stack : String(error));
                if (this.isRetryableTransactionError(error)) {
                    throw new common_1.ServiceUnavailableException('Inventory is busy. Please submit the receipt again.');
                }
                throw new common_1.InternalServerErrorException('Unable to receive fabric at this time');
            }
        }
        throw new common_1.ServiceUnavailableException('Inventory is busy. Please submit the receipt again.');
    }
    generateBatchId(dto, count) {
        const now = new Date();
        const year = String(now.getFullYear()).slice(-2);
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}${month}-${dto.supplierCode}-${dto.fabricType}-T${count}`;
    }
    isRetryableTransactionError(error) {
        return (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            (error.code === 'P2034' || error.code === 'P2002'));
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = InventoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map