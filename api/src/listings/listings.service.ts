import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: {
    city?: string;
    minPrice?: number;
    page?: number;
    limit?: number;
  }) {
    const { city, minPrice, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (city && city.trim() !== '') {
      where.city = {
        contains: city,
        mode: 'insensitive',
      };
    }
    
    if (minPrice && !isNaN(minPrice)) {
      where.price = { 
        gte: minPrice 
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.listing.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    return this.prisma.listing.findUnique({ 
      where: { id } 
    });
  }
}