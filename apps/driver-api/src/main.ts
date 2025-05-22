import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';
import { join } from 'path';

import { DriverAPIModule } from './app/driver-api.module';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

import './instrument';
import { getConfig } from 'license-verify';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    DriverAPIModule.register(),
    adapter,
  );

  const port = process.env.DRIVER_API_PORT || 3000;
  app.enableShutdownHooks();
  app.enableCors();
  app.register(fastifyMultipart as unknown as any, {
    limits: {
      fileSize: 10000000,
    },
  });
  app.useStaticAssets({
    root: join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
  });
  const config = await getConfig(process.env.NODE_ENV ?? 'prod');
  if (config != null) {
    initializeApp({
      credential: credential.cert(
        `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`,
      ),
    });
  }
  await app.listen(
    {
      port: parseInt(port.toString()),
      host: '0.0.0.0',
    },
    () => {
      Logger.log('Listening at http://localhost:' + port, 'Driver API');
    },
  );
}

bootstrap();
