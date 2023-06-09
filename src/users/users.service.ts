import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UserDto } from './dto/users.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { DataTokenType } from 'src/types/user/user.type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<DataTokenType> {
    const isUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (isUser)
      throw new HttpException(
        { success: false, message: 'Conflict' },
        HttpStatus.CONFLICT,
      );

    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          password,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException({
              success: false,
              message: 'Credentials incorrect',
            });
          }
        }
        throw error;
      });

    return { sub: user.id, email: user.email, roles: user.roles };
  }
  async login(dto: CreateUserDto): Promise<DataTokenType> {
    //find user
    const user = await this.findUser(dto.email);
    //compare password
    const matchPassword = await bcrypt.compare(dto.password, user.password);
    if (!matchPassword) {
      throw new HttpException(
        { success: false, message: 'Unauthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { sub: user.id, email: user.email, roles: user.roles };
  }
  async refresh(email: string): Promise<DataTokenType> {
    //find user
    const user = await this.findUser(email);
    // check is user
    return { sub: user.id, email: user.email, roles: user.roles };
  }

  async findUser(email: string): Promise<UserDto> {
    //find user
    const user = (await this.prisma.user.findUnique({
      where: {
        email,
      },
    })) as any;
    //check
    if (!user) {
      throw new HttpException(
        { success: false, message: 'Unauthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
