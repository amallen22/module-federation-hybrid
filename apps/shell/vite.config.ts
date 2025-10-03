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

// Plugin personalizado para arreglar el código problemático tanto en dev como build
const fixAuthManagerPlugin = () => {
  return {
    name: 'fix-auth-manager',
    transform(code, id) {
      // Si es la librería problemática, arreglar el código
      if (id.includes('@npm_leadtech/cv-lib-auth/src/AuthManager.js')) {
        console.log('🔧 [SHELL] Arreglando sintaxis en AuthManager.js...');
        // Reemplazar const por let para permitir reasignación
        const fixedCode = code
          .replace(/const regexResult = null;/g, 'let regexResult = null;')
          .replace(/const errorMessage = handleError\(error\);/g, 'let errorMessage = handleError(error);');
        return {
          code: fixedCode,
          map: null
        };
      }
      return null;
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    fixAuthManagerPlugin(), // Agregar el plugin personalizado al inicio
    react(),
    federation({
      name: 'shell',
      remotes: {
        user: 'http://localhost:5004/assets/remoteEntry.js'
      },
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: {
          singleton: true
        },
        'react-dom': {
          singleton: true
        },
        '@mui/material': {
          singleton: true
        }
      }
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      plugins: [
        {
          name: 'fix-auth-manager-syntax',
          transform(code, id) {
            // Si es la librería problemática, arreglar el código problemático
            if (id.includes('@npm_leadtech/cv-lib-auth/src/AuthManager.js')) {
              console.log('🔧 [SHELL BUILD] Arreglando sintaxis en AuthManager.js...');
              // Reemplazar const por let para permitir reasignación
              const fixedCode = code
                .replace(/const regexResult = null;/g, 'let regexResult = null;')
                .replace(/const errorMessage = handleError\(error\);/g, 'let errorMessage = handleError(error);');
              return {
                code: fixedCode,
                map: null
              };
            }
            return null;
          }
        }
      ]
    }
  },
  optimizeDeps: {
    exclude: [
      // Excluir la librería problemática para evitar errores de sintaxis
      '@npm_leadtech/cv-lib-auth'
    ]
  },
  define: {
    global: "globalThis"
  },
  resolve: {
    alias: {
      '@packages/ui': resolve(__dirname, '../../packages/ui/src'),
      '@apps/product': resolve(__dirname, '../../apps/product/src'),
      '@apps/login': resolve(__dirname, '../../apps/login/src'),
    }
  },
  server: {
    port: 5000,
    strictPort: true,
    host: true,
    cors: {
      origin: ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002', 'http://localhost:5003', 'http://localhost:5004'],
      credentials: true
    }
  }
})
