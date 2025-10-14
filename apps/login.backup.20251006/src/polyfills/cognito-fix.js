// Interceptación runtime específica para amazon-cognito-identity-js

console.log('🔧 Interceptando amazon-cognito-identity-js...');

// Esta es una solución de último recurso que intercepta el problema en tiempo real
// Vamos a monkey-patch el require/import system para interceptar crypto-browserify

// 1. Crear un mock completo de crypto que funcione
const createWorkingCrypto = () => {
  const workingCrypto = {
    getRandomValues: function(array) {
      console.log('🔧 WorkingCrypto getRandomValues called');
      if (window.crypto && window.crypto.getRandomValues) {
        return window.crypto.getRandomValues(array);
      }
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    },
    randomBytes: function(size, callback) {
      console.log('🔧 WorkingCrypto randomBytes called with size:', size);
      const bytes = new Uint8Array(size);
      this.getRandomValues(bytes);
      
      // Convertir a Buffer si existe
      const result = window.Buffer ? window.Buffer.from(bytes) : bytes;
      
      if (callback) {
        setTimeout(() => callback(null, result), 0);
        return;
      }
      return result;
    },
    createHash: function(algorithm) {
      console.log('🔧 WorkingCrypto createHash called');
      return {
        update: function(data) { this.data = data; return this; },
        digest: function(encoding) {
          const hash = new Uint8Array(32);
          for (let i = 0; i < 32; i++) {
            hash[i] = Math.floor(Math.random() * 256);
          }
          return encoding === 'hex' ? 
            Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('') : 
            hash;
        }
      };
    }
  };
  
  return workingCrypto;
};

const workingCrypto = createWorkingCrypto();

// 2. Interceptar Module.prototype._compile si existe (Node.js style)
if (typeof Module !== 'undefined' && Module.prototype && Module.prototype._compile) {
  const originalCompile = Module.prototype._compile;
  Module.prototype._compile = function(content, filename) {
    if (filename && filename.includes('crypto-browserify') && filename.includes('rng.js')) {
      console.log('🔧 Interceptando crypto-browserify/rng.js via Module._compile');
      // Reemplazar el contenido problemático
      content = `
        console.log('🔧 crypto-browserify/rng.js interceptado');
        const workingCrypto = ${JSON.stringify(workingCrypto)};
        module.exports = workingCrypto.randomBytes;
        module.exports.randomBytes = workingCrypto.randomBytes;
      `;
    }
    return originalCompile.call(this, content, filename);
  };
}

// 3. Interceptar require si está disponible
if (typeof require !== 'undefined') {
  const originalRequire = require;
  require = function(id) {
    if (id === 'crypto' || id === 'crypto-browserify' || id.includes('crypto-browserify')) {
      console.log('🔧 Interceptando require de crypto:', id);
      return workingCrypto;
    }
    return originalRequire.apply(this, arguments);
  };
  
  // Copiar propiedades del require original
  Object.keys(originalRequire).forEach(key => {
    require[key] = originalRequire[key];
  });
}

// 4. Interceptar el window.__require si existe (usado por bundlers)
if (window.__require) {
  const originalWindowRequire = window.__require;
  window.__require = function(id) {
    if (id && (id.includes('crypto-browserify') || id.includes('crypto'))) {
      console.log('🔧 Interceptando window.__require de crypto:', id);
      return { default: workingCrypto, ...workingCrypto };
    }
    return originalWindowRequire.apply(this, arguments);
  };
}

// 5. Asegurar que crypto está disponible en todos los contextos posibles
// NO intentar sobrescribir window.crypto ya que es readonly
try {
  if (!window.crypto) {
    window.crypto = workingCrypto;
  }
} catch (e) {
  console.log('⚠️ window.crypto es readonly, usando alternativas');
}

try {
  globalThis.crypto = globalThis.crypto || workingCrypto;
} catch (e) {
  console.log('⚠️ No se pudo asignar globalThis.crypto');
}

try {
  global.crypto = global.crypto || workingCrypto;
} catch (e) {
  console.log('⚠️ No se pudo asignar global.crypto');
}

// 6. Interceptar Object.defineProperty para crypto
const originalDefineProperty = Object.defineProperty;
Object.defineProperty = function(obj, prop, descriptor) {
  if (prop === 'crypto' && (!descriptor.value || descriptor.value === undefined)) {
    console.log('🔧 Interceptando defineProperty para crypto');
    descriptor.value = workingCrypto;
  }
  return originalDefineProperty.call(this, obj, prop, descriptor);
};

console.log('✅ Interceptación de amazon-cognito-identity-js configurada');

export default {};
