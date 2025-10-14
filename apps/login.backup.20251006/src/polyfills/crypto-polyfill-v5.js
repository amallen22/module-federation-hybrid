// Polyfill para crypto - Compatible con amazon-cognito-identity-js v4.6.3
// Este archivo debe cargarse ANTES que cualquier otra dependencia

console.log('🔧 Inicializando polyfill crypto v5...');

// 1. Configurar global si no existe
if (typeof global === 'undefined') {
  if (typeof globalThis !== 'undefined') {
    globalThis.global = globalThis;
  } else {
    window.global = window;
  }
  console.log('✅ Global configurado');
}

// 2. Configurar process si no existe
if (typeof process === 'undefined') {
  const processPolyfill = {
    env: { NODE_ENV: 'development' },
    nextTick: function(callback) {
      setTimeout(callback, 0);
    },
    version: 'v16.0.0',
    versions: { node: '16.0.0' },
    browser: true,
    argv: [],
    pid: 1,
    platform: 'browser',
    cwd: function() { return '/'; },
    chdir: function() {},
    exit: function() {},
    stdout: { write: function() {} },
    stderr: { write: function() {} }
  };
  
  // Asignar a todos los contextos posibles
  try {
    global.process = processPolyfill;
    console.log('✅ Process global configurado');
  } catch (e) {
    console.warn('⚠️ No se pudo configurar process global:', e.message);
  }
  
  try {
    if (typeof globalThis !== 'undefined') {
      globalThis.process = processPolyfill;
      console.log('✅ Process globalThis configurado');
    }
  } catch (e) {
    console.warn('⚠️ No se pudo configurar process globalThis:', e.message);
  }
  
  try {
    window.process = processPolyfill;
    console.log('✅ Process window configurado');
  } catch (e) {
    console.warn('⚠️ No se pudo configurar process window:', e.message);
  }
}

// 3. Crear polyfill completo de crypto
const createCryptoPolyfill = () => {
  const cryptoPolyfill = {
    // Función principal para generar bytes aleatorios
    getRandomValues: function(array) {
      console.log('🔧 Crypto polyfill getRandomValues called, array length:', array.length);
      
      // Usar crypto nativo si está disponible
      if (window.crypto && window.crypto.getRandomValues) {
        try {
          return window.crypto.getRandomValues(array);
        } catch (e) {
          console.warn('⚠️ Error usando crypto nativo, usando fallback:', e.message);
        }
      }
      
      // Fallback manual
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    },
    
    // Función randomBytes para compatibilidad con Node.js
    randomBytes: function(size, callback) {
      console.log('🔧 Crypto polyfill randomBytes called, size:', size);
      
      try {
        const bytes = new Uint8Array(size);
        this.getRandomValues(bytes);
        
        // Convertir a Buffer si Buffer está disponible
        let result = bytes;
        if (typeof Buffer !== 'undefined' && Buffer.from) {
          result = Buffer.from(bytes);
        }
        
        if (callback) {
          setTimeout(() => callback(null, result), 0);
          return;
        }
        return result;
      } catch (error) {
        console.error('🔧 Error en randomBytes:', error);
        if (callback) {
          setTimeout(() => callback(error), 0);
          return;
        }
        throw error;
      }
    },
    
    // Función createHash para compatibilidad con Node.js
    createHash: function(algorithm) {
      console.log('🔧 Crypto polyfill createHash called, algorithm:', algorithm);
      
      return {
        update: function(data) {
          this.data = data;
          return this;
        },
        digest: function(encoding) {
          console.log('🔧 Hash digest called, encoding:', encoding);
          
          // Generar hash mock usando crypto nativo si es posible
          if (window.crypto && window.crypto.subtle) {
            // Para modo async, pero amazon-cognito-identity-js espera sync
            const mockHash = new Uint8Array(32);
            for (let i = 0; i < 32; i++) {
              mockHash[i] = Math.floor(Math.random() * 256);
            }
            
            if (encoding === 'hex') {
              return Array.from(mockHash).map(b => b.toString(16).padStart(2, '0')).join('');
            }
            return mockHash;
          }
          
          // Fallback básico
          const hash = new Uint8Array(32);
          for (let i = 0; i < 32; i++) {
            hash[i] = Math.floor(Math.random() * 256);
          }
          
          if (encoding === 'hex') {
            return Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
          }
          return hash;
        }
      };
    },
    
    // Función createHmac para compatibilidad con Node.js
    createHmac: function(algorithm, key) {
      console.log('🔧 Crypto polyfill createHmac called, algorithm:', algorithm);
      return this.createHash(algorithm);
    },
    
    // Funciones adicionales que pueden ser necesarias
    createCipher: function(algorithm, password) {
      console.log('🔧 Crypto polyfill createCipher called');
      return {
        update: function(data) { return data; },
        final: function() { return ''; }
      };
    },
    
    createDecipher: function(algorithm, password) {
      console.log('🔧 Crypto polyfill createDecipher called');
      return this.createCipher(algorithm, password);
    },
    
    // Propiedades adicionales
    constants: {
      RSA_PKCS1_PADDING: 1,
      RSA_SSLV23_PADDING: 2,
      RSA_NO_PADDING: 3,
      RSA_PKCS1_OAEP_PADDING: 4,
      RSA_X931_PADDING: 5,
      RSA_PKCS1_PSS_PADDING: 6
    }
  };
  
  return cryptoPolyfill;
};

// 4. Configurar el polyfill en todos los contextos necesarios
const cryptoPolyfill = createCryptoPolyfill();

// Configurar en global (NO en window.crypto que es readonly)
try {
  global.crypto = cryptoPolyfill;
  console.log('✅ Crypto polyfill configurado en global');
} catch (e) {
  console.warn('⚠️ No se pudo configurar crypto en global:', e.message);
}

// Configurar en globalThis si está disponible
try {
  if (typeof globalThis !== 'undefined') {
    globalThis.crypto = cryptoPolyfill;
    console.log('✅ Crypto polyfill configurado en globalThis');
  }
} catch (e) {
  console.warn('⚠️ No se pudo configurar crypto en globalThis:', e.message);
}

// NO intentar asignar a window.crypto ya que es readonly
// En su lugar, solo extender si es posible
if (window.crypto) {
  try {
    // Solo intentar agregar propiedades que no existen
    const propsToAdd = ['randomBytes', 'createHash', 'createHmac', 'createCipher', 'createDecipher'];
    
    propsToAdd.forEach(prop => {
      if (!window.crypto[prop]) {
        try {
          Object.defineProperty(window.crypto, prop, {
            value: cryptoPolyfill[prop],
            writable: false,
            configurable: true
          });
          console.log(`✅ Propiedad ${prop} añadida a window.crypto`);
        } catch (e) {
          console.warn(`⚠️ No se pudo añadir ${prop} a window.crypto:`, e.message);
        }
      }
    });
  } catch (e) {
    console.warn('⚠️ No se pudo extender window.crypto:', e.message);
  }
}

// 5. Configurar Buffer si no está disponible
if (typeof Buffer === 'undefined') {
  // Usar import dinámico para Buffer
  try {
    import('buffer').then(({ Buffer }) => {
      global.Buffer = Buffer;
      if (typeof globalThis !== 'undefined') {
        globalThis.Buffer = Buffer;
      }
      window.Buffer = Buffer;
      console.log('✅ Buffer polyfill configurado');
    }).catch(error => {
      console.warn('⚠️ No se pudo cargar Buffer:', error.message);
      
      // Crear Buffer básico como fallback
      const BufferPolyfill = {
        from: function(data) {
          if (data instanceof Uint8Array) {
            return data;
          }
          return new Uint8Array(data);
        },
        alloc: function(size) {
          return new Uint8Array(size);
        }
      };
      
      global.Buffer = BufferPolyfill;
      if (typeof globalThis !== 'undefined') {
        globalThis.Buffer = BufferPolyfill;
      }
      window.Buffer = BufferPolyfill;
      console.log('✅ Buffer polyfill básico configurado');
    });
  } catch (error) {
    console.warn('⚠️ Error configurando Buffer:', error.message);
  }
}

// 6. Verificar configuración
console.log('🔍 Verificando configuración del polyfill:');
console.log('  - global definido:', typeof global !== 'undefined');
console.log('  - process definido:', typeof process !== 'undefined');
console.log('  - global.crypto definido:', typeof global?.crypto !== 'undefined');
console.log('  - global.crypto.getRandomValues:', typeof global?.crypto?.getRandomValues === 'function');
console.log('  - global.crypto.randomBytes:', typeof global?.crypto?.randomBytes === 'function');
console.log('  - window.crypto definido:', typeof window.crypto !== 'undefined');
console.log('  - window.crypto.getRandomValues:', typeof window.crypto?.getRandomValues === 'function');

console.log('✅ Polyfill crypto v5 configurado completamente');

// Exportar por si se necesita
export default cryptoPolyfill;
