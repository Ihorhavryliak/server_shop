import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { join } from 'path';
import * as fs from 'fs';
import { FileProduct } from './product.controller';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(dto: ProductDTO, files: FileProduct[]) {
    try {
      //create product
      const connectArr = dto.categories ? [{ id: dto.categories }] : [];
      const product = await this.prisma.product.create({
        data: {
          name: dto.name,
          title: dto.title ? dto.title : null,
          description: dto.description ? dto.description : null,
          price: dto.price ? dto.price : 0,
          count: dto.count ? dto.count : 1,
          //image: nameImages,
          categories: {
            connect: connectArr,
          },
        },
      });
      //file
      const nameImages = [];
      if (files.length > 0) {
        const FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
        const { originalname, buffer } = files[0];
        files.forEach((file) => {
          if (!FILE_TYPES.includes(file.mimetype))
            throw new UnprocessableEntityException(
              `file type should be anyone of the ${FILE_TYPES.join(', ')}`,
            );
          const fileName = originalname;
          const filePath = join(__dirname, '..', 'uploads');
          nameImages.push(`${filePath}/${fileName}`);
          fs.writeFile(`${filePath}/${fileName}`, buffer, (error) => {
            if (error) {
              throw error;
            }
          });
        });
      }
      //find and update images
      const productUpdate = this.prisma.product.update({
        where: { id: product.id },
        data: {
          image: [...nameImages, ...product.image],
        },
      });
      return productUpdate;
    } catch (error) {
      throw error;
    }
  }

  async getProduct() {
    try {
      const products = await this.prisma.product.findMany();
      return products;
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(dto: ProductDTO) {
    try {
      const connectArr = dto.categories ? [{ id: dto.categories }] : [];
      await this.prisma.product.update({
        where: {
          id: dto.id,
        },
        data: {
          name: dto.name,
          title: dto.title ? dto.title : null,
          description: dto.description ? dto.description : null,
          price: dto.price ? dto.price : 0,
          count: dto.count ? dto.count : 1,
          categories: {
            connect: connectArr,
          },
        },
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(id: number) {
    try {
      await this.prisma.product.delete({
        where: {
          id,
        },
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}
