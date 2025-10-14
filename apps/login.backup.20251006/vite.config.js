import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync, readdirSync, readFileSync } from 'fs'
import BUILD_GLOBALS from '@npm_leadtech/cv-lib-app-config/src/scripts/globals'

const BUILD_DIR = resolve(__dirname, BUILD_GLOBALS.INDEX_DIR, 'dist');
const DEV_MODE = BUILD_GLOBALS.ENV === 'local';

const isProduction = process.env.NODE_ENV === 'production'

console.log('login isProduction =>', isProduction)

console.log('login BUILD_DIR =>', BUILD_DIR)

// Plugin para copiar archivos i18n
const copyI18nFiles = () => {
  return {
    name: 'copy-i18n-files',
    buildStart() {
      // Crear directorio dist/i18n si no existe
      const distI18nDir = resolve(__dirname, 'dist/i18n')
      if (!existsSync(distI18nDir)) {
        mkdirSync(distI18nDir, { recursive: true })
      }

      // Copiar archivos i18n
      const i18nDir = resolve(__dirname, 'src/app/i18n')
      if (existsSync(i18nDir)) {
        const files = readdirSync(i18nDir)
        files.forEach(file => {
          if (file.endsWith('.json')) {
            const srcPath = resolve(i18nDir, file)
            const destPath = resolve(distI18nDir, file)
            copyFileSync(srcPath, destPath)
          }
        })
      }
    },
    writeBundle(options, bundle) {
      // Copiar archivos i18n al build de producción
      const buildDir = options.dir || 'dist'
      const prodI18nDir = resolve(__dirname, buildDir, 'i18n')
      
      if (!existsSync(prodI18nDir)) {
        mkdirSync(prodI18nDir, { recursive: true })
      }

      const i18nDir = resolve(__dirname, 'src/app/i18n')
      if (existsSync(i18nDir)) {
        const files = readdirSync(i18nDir)
        files.forEach(file => {
          if (file.endsWith('.json')) {
            const srcPath = resolve(i18nDir, file)
            const destPath = resolve(prodI18nDir, file)
            copyFileSync(srcPath, destPath)
          }
        })
      }
    },
    configureServer(server) {
      // Middleware para servir archivos i18n durante el desarrollo con CORS
      server.middlewares.use('/dist/i18n', (req, res, next) => {
        // Configurar cabeceras CORS
        const origin = req.headers.origin;
        const allowedOrigins = ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002', 'http://localhost:5003'];
        
        if (allowedOrigins.includes(origin)) {
          res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        // Manejar preflight requests
        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }
        
        const filePath = resolve(__dirname, 'src/app/i18n', req.url.replace('/', ''))
        if (existsSync(filePath)) {
          res.setHeader('Content-Type', 'application/json')
          const content = readFileSync(filePath, 'utf8')
          res.end(content)
        } else {
          next()
        }
      })
    }
  }
}

// Plugin personalizado para arreglar el código problemático tanto en dev como build
const fixAuthManagerPlugin = () => {
  return {
    name: 'fix-auth-manager',
    transform(code, id) {
      // Si es la librería problemática, arreglar el código
      if (id.includes('@npm_leadtech/cv-lib-auth/src/AuthManager.js')) {
        console.log('🔧 [DEV] Arreglando sintaxis en AuthManager.js...');
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
    copyI18nFiles(),
    react({
      include: /\.(js|jsx|ts|tsx)$/,
      jsxRuntime: 'classic',
      babel: {
        plugins: [
          ['@emotion', {
            sourceMap: true,
            autoLabel: 'dev-only',
            labelFormat: '[local]',
            cssPropOptimization: true
          }]
        ]
      }
    }),
    federation({
      name: 'login',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/app/main.jsx'
      },
      shared: {
        'react': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^18.3.1',
          eager: false
        },
        'react-dom': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^18.3.1',
          eager: false
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // Usar nuestro polyfill actualizado
      'crypto': resolve(__dirname, 'src/polyfills/crypto-polyfill-v5.js'),
      'stream': 'stream-browserify',
      'buffer': 'buffer',
      // Alias adicionales para prevenir conflictos
      'crypto-browserify': resolve(__dirname, 'src/polyfills/crypto-polyfill-v5.js'),
      'crypto-browserify/rng': resolve(__dirname, 'src/polyfills/crypto-polyfill-v5.js')
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    },
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.browser': true,
    // Específico para crypto-browserify
    'process.version': JSON.stringify('v16.0.0'),
    'process.versions': JSON.stringify({ node: '16.0.0' }),
    // Definir require como undefined y manejarlo en runtime
    'require': 'undefined'
  },
  optimizeDeps: {
    exclude: [
      // Excluir la librería problemática para evitar errores de sintaxis
      '@npm_leadtech/cv-lib-auth'
    ],
    include: [
      'buffer',
      'stream-browserify',
      'crypto-browserify',
      'amazon-cognito-identity-js',
      'crypto-js',
      'sha1',
      'counterpart',
      'revalidator',
      'classnames',
      'html-react-parser',
      'core-js',
      'url-polyfill',
      'whatwg-fetch',
      '@npm_leadtech/cv-lib-app-analytics',
      '@npm_leadtech/cv-lib-app-components',
      '@npm_leadtech/cv-lib-app-config',
      '@npm_leadtech/cv-lib-app-jsnlog',
      // '@npm_leadtech/cv-lib-auth', // Excluida de optimizeDeps porque se arregla con plugin
      '@npm_leadtech/cv-lib-cookie-channel-context',
      '@npm_leadtech/cv-lib-social',
      '@npm_leadtech/cv-lib-visitor',
      '@npm_leadtech/cv-storage-js',
      '@npm_leadtech/jsr-lib-http'
    ]
  },
  esbuild: {
    jsx: 'transform',
    include: /\.(js|jsx|ts|tsx)$/,
    // Configuración más permisiva para manejar código problemático
    legalComments: 'none',
    logOverride: {
      // Reducir la severidad de ciertos errores a warnings
      'unsupported-dynamic-import': 'warning',
      'direct-eval': 'warning'
    },
    // Permitir ciertos patrones de sintaxis
    keepNames: true,
    treeShaking: false
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: { 
        main: resolve(__dirname, 'index.html')
      },
      output: {
        format: "esm",
        path: BUILD_DIR,
      },
      plugins: [
        {
          name: 'fix-auth-manager-syntax',
          transform(code, id) {
            // Si es la librería problemática, arreglar el código problemático
            if (id.includes('@npm_leadtech/cv-lib-auth/src/AuthManager.js')) {
              console.log('🔧 Arreglando sintaxis en AuthManager.js...');
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
  server: {
    port: 5003,
    strictPort: true,
    host: true,
    cors: {
      origin: ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002', 'http://localhost:5003'],
      credentials: true
    },
    watch: {
      ignored: ['**/node_modules/**'],
      usePolling: true
    }
  }
})
