import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serviceAccount = require('../configs/private-key-melos.json');
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
