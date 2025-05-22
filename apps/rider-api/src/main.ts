import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RiderAPIModule } from './app/rider-api.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import fastifyMultipart from '@fastify/multipart';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

import './instrument';
import { getConfig } from 'license-verify';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    RiderAPIModule.register(),
    adapter,
  );

  const port = process.env.RIDER_API_PORT || 3000;
  app.enableShutdownHooks();
  app.enableCors();
  app.useStaticAssets({
    root: join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
  });
  app.register(fastifyMultipart as unknown as any, {
    limits: {
      fileSize: 10_000_000,
    },
  });
  const config = await getConfig(process.env.NODE_ENV ?? 'prod');
  if (config) {
    initializeApp({
      credential: credential.cert(
        `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`,
      ),
    });
  }

  await app.listen(
    {
      host: '0.0.0.0',
      port: parseInt(port.toString()),
    },
    () => {
      Logger.log('Listening at http://localhost:' + port, 'Rider API');
    },
  );
}

bootstrap();
