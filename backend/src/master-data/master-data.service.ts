import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class MasterDataService {
  private readonly logger = new Logger(MasterDataService.name);

  constructor(private readonly prisma: PrismaService) {}

  listSuppliers() {
    return this.prisma.supplier.findMany({
      where: { active: true },
      select: { id: true, code: true, name: true, active: true },
      orderBy: { name: 'asc' },
    });
  }

  async createSupplier(dto: CreateSupplierDto) {
    try {
      return await this.prisma.supplier.create({
        data: dto,
        select: { id: true, code: true, name: true, active: true },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Supplier code already exists');
      }

      this.logger.error(
        'Unable to create supplier',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Unable to create supplier');
    }
  }

  listFabricTypes() {
    return this.prisma.fabricType.findMany({
      where: { active: true },
      select: { id: true, code: true, name: true, active: true },
      orderBy: { name: 'asc' },
    });
  }
}
