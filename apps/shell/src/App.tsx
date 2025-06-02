import React, { Suspense } from 'react';
import './App.css';

// TypeScript declarations for remote modules
declare module 'ui/Button' {
  export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
  }
  const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module 'product/App' {
  const ProductApp: React.FC;
  export default ProductApp;
}

// Lazy load remote components
const RemoteButton = React.lazy(() => import('ui/Button'));
const RemoteProduct = React.lazy(() => import('product/App'));

function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Micro Frontend Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>UI Kit Demo</h2>
        <Suspense fallback={<div>Loading Button...</div>}>
          <RemoteButton variant="primary" onClick={() => alert('Clicked!')}>
            Shared Button from UI Kit
          </RemoteButton>
        </Suspense>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Product Module Demo</h2>
        <Suspense fallback={<div>Loading Product Module...</div>}>
          <RemoteProduct />
        </Suspense>
      </div>
    </div>
  );
}

export default App;