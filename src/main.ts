import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  })
);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();