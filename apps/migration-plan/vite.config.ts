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
    minify: 'esbuild', // Minificación con esbuild (más rápido, ya incluido en Vite)
    cssCodeSplit: true, // Split CSS para mejor caching
    sourcemap: false, // Sin sourcemaps en producción
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks para mejor caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    // Optimización de assets
    assetsInlineLimit: 4096, // Inline assets < 4kb
    chunkSizeWarningLimit: 1000 // Warning si chunks > 1MB
  },
  // Base path para S3 (ajustar según necesidad)
  base: './' // Rutas relativas para funcionar en cualquier path de S3

});


