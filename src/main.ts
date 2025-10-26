import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors({ origin: config.get('CORS_ORIGIN'), credentials: true });

  const swagger = new DocumentBuilder()
    .setTitle('Forum API')
    .setVersion('0.1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, doc);

  await app.listen(config.get('PORT') || 3000);
}
bootstrap();
