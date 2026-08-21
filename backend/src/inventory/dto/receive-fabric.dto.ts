import { Transform, Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { MeasurementUnit } from '@prisma/client';

export class ReceiveFabricDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  @Matches(/^[A-Z0-9]+$/, {
    message: 'supplierCode may contain only letters and numbers',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  supplierCode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @Matches(/^[A-Z0-9_]+$/, {
    message: 'fabricType must be a valid master-data code',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  fabricType!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  color!: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  quantity!: number;

  @IsIn([MeasurementUnit.YARDS, MeasurementUnit.METERS])
  unitOfMeasure!: MeasurementUnit;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  supplierInvoiceNumber!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  supplierDeliveryChallanNumber!: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  pricePerUnit!: number;
}
