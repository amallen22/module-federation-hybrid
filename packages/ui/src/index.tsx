import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from './components/Button';
import { ErrorBoundary } from './components/ErrorBoundary';

// Export components for Module Federation
export * from './components/Button';
export * from './components/ErrorBoundary';
export * from './theme/theme';

// Bootstrap the app for standalone mode
const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>UI Kit</h1>
      <h2>Components</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Button</h3>
        <Button>Sample Button</Button>
      </div>
      <div>
        <h3>Error Boundary</h3>
        <ErrorBoundary>
          <p>This content is wrapped in an ErrorBoundary</p>
        </ErrorBoundary>
      </div>
    </div>
  );
};

// Mount the app if we're in standalone mode
if (document.getElementById('root')) {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<App />);
}

