import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  products_id: number;
  currency: string;
  @IsNotEmpty()
  @IsNumber()
  sum: number;
  @IsNotEmpty()
  @IsNumber()
  count: number;
  city: string;
  address_delivery: string;
  status: string;
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
