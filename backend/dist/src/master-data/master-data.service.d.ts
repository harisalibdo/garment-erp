import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
export declare class MasterDataService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    listSuppliers(): Prisma.PrismaPromise<{
        name: string;
        id: string;
        code: string;
        active: boolean;
    }[]>;
    createSupplier(dto: CreateSupplierDto): Promise<{
        name: string;
        id: string;
        code: string;
        active: boolean;
    }>;
    listFabricTypes(): Prisma.PrismaPromise<{
        name: string;
        id: string;
        code: string;
        active: boolean;
    }[]>;
}
