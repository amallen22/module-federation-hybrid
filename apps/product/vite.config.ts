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
      shared: ["react", "react-dom"]
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      },
      output: {
        format: "esm"
      }
    }
  },
  server: {
    port: 5001
  }
})
