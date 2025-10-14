// Este archivo debe ser la primera cosa que se carga
console.log('🔧 Polyfills loading...');

// 1. Require polyfill - MUY IMPORTANTE que sea lo primero
function createRequirePolyfill() {
  console.log('📦 Creating require polyfill...');
  
  function require(id) {
    console.log('📦 Require called for:', id);
    
    switch (id) {
      case 'crypto':
        console.log('🔧 Returning crypto polyfill for require');
        if (typeof global?.crypto !== 'undefined') {
          return global.crypto;
        }
        if (typeof window?.crypto !== 'undefined') {
          return window.crypto;
        }
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
        
      default:
        console.warn('🔧 Unknown module requested via require:', id);
        return {};
    }
  }
  
  require.resolve = (id) => id;
  require.cache = {};
  
  return require;
}

// Configurar require INMEDIATAMENTE
const requirePolyfill = createRequirePolyfill();

// Asignar a todos los contextos
if (typeof globalThis !== 'undefined') {
  globalThis.require = requirePolyfill;
}
if (typeof global !== 'undefined') {
  global.require = requirePolyfill;
}
if (typeof window !== 'undefined') {
  window.require = requirePolyfill;
}

console.log('✅ Require polyfill installed globally');

// 2. Global polyfill
if (typeof global === 'undefined') {
  if (typeof globalThis !== 'undefined') {
    globalThis.global = globalThis;
    if (typeof window !== 'undefined') {
      window.global = window;
    }
  } else if (typeof window !== 'undefined') {
    window.global = window;
  }
  console.log('✅ Global polyfill installed');
}

// 3. Process polyfill
if (typeof process === 'undefined') {
  const processPolyfill = {
    env: { NODE_ENV: 'development' },
    nextTick: function(callback) { setTimeout(callback, 0); },
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
  
  if (typeof globalThis !== 'undefined') {
    globalThis.process = processPolyfill;
  }
  if (typeof global !== 'undefined') {
    global.process = processPolyfill;
  }
  if (typeof window !== 'undefined') {
    window.process = processPolyfill;
  }
  
  console.log('✅ Process polyfill installed');
}

console.log('✅ All polyfills loaded successfully');

export default {};
