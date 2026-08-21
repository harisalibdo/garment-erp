import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { MasterDataService } from './master-data.service';

@Controller('master-data')
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  @Get('suppliers')
  listSuppliers() {
    return this.masterDataService.listSuppliers();
  }

  @Post('suppliers')
  createSupplier(@Body() dto: CreateSupplierDto) {
    return this.masterDataService.createSupplier(dto);
  }

  @Get('fabric-types')
  listFabricTypes() {
    return this.masterDataService.listFabricTypes();
  }
}
