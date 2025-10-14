// Polyfill para require en entorno ES modules
// Este archivo debe cargarse ANTES que cualquier otro código

console.log('🔧 Inicializando polyfill require...');

// Función require básica
function createRequirePolyfill() {
  const modules = new Map();
  
  function require(id) {
    console.log('📦 Require called for:', id);
    
    // Mapeo de módulos conocidos que pueden causar problemas
    switch (id) {
      case 'crypto':
        console.log('🔧 Returning crypto polyfill for require');
        if (typeof global?.crypto !== 'undefined') {
          return global.crypto;
        }
        if (typeof window?.crypto !== 'undefined') {
          return window.crypto;
        }
        // Fallback básico
        return {
          randomBytes: () => new Uint8Array(32),
          createHash: () => ({
            update: () => ({ digest: () => 'mock-hash' })
          })
        };
        
      case 'buffer':
        console.log('🔧 Returning Buffer polyfill for require');
        if (typeof Buffer !== 'undefined') {
          return { Buffer };
        }
        return {
          Buffer: {
            from: (data) => new Uint8Array(data),
            alloc: (size) => new Uint8Array(size)
          }
        };
        
      case 'stream':
        console.log('🔧 Returning stream polyfill for require');
        return {};
        
      case 'path':
        console.log('🔧 Returning path polyfill for require');
        return {
          join: (...parts) => parts.join('/'),
          resolve: (...parts) => '/' + parts.join('/').replace(/\/+/g, '/')
        };
        
      case 'fs':
        console.log('🔧 Returning fs polyfill for require');
        return {
          readFileSync: () => '',
          writeFileSync: () => {},
          existsSync: () => false
        };
        
      case 'util':
        console.log('🔧 Returning util polyfill for require');
        return {
          promisify: (fn) => (...args) => Promise.resolve(fn(...args))
        };
        
      default:
        console.warn('🔧 Unknown module requested via require:', id);
        
        // Intentar resolver como módulo ES
        try {
          return {};
        } catch (e) {
          console.error('🔧 Failed to resolve module:', id, e);
          return {};
        }
    }
  }
  
  // Propiedades adicionales que pueden ser necesarias
  require.resolve = (id) => {
    console.log('📦 Require.resolve called for:', id);
    return id;
  };
  
  require.cache = modules;
  
  return require;
}

// Configurar require en todos los contextos necesarios
const requirePolyfill = createRequirePolyfill();

// Global
if (typeof global !== 'undefined') {
  try {
    global.require = requirePolyfill;
    console.log('✅ Require polyfill configurado en global');
  } catch (e) {
    console.warn('⚠️ No se pudo configurar require en global:', e.message);
  }
}

// GlobalThis
if (typeof globalThis !== 'undefined') {
  try {
    globalThis.require = requirePolyfill;
    console.log('✅ Require polyfill configurado en globalThis');
  } catch (e) {
    console.warn('⚠️ No se pudo configurar require en globalThis:', e.message);
  }
}

// Window (para casos extremos)
if (typeof window !== 'undefined') {
  try {
    window.require = requirePolyfill;
    console.log('✅ Require polyfill configurado en window');
  } catch (e) {
    console.warn('⚠️ No se pudo configurar require en window:', e.message);
  }
}

console.log('✅ Polyfill require configurado completamente');

export default requirePolyfill;
