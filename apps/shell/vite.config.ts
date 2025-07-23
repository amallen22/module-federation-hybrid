import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import { resolve } from 'path'

// Detectar si estamos en un entorno que debe usar URLs de producción reales
// Solo usar producción si explícitamente se define VITE_USE_PRODUCTION_URLS
const useProductionUrls = process.env.VITE_USE_PRODUCTION_URLS === 'true'

console.log('NODE_ENV ==>', process.env.NODE_ENV)
console.log('useProductionUrls ==>', useProductionUrls)
console.log('VITE_USE_PRODUCTION_URLS ==>', process.env.VITE_USE_PRODUCTION_URLS)

// Reemplaza esta URL con la URL base de tu despliegue en S3/CloudFront
const productionRemoteBaseUrl = 'https://stage.resumecoach.com'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: useProductionUrls
      ? {
        product: `${productionRemoteBaseUrl}/product/assets/remoteEntry.js`,
        ui: `${productionRemoteBaseUrl}/ui/assets/remoteEntry.js`,
        login: `${productionRemoteBaseUrl}/login/assets/remoteEntry.js`
      }
      : process.env.NODE_ENV === 'development'
      ? {
        // En modo desarrollo, desde /dist/assets/
        product: 'http://localhost:5001/dist/assets/remoteEntry.js',
        ui: 'http://localhost:5002/dist/assets/remoteEntry.js',
        login: 'http://localhost:5003/dist/assets/remoteEntry.js'
      }
      : {
        // En modo preview (producción local), con /dist/
        product: 'http://localhost:5001/dist/assets/remoteEntry.js',
        ui: 'http://localhost:5002/dist/assets/remoteEntry.js',
        login: 'http://localhost:5003/dist/assets/remoteEntry.js'
      },
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        'react': {
          import: false,
          shareScope: 'default',
          requiredVersion: '^18.3.1',
        },
        'react-dom': {
          import: false,
          shareScope: 'default', 
          requiredVersion: '^18.3.1',
        },
        'react-router-dom': {
          import: false,
          shareScope: 'default',
          requiredVersion: '^6.30.0',
        }
      }
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    sourcemap: true
  },
  define: {
    global: "globalThis"
  },
  resolve: {
    alias: {
      '@packages/ui': resolve(__dirname, '../../packages/ui-kit/src/index.ts'),
    }
  },
  server: {
    port: 5000,
    strictPort: true,
    host: true
  }
})
