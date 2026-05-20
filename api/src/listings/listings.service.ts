import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {
    console.log('ListingsService initialized');
  }

  async findAll(city?: string, minPrice?: number, page: number = 1, limit: number = 10) {
    try {
      console.log('Finding listings with filters:', { city, minPrice, page, limit });
      
      const skip = (page - 1) * limit;
      const where: any = {};
      
      if (city) {
        where.city = city;
      }
      if (minPrice) {
        where.price = { gte: minPrice };
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
      
      console.log(`Found ${data.length} listings`);
      
      return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    console.log('Finding listing with id:', id);
    return this.prisma.listing.findUnique({
      where: { id },
    });
  }
}