import React from 'react';
import { createRoot } from 'react-dom/client';

const MinimalUserApp: React.FC = () => {
  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333' }}>🎉 User App Minimal</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        ✅ Module Federation está funcionando correctamente!
      </p>
      <p style={{ fontSize: '14px', color: '#999', marginTop: '20px' }}>
        Este es un componente minimal sin MUI para validar la integración.
      </p>
      <div style={{ marginTop: '30px' }}>
        <button 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => alert('¡Module Federation funciona!')}
        >
          Probar interacción
        </button>
      </div>
    </div>
  );
};

// Export para Module Federation
export default MinimalUserApp;

// Montaje standalone si se ejecuta directamente
if (typeof window !== 'undefined' && document.getElementById('root')) {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <MinimalUserApp />
    </React.StrictMode>
  );
}
