import BUILD_GLOBALS from '@npm_leadtech/cv-lib-app-config/src/scripts/globals';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const BUILD_DIR = resolve(__dirname, 'dist');
const isProduction = process.env.NODE_ENV === 'production';

console.log('user isProduction =>', isProduction);
console.log('user BUILD_DIR =>', BUILD_DIR);



export default defineConfig({
    base: isProduction ? './' : '/',
    plugins: [
        react({
            include: /\.(js|jsx|ts|tsx)$/,
            jsxRuntime: 'automatic'
        }),
        federation({
            name: 'user',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/app/main-mui-simple.tsx'
            },
            shared: {
                'react': {
                    singleton: true,
                    requiredVersion: '^18.3.1'
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^18.3.1'
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            'app-scss-vars': resolve(__dirname, 'src/app/styles/app_vars.scss'),
            '@packages/ui': resolve(__dirname, '../../packages/ui/src'),
            '@npm_leadtech/cv-storage-js': resolve(__dirname, 'src/wrappers/cv-storage-wrapper.js'),
            '@npm_leadtech/cv-lib-visitor': resolve(__dirname, 'src/wrappers/cv-lib-visitor-wrapper.js')
        }
    },
    define: {
        global: 'globalThis',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    },
    optimizeDeps: {
        include: [
            '@mui/material',
            '@mui/system',
            '@emotion/react',
            '@emotion/styled'
        ],
        exclude: ['@npm_leadtech/cv-lib-auth']
    },
    esbuild: {
        jsx: 'automatic',
        target: 'esnext'
    },
    build: {
        target: 'esnext',
        minify: false,
        commonjsOptions: {
            transformMixedEsModules: true,
            requireReturnsDefault: 'auto'
        },
        rollupOptions: {
            output: {
                dir: BUILD_DIR,
                format: 'es'
            }
        }
    },
    server: {
        port: 5004,
        strictPort: true,
        host: true,
        cors: {
            origin: ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002', 'http://localhost:5003', 'http://localhost:5004'],
            credentials: true
        }
    }
});