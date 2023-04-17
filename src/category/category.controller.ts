import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CategoryDTO, CategoryUpdateDTO } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @Roles(Role.Manager, Role.Admin, Role.User)
  async createCategory(@Body() dto: CategoryDTO) {
    return this.categoryService.createCategory(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @Roles(Role.Manager, Role.Admin, Role.User)
  async getCategory() {
    return this.categoryService.getCategory();
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  @Roles(Role.Manager, Role.Admin, Role.User)
  async updateCategory(@Body() dto: CategoryUpdateDTO) {
    return this.categoryService.updateCategory(dto.id, dto.newId);
  }
}
