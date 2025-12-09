// Polyfills para compatibilidad con librerías legacy (amazon-cognito-identity-js)
// Este archivo DEBE importarse antes que cualquier otro módulo

// Polyfill para crypto
if (typeof window !== 'undefined') {
    const cryptoPolyfill = window.crypto || {
        getRandomValues: function(arr: Uint8Array | Uint32Array) {
            for (let i = 0; i < arr.length; i++) {
                arr[i] = Math.floor(Math.random() * 256);
            }
            return arr;
        },
        subtle: {} as SubtleCrypto,
        randomUUID: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    } as Crypto;
    
    // Asegurar que global.crypto esté disponible (requerido por amazon-cognito-identity-js)
    try {
        if (typeof global !== 'undefined') {
            if (!global.crypto) {
                (global as any).crypto = cryptoPolyfill;
            }
        }
        if (typeof globalThis !== 'undefined') {
            if (!globalThis.crypto) {
                (globalThis as any).crypto = cryptoPolyfill;
            }
        }
    } catch (e) {
        console.warn('Could not set crypto polyfill:', e);
    }
}

// Polyfill para global
if (typeof global === 'undefined') {
    (window as any).global = globalThis;
}

// Polyfill para process (requerido por algunas librerías)
if (typeof window !== 'undefined' && typeof process === 'undefined') {
    (window as any).process = {
        env: {},
        platform: 'browser',
        version: 'v20.10.0',
        browser: true
    };
    if (typeof global !== 'undefined') {
        (global as any).process = (window as any).process;
    }
    if (typeof globalThis !== 'undefined') {
        (globalThis as any).process = (window as any).process;
    }
}

// Polyfill para require (básico, solo para casos simples)
// NOTA: Este polyfill es muy limitado. Los módulos deberían usar import en lugar de require.
if (typeof window !== 'undefined' && typeof require === 'undefined') {
    (window as any).require = function(module: string): any {
        // Intentar resolver módulos comunes
        if (module === 'buffer') {
            try {
                // Buffer debería estar disponible a través de Vite
                return { Buffer: (window as any).Buffer || (globalThis as any).Buffer };
            } catch (e) {
                console.warn('No se pudo cargar buffer:', e);
            }
        }
        // Para otros módulos, solo loguear y retornar un objeto vacío
        console.warn('require() llamado para:', module, '- Esto puede no funcionar correctamente en ESM.');
        return {};
    };
    if (typeof global !== 'undefined') {
        (global as any).require = (window as any).require;
    }
    if (typeof globalThis !== 'undefined') {
        (globalThis as any).require = (window as any).require;
    }
}

export {};

