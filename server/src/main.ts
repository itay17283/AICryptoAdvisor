import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',       // פיתוח בפרונט
      'http://localhost:3001',       // פיתוח נוסף אם צריך
      'https://ai-crypto-advisor-pi.vercel.app',  // Front Production
    ],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
