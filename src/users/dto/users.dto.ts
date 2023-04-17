import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  id: number;
  @IsEmail()
  email: string;
  firstName: string;
  avatar: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  roles: string[];
  information: string[];
  city: string;
  addition_information: string;
  orders: string[];
  cart: string[];
}
