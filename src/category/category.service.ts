import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async createCategory(dto: CategoryDTO) {
    try {
      const category = await this.prisma.category.create({
        data: {
          name: dto.name,
          isMain: dto.isMain ? dto.isMain : false,
          /*           childId: {
            connect: [
              {
                id: dto.childId ? dto.childId : null,
              },
            ],
          }, */
        },
      });
      if (!category) {
        throw new InternalServerErrorException({
          success: false,
        });
      }
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async getCategory() {
    try {
      const categories = await this.prisma.category.findMany({
        where: { isMain: true },
        include: {
          childId: {
            include: {
              childId: true,
            },
          },
        },
      });
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id: number, newId: number) {
    try {
      const categories = await this.prisma.category.update({
        where: {
          id,
        },
        data: {
          childId: {
            connect: [
              {
                id: newId,
              },
            ],
          },
        },
      });
      return categories;
    } catch (error) {
      throw error;
    }
  }
}
