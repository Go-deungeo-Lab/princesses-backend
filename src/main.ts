import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // 프론트엔드 주소
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();