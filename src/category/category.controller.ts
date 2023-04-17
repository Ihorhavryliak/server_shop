import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CategoryDTO, CategoryUpdateDTO } from './dto/category.dto';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  @Roles(Role.Manager, Role.Admin, Role.User)
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() dto: CategoryDTO) {
    return this.categoryService.createCategory(dto);
  }

  @Public()
  @Get()
  @Roles(Role.Manager, Role.Admin, Role.User)
  @HttpCode(HttpStatus.OK)
  async getCategory() {
    return this.categoryService.getCategory();
  }

  @Patch()
  @Roles(Role.Manager, Role.Admin, Role.User)
  @HttpCode(HttpStatus.OK)
  async updateCategory(@Body() dto: CategoryUpdateDTO) {
    return this.categoryService.updateCategory(dto.id, dto.newId);
  }
}
