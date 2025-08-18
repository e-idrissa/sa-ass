import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AdminSeeder } from './common/config/seed.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4002);

  // Get the AdminSeeder service instance
  const adminSeeder = app.get(AdminSeeder);

  // Run the seeding logic
  await adminSeeder.seedAdminUser();

  //Enable class validation
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
