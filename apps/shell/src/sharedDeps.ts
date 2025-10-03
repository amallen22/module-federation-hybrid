/**
 * Shared Dependencies Initializer
 * 
 * Este archivo importa todas las dependencias que queremos compartir
 * con los micro frontends remotos a través de Module Federation.
 * 
 * IMPORTANTE: Este archivo debe ser importado en el entry point principal
 * ANTES de cualquier otro import.
 */

import React from 'react';
import ReactDOM from 'react-dom';

// Exportar para que estén disponibles
export {
  React,
  ReactDOM,
};

// Log para confirmar que se cargaron
console.log('✅ [SHELL] Shared dependencies initialized:', {
  react: !!React,
  reactDom: !!ReactDOM,
});
