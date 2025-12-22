import path from 'path';
import react from '@vitejs/plugin-react';

import { defineConfig, loadEnv } from 'vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';

  return {
    plugins: [
      react(),
      isProduction &&
        sentryVitePlugin({
          org: env.SENTRY_ORG,
          project: env.SENTRY_PROJECT,
          authToken: env.SENTRY_AUTH_TOKEN,
          sourcemaps: {
            assets: './dist/**',
            ignore: ['node_modules'],
          },
          telemetry: false,
        }),
    ].filter(Boolean),

    build: {
      sourcemap: isProduction,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      port: 5173,
    },
  };
});
