import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000'
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
  await app.listen(process.env.PORT || 9001);
}
bootstrap();
