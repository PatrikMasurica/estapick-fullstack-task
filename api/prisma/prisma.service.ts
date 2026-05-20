import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Create a PostgreSQL connection pool
    const pool = new Pool({
      connectionString: "postgresql://postgres:patrikmasurica@localhost:5432/estapick_db?schema=public"
    });
    
    // Create the Prisma adapter
    const adapter = new PrismaPg(pool);
    
    // Pass the adapter to PrismaClient
    super({ adapter });
    console.log('PrismaService initialized');
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Database disconnected');
  }
}