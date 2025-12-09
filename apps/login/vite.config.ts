import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

// Plugin personalizado para arreglar el código problemático tanto en dev como build
const fixAuthManagerPlugin = () => {
  return {
    name: 'fix-auth-manager',
    transform(code: string, id: string) {
      // Si es la librería problemática, arreglar el código
      if (id.includes('@npm_leadtech/cv-lib-auth/src/AuthManager.js')) {
        console.log('🔧 [LOGIN] Arreglando sintaxis en AuthManager.js...');
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
  };
};

// Plugin para arreglar el problema de `this` en librerías legacy (amazon-cognito-identity-js)
// En módulos ES estrictos, `this` en el nivel superior es undefined, no el objeto global
const fixGlobalThisPlugin = () => {
  return {
    name: 'fix-global-this',
    transform(code: string, id: string) {
      // Arreglar en amazon-cognito-identity-js y sus dependencias
      if (id.includes('amazon-cognito-identity-js') || id.includes('node_modules/buffer')) {
        // Reemplazar `var _global = this;` por `var _global = globalThis;`
        if (code.includes('var _global = this;') || code.includes('var _global=this')) {
          console.log('🔧 [LOGIN] Arreglando _global = this en:', id.split('node_modules/')[1] || id);
          const fixedCode = code
            .replace(/var _global\s*=\s*this\s*;/g, 'var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};')
            .replace(/var _global=this/g, 'var _global=typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:typeof global!=="undefined"?global:{}');
          return {
            code: fixedCode,
            map: null
          };
        }
      }
      return null;
    }
  };
};

// Plugin personalizado para añadir polyfills y arreglar require()
const bufferPolyfillPlugin = () => {
  return {
    name: 'buffer-polyfill',
    resolveId(source: string) {
      // Interceptar imports de 'buffer' en módulos específicos
      if (source === 'buffer' && this.getModuleInfo) {
        return { id: '\0buffer-polyfill', external: false };
      }
      return null;
    },
    load(id: string) {
      // Proporcionar el polyfill de Buffer
      if (id === '\0buffer-polyfill') {
        return `
          import { Buffer } from 'buffer';
          export { Buffer };
          export default { Buffer };
        `;
      }
      return null;
    },
    transform(code: string, id: string) {
      // Solo transformar módulos que realmente necesitan buffer (amazon-cognito-identity-js y dependencias)
      // NO tocar módulos de React u otros que ya están optimizados
      if (
        (id.includes('amazon-cognito-identity-js') || 
         id.includes('node_modules/buffer') ||
         id.includes('@npm_leadtech/cv-lib-auth')) &&
        !id.includes('react') &&
        !id.includes('node_modules/.vite/deps')
      ) {
        let modifiedCode = code;
        
        // Reemplazar require('buffer') por import
        if (code.includes("require('buffer')") || code.includes('require("buffer")')) {
          modifiedCode = modifiedCode
            .replace(/const\s+Buffer\s*=\s*require\(['"]buffer['"]\)/g, "import { Buffer } from 'buffer'")
            .replace(/var\s+Buffer\s*=\s*require\(['"]buffer['"]\)/g, "import { Buffer } from 'buffer'")
            .replace(/let\s+Buffer\s*=\s*require\(['"]buffer['"]\)/g, "import { Buffer } from 'buffer'");
          
          // Si no hay import de Buffer al inicio, añadirlo
          if (!modifiedCode.includes("import") && !modifiedCode.includes("from 'buffer'")) {
            modifiedCode = `import { Buffer } from 'buffer';\n${modifiedCode}`;
          }
        }
        
        if (modifiedCode !== code) {
          return {
            code: modifiedCode,
            map: null
          };
        }
      }
      return null;
    }
  };
};

// Plugin para copiar archivos i18n
const copyI18nPlugin = () => {
  return {
    name: 'copy-i18n',
    configureServer(server) {
      // Middleware para servir archivos i18n en desarrollo desde src/app/i18n
      server.middlewares.use('/dist/i18n', (req, res, next) => {
        // Configurar cabeceras CORS
        const origin = req.headers.origin;
        const allowedOrigins = ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002', 'http://localhost:5003'];
        
        if (origin && allowedOrigins.includes(origin)) {
          res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
        // Permitir todos los headers comunes que las librerías HTTP pueden enviar
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, X-Requested-With, Pragma, Accept, Origin, Expires, If-Modified-Since, Last-Modified, ETag');
        
        // Manejar preflight requests
        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }
        
        // En desarrollo, servir desde src/app/i18n
        const fileName = req.url.split('/').pop(); // ej: "en-US.json"
        if (fileName && fileName.endsWith('.json')) {
          const i18nPath = resolve(__dirname, 'src/app/i18n', fileName);
          if (existsSync(i18nPath)) {
            res.setHeader('Content-Type', 'application/json');
            res.end(readFileSync(i18nPath, 'utf-8'));
            return;
          }
        }
        
        next();
      });
    },
    writeBundle() {
      // Copiar archivos i18n en build
      const srcDir = resolve(__dirname, 'src/app/i18n');
      const destDir = resolve(__dirname, 'dist/i18n');
      
      if (!existsSync(srcDir)) {
        console.warn('⚠️  Directorio i18n no encontrado:', srcDir);
        return;
      }
      
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
      }
      
      const copyRecursive = (src: string, dest: string) => {
        const entries = readdirSync(src);
        
        for (const entry of entries) {
          const srcPath = join(src, entry);
          const destPath = join(dest, entry);
          
          if (entry === 'months') {
            // Ignorar carpeta months según webpack.config.js
            continue;
          }
          
          const stat = statSync(srcPath);
          
          if (stat.isDirectory()) {
            if (!existsSync(destPath)) {
              mkdirSync(destPath, { recursive: true });
            }
            copyRecursive(srcPath, destPath);
          } else {
            copyFileSync(srcPath, destPath);
          }
        }
      };
      
      try {
        copyRecursive(srcDir, destDir);
        console.log('✅ Archivos i18n copiados correctamente');
      } catch (error) {
        console.error('❌ Error copiando archivos i18n:', error);
      }
    }
  };
};

export default defineConfig({
  plugins: [
    // NO usar nodePolyfills aquí - causa conflictos con módulos optimizados
    // En su lugar, usamos un plugin personalizado más específico
    bufferPolyfillPlugin(),
    fixAuthManagerPlugin(),
    fixGlobalThisPlugin(), // Arreglar `var _global = this` en amazon-cognito-identity-js
    react({
      include: /\.(js|jsx|ts|tsx)$/,
      jsxRuntime: 'automatic',
      jsxImportSource: 'react'
    }),
    federation({
      name: 'login',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/app/App.tsx',
        './Controller': './src/app/Controller.tsx'
      },
      shared: {
        'react': {
          requiredVersion: '^18.3.1',
          import: false,
          shareScope: 'default'
        },
        'react-dom': {
          requiredVersion: '^18.3.1',
          import: false,
          shareScope: 'default'
        }
      }
    }),
    copyI18nPlugin()
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
      strictRequires: false,
      requireReturnsDefault: 'auto'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        format: 'esm',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      plugins: [
        {
          name: 'fix-auth-manager-syntax',
          transform(code: string, id: string) {
            // Si es la librería problemática, arreglar el código problemático
            if (id.includes('@npm_leadtech/cv-lib-auth/src/AuthManager.js')) {
              console.log('🔧 [LOGIN BUILD] Arreglando sintaxis en AuthManager.js...');
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
        },
        {
          name: 'fix-global-this-build',
          transform(code: string, id: string) {
            // Arreglar `var _global = this` en amazon-cognito-identity-js y dependencias
            if (code.includes('var _global = this;') || code.includes('var _global=this')) {
              console.log('🔧 [LOGIN BUILD] Arreglando _global = this en:', id.split('node_modules/').pop() || id);
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
      ]
    }
  },
  define: {
    global: 'globalThis',
    'process.env': '{}',
    'process.platform': '"browser"',
    'process.version': '"v20.10.0"'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@packages/ui': resolve(__dirname, '../../packages/ui/src'),
      '@packages/query': resolve(__dirname, '../../packages/query/src'),
      // Alias para buffer que apunta al polyfill
      'buffer': 'buffer'
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.mts', '.json']
  },
  esbuild: {
    loader: 'tsx',
    include: /\.(jsx?|tsx?)$/,
    exclude: [],
    jsx: 'automatic'
  },
  optimizeDeps: {
    exclude: [
      '@npm_leadtech/cv-lib-auth',
      'amazon-cognito-identity-js' // Excluir para que pase por el transform hook
    ],
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@emotion/react',
      '@emotion/styled'
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    },
    force: true
  },
  server: {
    port: 5003,
    strictPort: true,
    host: true,
    cors: {
      origin: ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002', 'http://localhost:5003'],
      credentials: true
    }
  }
});

