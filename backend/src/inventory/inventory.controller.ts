import { Body, Controller, Post } from '@nestjs/common';
import { ReceiveFabricDto } from './dto/receive-fabric.dto';
import { InventoryService, ReceiveFabricResult } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('receive')
  receiveRawFabric(
    @Body() dto: ReceiveFabricDto,
  ): Promise<ReceiveFabricResult> {
    return this.inventoryService.receiveRawFabric(dto);
  }
}
