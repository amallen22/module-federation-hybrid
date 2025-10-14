// Reemplazo para crypto-browserify/rng.js que está causando el error

console.log('🔧 Polyfill para crypto-browserify/rng.js cargado');

// Este polyfill reemplaza completamente crypto-browserify/rng.js
// El problema original es que intenta acceder a algo.crypto donde algo es undefined

// Función para generar bytes aleatorios
function randomBytes(size, callback) {
  console.log('🔧 randomBytes polyfill called with size:', size);
  
  try {
    const bytes = new Uint8Array(size);
    
    // Usar window.crypto si está disponible
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(bytes);
    } else {
      // Fallback manual
      for (let i = 0; i < size; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
    }
    
    // Si hay callback, llamarlo de forma asíncrona
    if (callback) {
      setTimeout(() => callback(null, bytes), 0);
      return;
    }
    
    return bytes;
  } catch (error) {
    console.error('🔧 Error en randomBytes polyfill:', error);
    if (callback) {
      setTimeout(() => callback(error), 0);
      return;
    }
    throw error;
  }
}

// Función síncrona para generar bytes aleatorios
function randomBytesSync(size) {
  console.log('🔧 randomBytesSync polyfill called with size:', size);
  return randomBytes(size);
}

// Exportar las funciones de la misma manera que lo haría crypto-browserify/rng.js
export { randomBytes, randomBytesSync };
export default randomBytes;

console.log('✅ crypto-browserify/rng.js polyfill configurado exitosamente');
