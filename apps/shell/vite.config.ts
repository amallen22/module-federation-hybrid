import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// const isProduction = process.env.NODE_ENV === 'production'
const isProduction = false

console.log('isProduction ==> ', isProduction)
// Reemplaza esta URL con la URL base de tu despliegue en S3/CloudFront
const productionRemoteBaseUrl = 'https://stage.resumecoach.com'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: isProduction
      ? {
          product: `${productionRemoteBaseUrl}/product/assets/remoteEntry.js`,
          ui: `${productionRemoteBaseUrl}/ui/assets/remoteEntry.js`
        }
      : {
          product: 'http://localhost:5001/assets/remoteEntry.js',
          ui: 'http://localhost:5002/assets/remoteEntry.js'
        },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5000
  }
})
