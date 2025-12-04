// Polyfills DEBEN ser el primer import
import './polyfills';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';

const rootElement = document.getElementById('app');

if (!rootElement) {
    throw new Error('Root element #app not found');
}

const root = createRoot(rootElement);

root.render(<App />);

