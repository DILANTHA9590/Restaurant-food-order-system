// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('User API endpoints')
    .setVersion('1.0')
    .addBearerAuth(
      {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  name: 'JWT',              
  description: 'Enter JWT token', 
  in: 'header',             
}

    ) // for JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);


    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // extra fields strip karanawa
      forbidNonWhitelisted: true,
      transform: true, // DTO classes use karanna
    }),
  );

  await app.listen(3000);
}
bootstrap();
