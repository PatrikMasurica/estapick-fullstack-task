import { Controller, Get, Query, Param } from '@nestjs/common';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  async findAll(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    // Pass as an object, not separate arguments
    return this.listingsService.findAll({
      city: city,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }
}