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
    .setTitle('Moviespace')
    .setDescription('API documentation for Moviespace')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
