import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Configuración SIMPLE para S3 (SIN Module Federation)
export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx|ts|tsx)$/,
      jsxRuntime: 'automatic'
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
    target: 'es2015', // Target más compatible
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000
  },
  base: './' // Rutas relativas para S3
});

