import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(dto: ProductDTO) {
    try {
      const connectArr = dto.categories ? [{ id: dto.categories }] : [];
      const product = await this.prisma.product.create({
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
      return product;
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
