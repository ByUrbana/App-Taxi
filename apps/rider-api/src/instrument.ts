// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { config } from 'dotenv';

config({
  path: __dirname + '/.env',
});

Sentry.init({
  dsn: process.env.SENTRY_DSN_RIDER_API,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
});
