import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // tambahkan prefix 'api' menjadi http://localhost:3001/api
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT!); // untuk env yang sudah memiliki nilai port pasti
  // await app.listen(process.env.PORT || 3001);
  // await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
