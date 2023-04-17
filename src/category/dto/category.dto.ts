import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryDTO {
  id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  image: string[];
  title?: string;
  description?: string;
  products?: string[];
  childId?: number;
  isMain: boolean;
}

export class CategoryUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsNumber()
  newId: number;
}
