import { Controller, Get, Query, Param } from '@nestjs/common';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {
    console.log('ListingsController initialized');
  }

  @Get()
  async findAll(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    console.log('GET /listings called with params:', { city, minPrice, page, limit });
    
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;
    
    const result = await this.listingsService.findAll(city, minPriceNum, pageNum, limitNum);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('GET /listings/:id called with id:', id);
    return this.listingsService.findOne(id);
  }
}