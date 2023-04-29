import { TokenType } from './../types/user/user.type';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { Roles } from './decorator/roles.decorator';
import { Role } from './enum/role.enum';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  UserResponseLogOutSchema,
  UserResponseSchema,
  UserResponseTokenSchema,
} from 'src/schema/user.schema';

@ApiTags('Users')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse(UserResponseSchema)
  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async singUp(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.authService.singUp(dto, response);
  }

  @ApiOperation({ summary: 'Sigh in' })
  @ApiOkResponse(UserResponseSchema)
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.authService.login(dto, response);
  }

  @ApiOperation({ summary: 'Sigh out' })
  @ApiOkResponse(UserResponseLogOutSchema)
  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.authService.logout(request, response);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiOkResponse(UserResponseTokenSchema)
  @ApiBearerAuth()
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('refresh-token')
  async refreshToken(@Req() request: FastifyRequest) {
    return this.authService.refreshToken(request);
  }
  /*  @Public()
  @Get('file')
  @Roles(Role.User)
  async file(@Req() request: FastifyRequest) {
    return { file: 'file' };
  } */
}
