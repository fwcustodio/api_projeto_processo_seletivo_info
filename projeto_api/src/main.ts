import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import 'reflect-metadata';

const bootstrap = async () => {
  let app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(parseInt(process.env.PORT ?? '3000'));
};
bootstrap();

//http://localhost:3000/v1/veiculos
