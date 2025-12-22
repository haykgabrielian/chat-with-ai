import * as Sentry from '@sentry/react';

export const initSentry = (): void => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.VITE_MODE;

  // Check if DSN is configured
  if (!dsn) {
    console.warn(
      '[Sentry] DSN not configured. Set VITE_SENTRY_DSN in your .env file to enable error tracking.'
    );
    return;
  }

  console.log('[Sentry] Initializing...', {
    mode: import.meta.env.VITE_MODE,
    dsnConfigured: !!dsn,
  });

  // Separate sample rates for traces vs errors
  const tracesSampleRate = environment === 'local' ? 1.0 : 0.1; // 10% of performance traces
  const replaySampleRate = environment === 'local' ? 1.0 : 0.1; // 10% of replays

  Sentry.init({
    dsn: dsn,

    // Set environment
    environment: import.meta.env.VITE_MODE,

    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Performance monitoring sample rate (0.0 to 1.0)
    tracesSampleRate: tracesSampleRate,
    // Session Replay sample rate
    replaysSessionSampleRate: replaySampleRate,
    // Always capture replay on error
    replaysOnErrorSampleRate: 1.0,
    // Capture 100% of errors
    sampleRate: 1.0,

    // Filter out certain errors
    beforeSend(event, hint) {
      // Filter out browser extension errors
      if (event.exception) {
        const error = hint.originalException;
        if (error instanceof Error && error.message?.includes('extension')) {
          return null;
        }
      }

      return event;
    },

    // Ignore certain errors
    ignoreErrors: [
      'top.GLOBALS',
      'chrome-extension://',
      'moz-extension://',
      'NetworkError',
      'Network request failed',
      'Non-Error promise rejection captured',
    ],

    // Denylisted URLs to ignore
    denyUrls: [/extensions\//i, /^chrome:\/\//i, /^moz-extension:\/\//i],
  });
};
