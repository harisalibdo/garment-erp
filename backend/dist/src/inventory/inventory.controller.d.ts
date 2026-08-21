import { ReceiveFabricDto } from './dto/receive-fabric.dto';
import { InventoryService, ReceiveFabricResult } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    receiveRawFabric(dto: ReceiveFabricDto): Promise<ReceiveFabricResult>;
}
