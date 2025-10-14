// Polyfill específico para crypto-browserify

console.log('🔧 Interceptando crypto-browserify...');

// El problema parece estar en que crypto-browserify intenta acceder a algo.crypto
// donde "algo" es undefined. Vamos a crear intercepciones más específicas.

// Interceptar Module si existe
if (typeof module !== 'undefined') {
  console.log('🔍 Module detected, setting up crypto interception');
}

// Crear un mock más robusto para cualquier lugar donde se pueda acceder a .crypto
const createCryptoMock = () => ({
  getRandomValues: function(array) {
    console.log('🔧 Mock crypto.getRandomValues called');
    if (window.crypto && window.crypto.getRandomValues) {
      return window.crypto.getRandomValues(array);
    }
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  },
  randomBytes: function(size) {
    console.log('🔧 Mock crypto.randomBytes called');
    const bytes = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  }
});

// Asegurarnos de que global tiene crypto
if (!global.crypto) {
  global.crypto = createCryptoMock();
  console.log('✅ global.crypto polyfill aplicado');
}

// También asegurarnos de que globalThis tiene crypto
if (typeof globalThis !== 'undefined' && !globalThis.crypto) {
  globalThis.crypto = createCryptoMock();
  console.log('✅ globalThis.crypto polyfill aplicado');
}

// Interceptar require si existe (para Node.js style modules)
if (typeof require !== 'undefined') {
  console.log('🔍 Require detected, not available in browser context');
}

// Polyfill específico para el error que estamos viendo
// El error viene de crypto-browserify/rng.js que intenta acceder a algo.crypto
// Vamos a monkey patch esto de manera más directa

// Interceptar el patrón común de acceso a crypto
const originalDefineProperty = Object.defineProperty;
Object.defineProperty = function(obj, prop, descriptor) {
  if (prop === 'crypto' && descriptor && descriptor.get) {
    console.log('🔍 Intercepting crypto property definition');
    const originalGet = descriptor.get;
    descriptor.get = function() {
      try {
        const result = originalGet.call(this);
        if (result === undefined || result === null) {
          console.log('🔧 Crypto getter returned undefined, using polyfill');
          return createCryptoMock();
        }
        return result;
      } catch (error) {
        console.log('🔧 Crypto getter threw error, using polyfill:', error.message);
        return createCryptoMock();
      }
    };
  }
  return originalDefineProperty.call(this, obj, prop, descriptor);
};

console.log('✅ crypto-browserify polyfill configurado');

export default {};
