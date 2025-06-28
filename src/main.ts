import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { log } from "console";
import * as session from "express-session";

async function bootstrap() {
  const port: number = Number(process.env.PORT) || 3000;
  log(`http://localhost:${port}`);
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SESSION as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 3600 * 24,
      },
    })
  );
  await app.listen(port);
}
bootstrap();
