// Wrapper ESM para @npm_leadtech/cv-storage-js
// Esta librería es UMD y no tiene exportaciones ESM nativas
// Asume que la librería ya está cargada globalmente por otros microfrontends

// Función para obtener CVStorage de forma síncrona
function getCVStorage() {
    if (typeof window !== 'undefined' && window.CVStorage) {
        return window.CVStorage;
    }
  
    // Si no está disponible, intentar cargar dinámicamente
    if (typeof window !== 'undefined' && !window.CVStorage) {
    // Intentar cargar el script si no está disponible
        loadCVStorageScript();
    }
  
    return null;
}

// Cargar el script de cv-storage-js dinámicamente
function loadCVStorageScript() {
    // Evitar múltiples cargas
    if (window.__CV_STORAGE_LOADING__) {
        return;
    }
  
    window.__CV_STORAGE_LOADING__ = true;
  
    try {
    // Crear un script tag para cargar la librería UMD
        const script = document.createElement('script');
        script.src = '/node_modules/@npm_leadtech/cv-storage-js/dist/index.js';
        script.async = false; // Cargar de forma síncrona
        script.onload = () => {
            console.log('🔧 [USER] cv-storage-js cargado dinámicamente');
            window.__CV_STORAGE_LOADED__ = true;
        };
        script.onerror = () => {
            console.warn('⚠️ [USER] Error cargando cv-storage-js dinámicamente');
        };
    
        document.head.appendChild(script);
    } catch (error) {
        console.warn('⚠️ [USER] Error configurando carga dinámica de cv-storage-js:', error);
    }
}

// Intentar obtener CVStorage inmediatamente
let CVStorage = getCVStorage();

// Si no está disponible, intentar periódicamente
if (!CVStorage && typeof window !== 'undefined') {
    let attempts = 0;
    const maxAttempts = 20; // Incrementar intentos para dar tiempo a la carga
  
    const waitForCVStorage = () => {
        CVStorage = getCVStorage();
        if (!CVStorage && attempts < maxAttempts) {
            attempts++;
            setTimeout(waitForCVStorage, 100); // Incrementar tiempo entre intentos
        } else if (!CVStorage) {
            console.warn('⚠️ [USER] CVStorage no se pudo cargar después de', maxAttempts, 'intentos');
        }
    };
  
    waitForCVStorage();
}

// Exportar las funciones individuales como factory functions
export const StorageManager = function(...args) {
    const currentCVStorage = getCVStorage();
  
    // Si CVStorage está disponible, usar su StorageManager
    if (currentCVStorage?.StorageManager) {
        return currentCVStorage.StorageManager(...args);
    }
  
    // Fallback que retorna un objeto con métodos mock
    console.warn('StorageManager no disponible, usando fallback');
    return {
        getCookie: (name) => {
            if (typeof document !== 'undefined') {
                const value = `; ${document.cookie}`;
                console.log('StorageManager => getCookie ============> ',value);
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            }
            return '';
        },
        setCookie: (name, value, options = {}) => {
            if (typeof document !== 'undefined') {
                let cookie = `${name}=${value}`;
                if (options.expires) cookie += `; expires=${options.expires.toUTCString()}`;
                if (options.path) cookie += `; path=${options.path}`;
                if (options.domain) cookie += `; domain=${options.domain}`;
                if (options.secure) cookie += '; secure';
                document.cookie = cookie;
            }
        },
        deleteCookie: (name, options = {}) => {
            if (typeof document !== 'undefined') {
                let cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                if (options.path) cookie += `; path=${options.path}`;
                if (options.domain) cookie += `; domain=${options.domain}`;
                document.cookie = cookie;
            }
        }
    };
};

export const Request = function(...args) {
    const currentCVStorage = getCVStorage();
  
    // Si CVStorage está disponible, usar su Request
    if (currentCVStorage?.Request) {
        return currentCVStorage.Request(...args);
    }
  
    // Fallback que retorna un objeto con métodos mock
    console.warn('Request no disponible, usando fallback');
    return {
        get: (url, options = {}) => {
            if (typeof fetch !== 'undefined') {
                return fetch(url, { method: 'GET', ...options })
                .then(response => response.json())
                .catch(error => {
                    console.warn('Error en Request fallback:', error);
                    return {};
                });
            }
            return Promise.resolve({});
        }
    };
};

// sessionStoreCookie debe ser una función constructora/factory
export const sessionStoreCookie = function(config = {}) {
    const currentCVStorage = getCVStorage();
  
    // Si CVStorage está disponible, usar su sessionStoreCookie
    if (currentCVStorage?.sessionStoreCookie) {
        return currentCVStorage.sessionStoreCookie(config);
    }
  
    // Fallback que retorna un objeto con métodos mock
    console.warn('sessionStoreCookie no disponible, usando fallback con config:', config);
    return {
        get: (key) => {
            if (typeof window !== 'undefined' && window.localStorage) {
                try {
                    const stored = window.localStorage.getItem(`cv_session_${key}`);
                    return stored ? JSON.parse(stored) : null;
                } catch (e) {
                    console.warn('Error leyendo sessionStorage fallback:', e);
                    return null;
                }
            }
            return null;
        },
        put: (key, value) => {
            if (typeof window !== 'undefined' && window.localStorage) {
                try {
                    window.localStorage.setItem(`cv_session_${key}`, JSON.stringify(value));
                } catch (e) {
                    console.warn('Error escribiendo sessionStorage fallback:', e);
                }
            }
        },
        persist: () => {
            // No-op en fallback
        },
        destroy: () => {
            if (typeof window !== 'undefined' && window.localStorage) {
                const keys = Object.keys(window.localStorage);
                keys.forEach(key => {
                    if (key.startsWith('cv_session_')) {
                        window.localStorage.removeItem(key);
                    }
                });
            }
        },
        getLanguage: () => {
            return typeof document !== 'undefined' ? document.documentElement.lang || 'en' : 'en';
        },
        // Métodos adicionales que puede requerir la librería original
        access: () => true,
        initialized: () => true,
        clear: () => {
            if (typeof window !== 'undefined' && window.localStorage) {
                const keys = Object.keys(window.localStorage);
                keys.forEach(key => {
                    if (key.startsWith('cv_session_')) {
                        window.localStorage.removeItem(key);
                    }
                });
            }
        }
    };
};

// Exportación por defecto
export default () => getCVStorage() || {
    StorageManager,
    Request, 
    sessionStoreCookie
};