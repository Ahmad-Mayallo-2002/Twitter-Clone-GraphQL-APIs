import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';

async function bootstrap() {
  const port: number = Number(process.env.PORT) || 3000;
  log(`http://localhost:${port}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
