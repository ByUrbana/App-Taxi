// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { config } from 'dotenv';

config({
  path: __dirname + '/.env',
});

Logger.log('Configuring Sentry for Driver API', 'Driver API');
Logger.log('Sentry DSN: ' + process.env.SENTRY_DSN_DRIVER_API, 'Driver API');

Sentry.init({
  dsn: process.env.SENTRY_DSN_DRIVER_API,
  integrations: [nodeProfilingIntegration()],
  // Tracing
  tracesSampleRate: 1.0,
});
