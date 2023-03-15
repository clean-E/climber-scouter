import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders:
      "Content-Type,Accept,Authorization,Access-Control-Allow-Origin",
    preflightContinue: false,
  });

  await app.listen(3000);
}
bootstrap();
