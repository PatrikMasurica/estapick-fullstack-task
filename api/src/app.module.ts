import { Module } from '@nestjs/common';
import { ListingsModule } from './listings/listings.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ListingsModule, PrismaModule],
})
export class AppModule {}