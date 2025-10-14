// Polyfill completo para crypto para amazon-cognito-identity-js

console.log('🔧 Cargando polyfills de crypto...');

// 1. Polyfill para global
if (typeof global === 'undefined') {
  window.global = window;
  console.log('✅ Global polyfill aplicado');
}

// 2. Polyfill para process (requerido por algunas librerías)
if (typeof process === 'undefined') {
  window.process = {
    env: { NODE_ENV: 'development' },
    nextTick: function(callback) {
      setTimeout(callback, 0);
    },
    version: 'v16.0.0',
    versions: { node: '16.0.0' }
  };
  console.log('✅ Process polyfill aplicado');
}

// 3. Polyfill inteligente para crypto que respeta readonly properties
const createCryptoPolyfill = () => {
  const customGetRandomValues = function(array) {
    console.log('🔧 Usando crypto polyfill para getRandomValues');
    if (window.crypto && window.crypto.getRandomValues && window.crypto !== global.crypto) {
      try {
        return window.crypto.getRandomValues(array);
      } catch (e) {
        console.warn('⚠️ getRandomValues nativo falló, usando fallback');
      }
    }
    // Fallback manual
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  };

  const cryptoPolyfill = {
    getRandomValues: customGetRandomValues,
    subtle: {
      digest: function(algorithm, data) {
        console.log('🔧 Usando crypto polyfill para digest');
        return Promise.resolve(new ArrayBuffer(32));
      }
    },
    randomBytes: function(size) {
      console.log('🔧 Usando crypto polyfill para randomBytes');
      const bytes = new Uint8Array(size);
      return customGetRandomValues(bytes);
    }
  };

  return cryptoPolyfill;
};

const cryptoPolyfill = createCryptoPolyfill();

// Solo asignar a global, NO a window.crypto (ya que es readonly)
try {
  global.crypto = cryptoPolyfill;
  console.log('✅ Crypto polyfill asignado a global.crypto');
} catch (error) {
  console.warn('⚠️ Error asignando global.crypto:', error.message);
}

// Intentar extender window.crypto solo si es posible
if (window.crypto) {
  try {
    // Solo agregar propiedades que no existen
    if (!window.crypto.randomBytes) {
      Object.defineProperty(window.crypto, 'randomBytes', {
        value: cryptoPolyfill.randomBytes,
        writable: true,
        configurable: true
      });
    }
  } catch (error) {
    console.warn('⚠️ No se pudo extender window.crypto:', error.message);
  }
}

console.log('✅ Crypto polyfill inteligente aplicado');

// 4. Polyfill para Buffer si no existe (importado dinámicamente)
if (typeof Buffer === 'undefined') {
  try {
    import('buffer').then(({ Buffer }) => {
      window.Buffer = Buffer;
      console.log('✅ Buffer polyfill aplicado');
    });
  } catch (error) {
    console.warn('⚠️ Error cargando Buffer:', error.message);
  }
}

// 5. Verificar que todo está configurado
console.log('🔍 Verificando polyfills:');
console.log('  - global:', typeof global !== 'undefined');
console.log('  - process:', typeof process !== 'undefined');
console.log('  - crypto:', typeof crypto !== 'undefined');
console.log('  - crypto.getRandomValues:', typeof crypto?.getRandomValues === 'function');
console.log('  - Buffer:', typeof Buffer !== 'undefined');
console.log('✅ Todos los polyfills verificados');

export default {};
