import {
  File,
  FileInterceptor,
  FilesInterceptor,
} from '@nest-lab/fastify-multer';
import { ProductCreteDTO, ProductDTO } from './dto/product.dto';
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { Public } from 'src/auth/decorator/public.decorator';
import {
  DeleteProductResponseSchema,
  GetProductResponseSchema,
  ProductResponseSchema,
  UpdateProductResponseSchema,
} from 'src/schema/product.schema';

export type FileProduct = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: any;
  size: number;
};

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Create products' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create body',
    type: ProductCreteDTO,
  })
  @ApiOkResponse(ProductResponseSchema)
  @ApiBearerAuth()
  @Post()
  @Roles(Role.Manager, Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files'))
  async createProduct(
    @Body() dto: ProductCreteDTO,
    @UploadedFiles()
    files: Array<FileProduct>,
  ) {
    return this.productService.createProduct(dto, files);
  }

  @ApiOperation({ summary: 'Get products' })
  @ApiOkResponse(GetProductResponseSchema)
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProduct() {
    return this.productService.getProduct();
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiQuery({ name: 'id' })
  @ApiOkResponse(DeleteProductResponseSchema)
  @ApiBearerAuth()
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Query() query: { id: string }) {
    return this.productService.deleteProduct(+query.id);
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiBody(UpdateProductResponseSchema)
  @ApiOkResponse(DeleteProductResponseSchema)
  @ApiBearerAuth()
  @Patch()
  @Roles(Role.Manager, Role.Admin)
  @HttpCode(HttpStatus.OK)
  async updateProduct(@Body() dto: ProductDTO) {
    return this.productService.updateProduct(dto);
  }
}
