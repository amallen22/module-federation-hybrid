import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "ui",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button",
        "./ErrorBoundary": "./src/components/ErrorBoundary",
        "./theme": "./src/theme/theme.ts"
      },
      shared: {
        react: {
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
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  },
  server: {
    port: 5002,
    cors: {
      origin: ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002', 'http://localhost:5003'],
      credentials: true
    }
  }
})
