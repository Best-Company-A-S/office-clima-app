import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://3658d3e133840de8574ec261c5bf1db4@o4509110932144128.ingest.de.sentry.io/4509110933848144",

  integrations: [Sentry.replayIntegration()],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
