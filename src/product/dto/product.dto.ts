import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class ProductDTO {
  id: number;
  /* @IsString()
  @IsNotEmpty() */
  name: string;
  title: string;
  description: string;
  price: number;
  count: number;
  image: string[];
  cart: string;
  cart_id: number;
  orders: number;
  orders_id: number;
  categories: number;
  createdAt: string;
  updatedAt: string;
}
