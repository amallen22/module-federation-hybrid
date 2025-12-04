# Soluciones para el Problema de Traducciones (i18n) en Login

## Problema

Cuando `apps/login` se carga desde `apps/shell` en desarrollo:
- `GetLanguageHandler` usa `document.location.origin` (que es `http://localhost:5000`)
- Intenta cargar `/dist/i18n/en-US.json` desde el shell
- Pero los archivos están en el servidor de login (`http://localhost:5003/dist/i18n/`)

**Resultado:** Las traducciones no se cargan y se muestra "missing translation: en|..."

---

## Opción 1: Servir i18n desde el Shell (Recomendada para Desarrollo) ⭐

### Descripción
Añadir middleware en el shell que sirva los archivos i18n desde `apps/login/src/app/i18n/` cuando se solicite `/dist/i18n/*`.

### Pros
- ✅ Simple y rápida de implementar
- ✅ No requiere cambios en login
- ✅ Funciona inmediatamente en desarrollo
- ✅ Los archivos se sirven desde el mismo origen (sin CORS)

### Contras
- ⚠️ Solo funciona en desarrollo (cuando login se carga vía path alias)
- ⚠️ En producción con Module Federation, los archivos seguirían estando en el servidor de login

### Implementación

**apps/shell/vite.config.ts:**
```typescript
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

// Plugin para servir i18n de login desde el shell
const serveLoginI18nPlugin = () => {
  return {
    name: 'serve-login-i18n',
    configureServer(server) {
      server.middlewares.use('/dist/i18n', (req, res, next) => {
        // Solo en desarrollo cuando login se carga vía path alias
        if (process.env.NODE_ENV === 'development') {
          const i18nPath = resolve(__dirname, '../login/src/app/i18n');
          const fileName = req.url.split('/').pop(); // ej: "en-US.json"
          const filePath = resolve(i18nPath, fileName);
          
          if (existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(readFileSync(filePath, 'utf-8'));
            return;
          }
        }
        next();
      });
    }
  };
};

// Añadir al array de plugins
plugins: [
  // ... otros plugins
  serveLoginI18nPlugin(),
]
```

### Complejidad: ⭐ (Baja)
### Tiempo estimado: 15 minutos

---

## Opción 2: Detectar Contexto y Usar URL Absoluta

### Descripción
Modificar `GetLanguageHandler` para detectar si login está siendo ejecutado dentro del shell y usar la URL del servidor de login.

### Pros
- ✅ Funciona en desarrollo y producción
- ✅ No requiere cambios en el shell
- ✅ Solución más robusta

### Contras
- ⚠️ Requiere detectar el contexto (puede ser frágil)
- ⚠️ Necesita conocer la URL del servidor de login

### Implementación

**apps/login/src/app/services/api/GetLanguage/GetLanguageHandler.js:**
```javascript
export class GetLanguageHandler extends AjaxHandler {
    constructor () {
        // Detectar si estamos en shell (desarrollo)
        const isInShell = process.env.NODE_ENV === 'development' && 
                         window.location.origin.includes('localhost:5000');
        
        const apiPrefix = isInShell 
            ? 'http://localhost:5003'  // Servidor de login
            : document.location.origin; // Standalone o producción
        
        super({
            apiPrefix,
            errorHandler: FrontLogService.logAjaxResponse,
            endpointDefinition,
            reducer: GetLanguageReducer,
            sessionStoreCookie: CVStorage.sessionStoreCookie
        });
    }
}
```

**Alternativa con variable de entorno:**
```javascript
const apiPrefix = import.meta.env.VITE_LOGIN_SERVER_URL || document.location.origin;
```

### Complejidad: ⭐⭐ (Media)
### Tiempo estimado: 30 minutos

---

## Opción 3: Variable de Configuración en appConfig

### Descripción
Añadir `I18N_BASE_URL` en `appConfig.js` y usarla en `GetLanguageHandler`.

### Pros
- ✅ Flexible y configurable
- ✅ Funciona en todos los entornos
- ✅ Centralizado en la configuración

### Contras
- ⚠️ Requiere configuración adicional
- ⚠️ Más complejo de mantener

### Implementación

**apps/login/src/app/config/appConfig.js:**
```javascript
// Añadir al final
export const I18N_BASE_URL = process.env.NODE_ENV === 'development' && 
                             typeof window !== 'undefined' && 
                             window.location.origin.includes('localhost:5000')
    ? 'http://localhost:5003'  // Cuando se carga desde shell
    : typeof window !== 'undefined' ? window.location.origin : '';
```

**apps/login/src/app/services/api/GetLanguage/GetLanguageHandler.js:**
```javascript
import { I18N_BASE_URL } from '../../../config/appConfig';

export class GetLanguageHandler extends AjaxHandler {
    constructor () {
        super({
            apiPrefix: I18N_BASE_URL || document.location.origin,
            // ... resto
        });
    }
}
```

### Complejidad: ⭐⭐ (Media)
### Tiempo estimado: 30 minutos

---

## Opción 4: Importar Traducciones como Módulos ES

### Descripción
Refactorizar para importar los JSON directamente en lugar de hacer peticiones HTTP.

### Pros
- ✅ No requiere peticiones HTTP
- ✅ Funciona en cualquier contexto
- ✅ Más rápido (sin latencia de red)
- ✅ Type-safe con TypeScript

### Contras
- ⚠️ Requiere refactorizar el sistema de traducciones
- ⚠️ Aumenta el tamaño del bundle
- ⚠️ Cambio más grande en la arquitectura

### Implementación

**apps/login/src/app/services/SetupTranslations.js:**
```javascript
import translate from 'counterpart';
import enUS from '../i18n/en-US.json';
import esES from '../i18n/es-ES.json';
// ... otros idiomas

const translations = {
  'en-US': enUS,
  'es-ES': esES,
  // ...
};

export const SetupTranslations = function() {
    translate.setSeparator('|');
    // Registrar todas las traducciones
    Object.entries(translations).forEach(([lang, data]) => {
        translate.registerTranslations(lang, data);
    });
};

export const SetLanguage = function(language) {
    if (translations[language]) {
        translate.setLocale(language);
        return Promise.resolve();
    }
    return Promise.reject(new Error(`Language ${language} not found`));
};
```

### Complejidad: ⭐⭐⭐ (Alta)
### Tiempo estimado: 2-3 horas

---

## Opción 5: Proxy en el Shell

### Descripción
Configurar un proxy en Vite que redirija `/dist/i18n/*` al servidor de login.

### Pros
- ✅ Transparente para login (no requiere cambios)
- ✅ Funciona en desarrollo y producción
- ✅ Mantiene la arquitectura actual

### Contras
- ⚠️ Más complejo de configurar
- ⚠️ Requiere que el servidor de login esté corriendo

### Implementación

**apps/shell/vite.config.ts:**
```typescript
server: {
  port: 5000,
  proxy: {
    '/dist/i18n': {
      target: 'http://localhost:5003',
      changeOrigin: true,
      rewrite: (path) => path, // Mantener /dist/i18n/...
    }
  }
}
```

### Complejidad: ⭐⭐ (Media)
### Tiempo estimado: 20 minutos

---

## Recomendación

### Para Desarrollo Rápido: **Opción 1** ⭐
- Implementación más simple
- Funciona inmediatamente
- Puede migrarse a otra solución después

### Para Solución Robusta: **Opción 2** ⭐⭐
- Funciona en todos los entornos
- No requiere cambios en el shell
- Más mantenible a largo plazo

### Para Solución Definitiva: **Opción 4** ⭐⭐⭐
- Elimina el problema completamente
- Mejor rendimiento
- Requiere más trabajo pero es la mejor arquitectura

---

## Decisión

¿Cuál opción prefieres implementar?

1. **Opción 1** - Servir i18n desde el shell (rápida)
2. **Opción 2** - Detectar contexto (robusta)
3. **Opción 3** - Variable de configuración (flexible)
4. **Opción 4** - Importar como módulos (definitiva)
5. **Opción 5** - Proxy en shell (transparente)

