import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8888);

  console.log('GraphQL server running at http://localhost:8888/graphql');
}

bootstrap();