import { GetApiEditorUrl, GetApiUrl, GetBuildConfig, GetDomainConfig } from '@npm_leadtech/cv-lib-app-config';

import CONFIG from './config.json';
import TEMPLATES_CONFIG_DATA from './templatesConfig.json';

if ((CONFIG || CONFIG.data) === undefined) {
    throw new Error('App configuration missing. Please execute npm run setup.');
}


// console.log('location.hostname ::::::::::::::::::::::::::', location.hostname);
// console.log('CONFIG.data ::::::::::::::::::::::::::', CONFIG.data);

// Obtener configuración del dominio
// let APP_CONFIG = GetDomainConfig(location.hostname, CONFIG.data);
export let APP_CONFIG = GetDomainConfig('local.resumecoach.com', CONFIG.data);

// export const APP_CONFIG = GetDomainConfig(location.hostname, CONFIG.data);
// console.log('APP_CONFIG from getDomainConfig ::::::::::::::::::::::::::', APP_CONFIG);

export const TEMPLATES_CONFIG = GetBuildConfig(TEMPLATES_CONFIG_DATA.data);
// console.log('TEMPLATES_CONFIG from getBuildConfig ::::::::::::::::::::::::::', TEMPLATES_CONFIG);

export const API_URL = GetApiUrl(APP_CONFIG);

console.log('API_URL from getDomainConfig ::::::::::::::::::::::::::', API_URL);

export const API_EDITOR_URL = GetApiEditorUrl(APP_CONFIG);
// This string is hardcoded because it's provided by another call /Templates or /Template and configuring the whole call was deemed not worth it as this field never changes.
export const PREDEFINED_SECTIONS_CV =
    'b27ba813-72d3-4b67-b0c7-5159e7c805b0|fd4905eb-e158-4281-944f-44e5d977a48d|3eaaf201-7b4e-4ff4-a6eb-370f9ecfc0f4|3ed40f89-7a4c-465d-b108-36934d401760|eedbf15a-7f81-442c-8a4d-63a1223348b7|fb6610c3-3c39-4b91-aa96-291f25c8331d|c0983838-e0f6-4756-b290-4779e384451c|171db4be-322d-4a17-aeb4-eeee8697a5b2|d5857edb-8a50-4387-bad0-37f13154a58c|1176277d-7bbb-4185-8124-5373a6cee0c8|4d30bc0b-2fc0-42fd-aa04-b9673ace32ea|7c865ca8-0278-470d-9d83-5730f3338151|7aecde7a-af07-4431-aa9e-2bb425cb47ed';
export const PREDEFINED_SECTIONS_CL =
    'e63ce7f4-a7a5-11e8-98d0-529269fb1459|c02d1a14-ab7b-11e8-98d0-529269fb1459|8a54708c-a7a6-11e8-98d0-529269fb1459|d0589d60-a9db-11e8-98d0-529269fb1459|128c03d8-ab86-11e8-98d0-529269fb1459|a449d33c-ab8a-11e8-98d0-529269fb1459';
