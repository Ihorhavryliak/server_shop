import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The email of a user',
    example: 'test@gmail.com',
    type: String,
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'The password of a user',
    example: '1234',
    type: String,
  })
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  password: string;

  id: number;
  firstName: string;
  avatar: string;
  roles: string[];
  information: string[];
  city: string;
  addition_information: string;
  orders: string[];
  cart: string[];
}

export class CreateUserDto extends PickType(UserDto, [
  'email',
  'password',
] as const) {}
