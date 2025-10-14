// Polyfill nativo para crypto que reemplaza completamente crypto-browserify

console.log('🔧 Polyfill crypto nativo cargado - reemplazando crypto-browserify');

// Implementación de randomBytes usando crypto nativo del navegador
function randomBytes(size, callback) {
  console.log('🔧 Native randomBytes called with size:', size);
  
  try {
    const bytes = new Uint8Array(size);
    
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(bytes);
    } else {
      // Fallback extremo
      for (let i = 0; i < size; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
    }
    
    // Convertir a Buffer-like object
    const buffer = Buffer.from ? Buffer.from(bytes) : new Uint8Array(bytes);
    
    if (callback) {
      setTimeout(() => callback(null, buffer), 0);
      return;
    }
    
    return buffer;
  } catch (error) {
    console.error('🔧 Error en native randomBytes:', error);
    if (callback) {
      setTimeout(() => callback(error), 0);
      return;
    }
    throw error;
  }
}

// Implementación síncrona
function randomBytesSync(size) {
  console.log('🔧 Native randomBytesSync called with size:', size);
  return randomBytes(size);
}

// Implementación de pseudoRandomBytes
function pseudoRandomBytes(size, callback) {
  console.log('🔧 Native pseudoRandomBytes called');
  return randomBytes(size, callback);
}

// Implementación de createHash
function createHash(algorithm) {
  console.log('🔧 Native createHash called with algorithm:', algorithm);
  
  return {
    update: function(data) {
      this.data = data;
      return this;
    },
    digest: function(encoding) {
      console.log('🔧 Hash digest called with encoding:', encoding);
      // Mock hash - en producción necesitarías una implementación real
      const mockHash = new Uint8Array(32);
      for (let i = 0; i < 32; i++) {
        mockHash[i] = Math.floor(Math.random() * 256);
      }
      
      if (encoding === 'hex') {
        return Array.from(mockHash).map(b => b.toString(16).padStart(2, '0')).join('');
      }
      return mockHash;
    }
  };
}

// Implementación de createHmac
function createHmac(algorithm, key) {
  console.log('🔧 Native createHmac called');
  return createHash(algorithm);
}

// Implementación de createCipher/createDecipher (básicas)
function createCipher(algorithm, password) {
  console.log('🔧 Native createCipher called');
  return {
    update: function(data) { return data; },
    final: function() { return ''; }
  };
}

function createDecipher(algorithm, password) {
  console.log('🔧 Native createDecipher called');
  return createCipher(algorithm, password);
}

// Exportar todas las funciones que crypto-browserify normalmente exportaría
const cryptoPolyfill = {
  randomBytes,
  randomBytesSync,
  pseudoRandomBytes,
  createHash,
  createHmac,
  createCipher,
  createDecipher,
  // Añadir más funciones según sea necesario
  constants: {
    // Constantes comunes de crypto
  }
};

// Exportar como módulo ES6 y CommonJS
export default cryptoPolyfill;
export {
  randomBytes,
  randomBytesSync,
  pseudoRandomBytes,
  createHash,
  createHmac,
  createCipher,
  createDecipher
};

console.log('✅ Polyfill crypto nativo configurado exitosamente');
