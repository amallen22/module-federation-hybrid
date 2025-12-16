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

// Plugin para arreglar `var _global = this` en librerías legacy (amazon-cognito-identity-js)
const fixGlobalThisPlugin = () => {
  return {
    name: 'fix-global-this',
    transform(code, id) {
      if (code.includes('var _global = this;') || code.includes('var _global=this')) {
        console.log('🔧 [SHELL] Arreglando _global = this en:', id.split('node_modules/').pop() || id);
        const fixedCode = code
          .replace(/var _global\s*=\s*this\s*;/g, 'var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : {};')
          .replace(/var _global=this/g, 'var _global=typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:{}');
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
// En desarrollo local, desactivar Module Federation para evitar conflictos con login
const isDevelopment = process.env.NODE_ENV === 'development';

// Configuración de Module Federation (solo para producción o cuando se necesite MF real)
const federationPlugin = !isDevelopment ? federation({
  name: 'shell',
  remotes: useProductionUrls
    ? {
      product: `${productionRemoteBaseUrl}/product/assets/remoteEntry.js`,
      ui: `${productionRemoteBaseUrl}/ui/assets/remoteEntry.js`,
      login: `${productionRemoteBaseUrl}/login/assets/remoteEntry.js`
    }
    : {
      // En modo preview (producción local), con /dist/
      product: 'http://localhost:5001/dist/assets/remoteEntry.js',
      ui: 'http://localhost:5002/dist/assets/remoteEntry.js',
      login: 'http://localhost:5003/dist/assets/remoteEntry.js',
      user: 'http://localhost:5004/dist/assets/remoteEntry.js'
    },
  exposes: {
    './App': './src/App.tsx',
  },
  shared: {
    'react': {
      singleton: true,
      shareScope: 'default',
      requiredVersion: '^18.3.1',
    },
    'react-dom': {
      singleton: true,
      shareScope: 'default', 
      requiredVersion: '^18.3.1',
    },
    'react-router-dom': {
      singleton: true,
      shareScope: 'default',
      requiredVersion: '^6.30.0',
    },
    'zustand': {
      singleton: true,
      shareScope: 'default',
      requiredVersion: '^5.0.9',
    },
    '@tanstack/react-query': {
      singleton: true,
      shareScope: 'default',
      requiredVersion: '^5.0.0',
    }
  }
}) : null;

export default defineConfig({
  plugins: [
    fixAuthManagerPlugin(), // Arreglar const -> let en AuthManager.js
    fixGlobalThisPlugin(),  // Arreglar var _global = this en amazon-cognito-identity-js
    react(),
    // Solo incluir federation si está configurado (no en desarrollo)
    ...(federationPlugin ? [federationPlugin] : [])
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
      // Excluir librerías problemáticas para evitar errores de sintaxis
      '@npm_leadtech/cv-lib-auth'
    ],
    include: [
      // Incluir librerías que necesitan ser optimizadas para ESM
      'buffer',
      'amazon-cognito-identity-js'
    ],
    force: true // Forzar reconstrucción
  },
  define: {
    global: "globalThis",
    'process.env': '{}',
    'process.browser': 'true',
    'process.version': '"v18.0.0"'
  },
  resolve: {
    alias: {
      '@packages/ui': resolve(__dirname, '../../packages/ui/src'),
      '@apps/product': resolve(__dirname, '../../apps/product/src'),
      '@apps/login': resolve(__dirname, '../../apps/login/src'),
      '@apps/user': resolve(__dirname, '../../apps/user/src'),
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
