import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx|ts|tsx)$/,
      jsxRuntime: 'automatic'
    }),
    federation({
      name: 'user',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx'
      },
      shared: {
        'react': {
          singleton: true,
          requiredVersion: '^18.3.1'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.1'
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.28.0'
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@packages/ui': resolve(__dirname, '../../packages/ui/src'),
      '@packages/query': resolve(__dirname, '../../packages/query/src'),
      '@packages/auth': resolve(__dirname, '../../packages/auth/src')
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: 'esbuild', // Usar esbuild (más rápido, viene incluido)
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
  },
  server: {
    port: 5004,
    strictPort: true,
    cors: {
      origin: [
        'http://localhost:5000',
        'http://localhost:5001',
        'http://localhost:5002',
        'http://localhost:5003',
        'http://localhost:5004'
      ],
      credentials: true
    }
  }
});

