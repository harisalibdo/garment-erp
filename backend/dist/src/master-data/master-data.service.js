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
var MasterDataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterDataService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let MasterDataService = MasterDataService_1 = class MasterDataService {
    prisma;
    logger = new common_1.Logger(MasterDataService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    listSuppliers() {
        return this.prisma.supplier.findMany({
            where: { active: true },
            select: { id: true, code: true, name: true, active: true },
            orderBy: { name: 'asc' },
        });
    }
    async createSupplier(dto) {
        try {
            return await this.prisma.supplier.create({
                data: dto,
                select: { id: true, code: true, name: true, active: true },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.ConflictException('Supplier code already exists');
            }
            this.logger.error('Unable to create supplier', error instanceof Error ? error.stack : String(error));
            throw new common_1.InternalServerErrorException('Unable to create supplier');
        }
    }
    listFabricTypes() {
        return this.prisma.fabricType.findMany({
            where: { active: true },
            select: { id: true, code: true, name: true, active: true },
            orderBy: { name: 'asc' },
        });
    }
};
exports.MasterDataService = MasterDataService;
exports.MasterDataService = MasterDataService = MasterDataService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MasterDataService);
//# sourceMappingURL=master-data.service.js.map