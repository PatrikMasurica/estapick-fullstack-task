// prisma.config.ts
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'ts-node prisma/seed.ts', // Points to your updated seed file
  },
 datasource: {
    url: process.env.DATABASE_URL || "postgresql://postgres:patrikmasurica@localhost:5432/estapick_db?schema=public",
  },
});