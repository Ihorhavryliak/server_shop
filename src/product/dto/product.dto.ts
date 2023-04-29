import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class ProductDTO {
  id: number;
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
  @IsString()
  @IsNotEmpty()
  name: string;
  title: string;
  description: string;
  price: number;
  count: number;
  image: string[];
  cart: string;
  orders: number;
  categories: number;
}

export class ProductCreteDTO extends OmitType(ProductDTO, ['id'] as const) {}
