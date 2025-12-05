// Polyfills DEBEN ser el primer import
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';

import './polyfills';

const rootElement = document.getElementById('app');

if (!rootElement) {
    throw new Error('Root element #app not found');
}

const root = createRoot(rootElement);

root.render(<App />);

