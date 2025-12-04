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

export {};

