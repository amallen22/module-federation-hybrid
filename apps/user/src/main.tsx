import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryProvider } from '@packages/query';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
);

