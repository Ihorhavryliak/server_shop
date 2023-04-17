import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  Query,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() dto: ProductDTO) {
    return this.productService.createProduct(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProduct() {
    return this.productService.getProduct();
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Query() query: { id: string }) {
    return this.productService.deleteProduct(+query.id);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateProduct(@Body() dto: ProductDTO) {
    return this.productService.updateProduct(dto);
  }
}
