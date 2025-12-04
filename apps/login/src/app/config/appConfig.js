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
