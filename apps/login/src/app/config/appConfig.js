// Polyfills se importan desde el entry point (main.tsx o App.tsx)
import { GetApiEditorUrl, GetApiUrl, GetDomainConfig } from '@npm_leadtech/cv-lib-app-config';

import CONFIG from './config.json';

if ((CONFIG || CONFIG.data) === undefined) {
    throw new Error('App configuration missing. Please execute npm run setup.');
}

// En desarrollo, usar 'local.resumecoach.com' si estamos en localhost
const hostname = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'local.resumecoach.com' 
    : typeof window !== 'undefined' ? window.location.hostname : 'local.resumecoach.com';

export const APP_CONFIG = GetDomainConfig(hostname, CONFIG.data);
console.log('APP_CONFIG', APP_CONFIG);
export const API_URL = GetApiUrl(APP_CONFIG);

export const API_EDITOR_URL = GetApiEditorUrl(APP_CONFIG);

/**
 * URL base para cargar archivos de traducción (i18n)
 * 
 * En desarrollo:
 * - Si login se carga desde shell (localhost:5000), usa el servidor de login (localhost:5003)
 * - Si login está standalone (localhost:5003), usa el origin actual
 * 
 * En producción:
 * - Usa el origin actual (los archivos estarán en el mismo servidor)
 * - O puede configurarse vía variable de entorno VITE_I18N_BASE_URL
 */
export const I18N_BASE_URL = (() => {
    if (typeof window === 'undefined') {
        return '';
    }
    
    const origin = window.location.origin;
    const hostname = window.location.hostname;
    
    // Detectar si estamos en desarrollo (localhost)
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isInShell = origin.includes('localhost:5000');
    
    // En desarrollo, si estamos en shell, usar servidor de login
    if (isLocalhost && isInShell) {
        return 'http://localhost:5003';
    }
    
    // Por defecto, usar el origin actual
    return origin;
})();
