import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateOrderDto) {
    try {
      await this.prisma.orders.create({
        data: {
          products_id: {
            connect: [{ id: dto.products_id }],
          },
          currency: dto.currency ? dto.currency : 'USD',
          count: dto.count ? dto.count : 1,
          city: dto.city ? dto.city : null,
          address_delivery: dto.address_delivery ? dto.address_delivery : null,
          user: {
            connect: { id: dto.user_id },
          },
        },
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const orders = await this.prisma.orders.findMany();
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const orders = await this.prisma.orders.findMany({
        where: {
          user_id: id,
        },
        /*  include: {
          user: true,
        }, */
      });
      if (!orders) {
        return { success: false };
      }

      return orders;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, dto: CreateOrderDto) {
    try {
      await this.prisma.orders.update({
        where: {
          id,
        },
        data: {
          products_id: {
            connect: [{ id: dto.products_id }],
          },
          currency: dto.currency ? dto.currency : 'USD',
          count: dto.count ? dto.count : 1,
          city: dto.city ? dto.city : null,
          address_delivery: dto.address_delivery ? dto.address_delivery : null,
        },
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.orders.delete({
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
