import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx|ts|tsx)$/,
      jsxRuntime: 'automatic'
    }),
    federation({
      name: 'migrationPlan',
      filename: 'remoteEntry.js',
      manifest: true,
      exposes: {
        './App': './src/app/App.tsx'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.3.1'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.1'
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.30.1'
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/app'),
      '@packages/ui': resolve(__dirname, '../../packages/ui/src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [resolve(__dirname, '../../packages/ui/src/styles')]
      }
    }
  },
  server: {
    port: 5006,
    strictPort: true,
    cors: true
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    sourcemap: true
  }
});

