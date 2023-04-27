import {
  File,
  FileInterceptor,
  FilesInterceptor,
} from '@nest-lab/fastify-multer';
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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

export type FileProduct = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: any;
  size: number;
};

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files'))
  async createProduct(
    @Body() dto: ProductDTO,
    @UploadedFiles()
    files: Array<FileProduct>,
  ) {
    return this.productService.createProduct(dto, files);
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
