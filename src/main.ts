import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
      const formatErrors = errors.map((err) => ({
        field: err.property,
        message: Object.values(err.constraints || {}).join(', ')
      }));

      return new BadRequestException({
        statusCode: 400,
        errors: formatErrors,
      });
    }
  }));

  const config = new DocumentBuilder()
    .setTitle('MovieSpace API')
    .setDescription('API documentation for MovieSpace')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth', // название схемы
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3004);
}
bootstrap();
