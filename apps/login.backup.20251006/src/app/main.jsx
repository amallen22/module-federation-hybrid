// Importar polyfills ANTES que cualquier otra cosa
// Orden importante: require primero, luego global/process, luego logger, luego crypto
import '../polyfills/require-polyfill.js';
import '../polyfills/process-polyfill.js';
import '../polyfills/logger-init.js';
import '../polyfills/crypto-polyfill-v5.js';

// Importar y aplicar interceptor agresivo para visitor API
import { applyVisitorMockInterceptors } from './services/VisitorMockInterceptor.js';
applyVisitorMockInterceptors();

// Importar interceptor de API para debug DESPUÉS
// import './debug/api-interceptor.js';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Renderizar la aplicación
const appElement = document.getElementById('app');

if (appElement) {
const root = createRoot(appElement);
  root.render(<App />);
} else {
  console.error('Error: No se encontró el elemento #app');
}
