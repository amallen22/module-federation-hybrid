import { GetApiEditorUrl, GetApiUrl, GetDomainConfig } from '@npm_leadtech/cv-lib-app-config';

import CONFIG from './config.json';

if ((CONFIG || CONFIG.data) === undefined) {
    throw new Error('App configuration missing. Please execute npm run setup.');
}

// Obtener configuración del dominio
// let APP_CONFIG = GetDomainConfig(location.hostname, CONFIG.data);
let APP_CONFIG = GetDomainConfig('local.resumecoach.com', CONFIG.data);

console.log('APP_CONFIG from getDomainConfig ::::::::::::::::::::::::::', APP_CONFIG);

export { APP_CONFIG };
export const API_URL = GetApiUrl(APP_CONFIG);
export const API_EDITOR_URL = GetApiEditorUrl(APP_CONFIG);
