import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
