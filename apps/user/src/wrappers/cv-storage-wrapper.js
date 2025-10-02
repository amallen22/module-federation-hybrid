// Wrapper completo para cv-storage-js que simula la API original
// Este wrapper proporciona compatibilidad completa con la librería original

// Simular el StorageManager de la librería original
class MockStorageManager {
    constructor() {
        this.storage = {};
    }
    
    getCookie(key) {
        const value = this.storage[key];
        if (!value) return '';
        
        // Si es una cadena JSON, intentar parsearla
        try {
            return JSON.stringify(JSON.parse(value));
        } catch (e) {
            return value;
        }
    }
    
    setCookie(key, value, hours, domain, path) {
        this.storage[key] = value;
    }
    
    setRawCookie(key, value, hours, domain, path) {
        this.storage[key] = value;
    }
    
    removeCookie(key) {
        delete this.storage[key];
    }
    
    getAllCookies() {
        return this.storage;
    }
}

// Simular el SessionStore de la librería original
class MockSessionStore {
    constructor(options = {}) {
        this.apiTimeout = options.apiTimeout || 10;
        this.apiEndpoint = options.apiEndpoint || '';
        this.name = 'cv_session_store';
        this.value = {
            language: 'en',
            access: false,
            visitor: 'mock_visitor_id_123'
        };
        this.domain = null;
        this.path = '/';
        this.life = null;
    }
    
    get(key) {
        if (typeof key === 'undefined') {
            return this.value;
        }
        return typeof this.value[key] !== 'undefined' ? this.value[key] : null;
    }
    
    put(key, value) {
        const oldValue = this.value[key];
        this.value[key] = value;
        this.persist();
        return oldValue;
    }
    
    getLanguage() {
        if (!this.get('language')) {
            const defaultLang = 'en-US';
            this.setLanguage(defaultLang);
            return defaultLang;
        }
        return this.get('language');
    }
    
    setLanguage(lang) {
        this.put('language', lang);
    }
    
    read() {
        // Simular lectura de cookie - en entorno de desarrollo no hacemos nada
    }
    
    isInitiated() {
        return typeof this.value.visitor === 'string' && this.value.visitor;
    }
    
    persist(lifeHours) {
        // Simular persistencia de cookie - en entorno de desarrollo no hacemos nada
        if (typeof lifeHours !== 'undefined') {
            this.life = lifeHours;
        }
    }
    
    putRaw(value) {
        // Simular setRawCookie - en entorno de desarrollo guardamos directamente
        try {
            this.value = JSON.parse(value);
        } catch (e) {
            console.warn('Error parsing raw cookie value:', e);
        }
    }
    
    destroy() {
        // Simular eliminación de cookie
        this.value = {};
    }
}

// Función factory para crear SessionStore
function SessionStoreCookieFactory(options, domain) {
    return new MockSessionStore(options, domain);
}

// Hacer que la función también funcione como constructor
SessionStoreCookieFactory.prototype = MockSessionStore.prototype;

// Exportar las funciones que espera la aplicación
export const StorageManager = () => new MockStorageManager();

// sessionStoreCookie debe funcionar tanto como función como constructor
export const sessionStoreCookie = SessionStoreCookieFactory;

// Export default como objeto con todas las funciones (compatible con require)
export default {
    StorageManager,
    sessionStoreCookie: SessionStoreCookieFactory
};
