// Debug version of appConfig.js

console.log('🔍 Debug appConfig: Iniciando carga de configuración...');

// Primero vamos a ver qué hay en CONFIG.json
import CONFIG from './config.json';

console.log('✅ Debug appConfig: CONFIG cargado:', CONFIG);
console.log('✅ Debug appConfig: CONFIG.data existe:', CONFIG.data ? 'Sí' : 'No');

// Vamos a intentar cargar las funciones de la librería
let GetDomainConfig, GetApiUrl, GetApiEditorUrl;

try {
  console.log('🔍 Debug appConfig: Intentando importar funciones de cv-lib-app-config...');
  const libModule = await import('@npm_leadtech/cv-lib-app-config');
  GetDomainConfig = libModule.GetDomainConfig;
  GetApiUrl = libModule.GetApiUrl;
  GetApiEditorUrl = libModule.GetApiEditorUrl;
  console.log('✅ Debug appConfig: Funciones importadas correctamente');
} catch (error) {
  console.error('❌ Debug appConfig: Error al importar funciones:', error);
  throw error;
}

// Ahora vamos a intentar obtener la configuración del dominio
let APP_CONFIG;
try {
  console.log('🔍 Debug appConfig: Intentando obtener configuración del dominio...');
  console.log('🔍 Debug appConfig: location.hostname:', location.hostname);
  
  APP_CONFIG = GetDomainConfig(location.hostname, CONFIG.data);
  console.log('✅ Debug appConfig: APP_CONFIG obtenido:', APP_CONFIG);
  console.log('✅ Debug appConfig: APP_CONFIG._data:', APP_CONFIG?._data);
  console.log('✅ Debug appConfig: APP_CONFIG tipo:', typeof APP_CONFIG);
  
  // Verificamos si APP_CONFIG tiene apiSubdomain antes de continuar
  let hasApiSubdomain = false;
  try {
    hasApiSubdomain = APP_CONFIG && APP_CONFIG.apiSubdomain;
    console.log('✅ Debug appConfig: Verificación apiSubdomain exitosa:', hasApiSubdomain);
  } catch (error) {
    console.warn('⚠️ Debug appConfig: Error al verificar apiSubdomain:', error.message);
    hasApiSubdomain = false;
  }
  
  if (!hasApiSubdomain) {
    console.warn('⚠️ Debug appConfig: APP_CONFIG no tiene apiSubdomain, creando configuración por defecto...');
    
    // Crear una configuración por defecto para localhost
    APP_CONFIG = {
      appName: 'CV App Login Local',
      domain: 'resumecoach.com',  // Usar el dominio correcto para la API
      apiSubdomain: 'stage', // Valor por defecto
      apiVersion: 'api-public-v15',
      apiEditorSubdomain: 'stage',
      apiEditorVersion: 'api-editor-v10',
      cognitoLoginConfig: {
        "clientId": "29j7rtdn0ln4i64tlsupm1ejs8",
        "userPoolId": "eu-west-1_30EeQ3e2p",
        "identityPoolId": "eu-west-1:596e63f6-cb83-439e-9059-240bcf713ff0"
      },
      tagManagerId: 'GTM-5XDR337', // Valor por defecto del config.json que viste
      amplitudeKey: 'test_key' // Valor por defecto
    };
    console.log('✅ Debug appConfig: Configuración por defecto creada:', APP_CONFIG);
  }
  
} catch (error) {
  console.error('❌ Debug appConfig: Error al obtener APP_CONFIG:', error);
  throw error;
}

// Finalmente intentamos obtener las URLs
let API_URL, API_EDITOR_URL;
try {
  console.log('🔍 Debug appConfig: Intentando obtener URLs...');
  
  API_URL = GetApiUrl(APP_CONFIG);
  console.log('✅ Debug appConfig: API_URL obtenido:', API_URL);
  
  API_EDITOR_URL = GetApiEditorUrl(APP_CONFIG);
  console.log('✅ Debug appConfig: API_EDITOR_URL obtenido:', API_EDITOR_URL);
} catch (error) {
  console.error('❌ Debug appConfig: Error al obtener URLs:', error);
  throw error;
}

console.log('🎉 Debug appConfig: Configuración completada exitosamente');

export { APP_CONFIG, API_URL, API_EDITOR_URL };
