import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "product",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
        "./ProductList": "./src/components/ProductList.tsx"
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
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', '@packages/ui'],
      input: {
        main: resolve(__dirname, "index.html")
      },
      output: {
        format: "esm",
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@packages/ui': 'ui'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@packages/ui': resolve(__dirname, '../../packages/ui/src'),
    }
  },
  server: {
    port: 5001,
    cors: {
      origin: ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002', 'http://localhost:5003'],
      credentials: true
    }
  }
})
