import { CreateSupplierDto } from './dto/create-supplier.dto';
import { MasterDataService } from './master-data.service';
export declare class MasterDataController {
    private readonly masterDataService;
    constructor(masterDataService: MasterDataService);
    listSuppliers(): import("@prisma/client").Prisma.PrismaPromise<{
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
    listFabricTypes(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        code: string;
        active: boolean;
    }[]>;
}
