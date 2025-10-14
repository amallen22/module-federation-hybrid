import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Box } from '@mui/material';

const SimpleMUIApp: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <h1>🎨 User App con MUI Simple</h1>
      <p>Probando componentes MUI básicos...</p>
      
      <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary">
          Botón Primary
        </Button>
        <Button variant="outlined" color="secondary">
          Botón Secondary
        </Button>
        <Button variant="text">
          Botón Text
        </Button>
      </Box>

      <Box sx={{ 
        marginTop: 4, 
        padding: 2, 
        backgroundColor: '#f5f5f5',
        borderRadius: 2
      }}>
        <p>✅ Si ves esto con botones MUI, los componentes básicos funcionan!</p>
      </Box>
    </Box>
  );
};

// Export para Module Federation
export default SimpleMUIApp;

// Montaje standalone si se ejecuta directamente
if (typeof window !== 'undefined' && document.getElementById('root')) {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <SimpleMUIApp />
    </React.StrictMode>
  );
}
