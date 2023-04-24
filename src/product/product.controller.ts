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

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() dto: ProductDTO) {
    return this.productService.createProduct(dto);
  }

  /* @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: {
        files: 1,
        fileSize: 1024 * 1024 * 5, // 5MB
      },
    }),
  )
  async uploadFile(@UploadedFiles() files: any) {
    console.log(files);
  }
 */
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
