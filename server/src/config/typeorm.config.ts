import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  url: process.env.DATABASE_URL || undefined,

  host: process.env.DATABASE_URL ? undefined : 'localhost',
  port: process.env.DATABASE_URL ? undefined : 5432,
  username: process.env.DATABASE_URL ? undefined : 'postgres',
  password: process.env.DATABASE_URL ? undefined : '1234',
  database: process.env.DATABASE_URL ? undefined : 'AICryptoAdvisor',

  autoLoadEntities: true,
  synchronize: true,

  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false,
};
