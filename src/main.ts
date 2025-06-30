import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import * as express from "express";
import { join } from 'path';

async function bootstrap() {
  const port: number = Number(process.env.PORT) || 3000;
  log(`http://localhost:${port}`);
  const app = await NestFactory.create(AppModule);

  app.use(
    graphqlUploadExpress({
      maxFieldSize: 10000000,
      maxFiles: 5
    })
  )

  app.use(
    "/uploads", express.static(join(__dirname, "..", "uploads"))
  )

  await app.listen(port);
}
bootstrap();