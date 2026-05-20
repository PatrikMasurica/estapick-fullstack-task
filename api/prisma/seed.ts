// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config'; // Load DATABASE_URL from .env

// 1. Create a pg connection pool using your database URL
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Create the Prisma adapter using the pool
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to PrismaClient
// This solves the "non-empty, valid PrismaClientOptions" error
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Your seed data remains the same
  const listings = [
    {
      title: 'Cozy Downtown Apartment',
      description: 'Beautiful apartment in the heart of the city',
      price: 150000,
      bedrooms: 2,
      bathrooms: 1,
      city: 'New York',
      address: '123 Main St',
      latitude: 40.7128,
      longitude: -74.0060,
      images: ["https://example.com/image1.jpg"],
    },
    {
      title: 'Spacious Suburban House',
      description: 'Perfect family home with a big backyard',
        price: 300000,
        bedrooms: 4,
        bathrooms: 3,
        city: 'Los Angeles',
        address: '456 Elm St',
        latitude: 34.0522,  
        longitude: -118.2437,
        images: ["https://example.com/image2.jpg"],
    },{
        title: 'Modern Condo with City View',
        description: 'Enjoy stunning city views from this modern condo',
        price: 200000,
        bedrooms: 3,                        
        bathrooms: 2,
        city: 'Chicago',
        address: '789 Oak St',
        latitude: 41.8781,
        longitude: -87.6298,
        images: ["https://example.com/image3.jpg"],
    }
  ];

  for (const listing of listings) {
    await prisma.listing.create({ data: listing });
  }

  console.log(`✅ Created ${listings.length} listings`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });