# Analytics Deshabilitado para Debugging

**Fecha**: 2025-10-06  
**Objetivo**: Eliminar ruido de analytics/logging durante troubleshooting de Module Federation

## ⚠️ Importante

Estos cambios son **TEMPORALES** solo para debugging. Una vez resuelto el problema de Module Federation, se deben **revertir** para restaurar analytics y logging.

## 📝 Archivos Modificados

### 1. `apps/login/src/app/App.jsx`

**Imports comentados:**
```javascript
// import { analyticsClient } from '@npm_leadtech/cv-lib-app-analytics'; // COMMENTED FOR DEBUGGING
// import { getLogger, setupLog } from '@npm_leadtech/cv-lib-app-jsnlog'; // COMMENTED FOR DEBUGGING
// import { trackAppInstalls } from './trackAppInstalls'; // COMMENTED FOR DEBUGGING
```

**Código comentado en `initializeApp()`:**
- `analyticsClient.initialize()` - Inicialización de Google Tag Manager y Amplitude
- `setupLog()` - Configuración de logging front-end
- `global.CV.Log = getLogger()` - Logger global
- `trackAppInstalls()` - Tracking de instalaciones

### 2. `apps/login/src/app/Controller.js`

**Imports comentados:**
```javascript
// import { amplitude, AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics'; // COMMENTED FOR DEBUGGING
// import { AnalyticsLayer } from './internals/analytics-layer/AnalyticsLayer'; // COMMENTED FOR DEBUGGING
// import { FrontLogService } from './services/FrontLogService'; // COMMENTED FOR DEBUGGING
```

**Código comentado:**
- `new AnalyticsLayer()` en constructor - Mapeo de sessionStorage a analytics
- `amplitude.getDeviceId()` en `handleVisitor()` - Ahora pasa `null`
- `FrontLogService.logAjaxResponse()` - Reemplazado con `console.error()`
- `sendAnalyticsData()` - Ahora retorna `null` en vez de `<AnalyticsLocationChange />`

### 3. `apps/login/src/app/hoc/withLoginComponent.js`

**Imports comentados:**
```javascript
// import { amplitude, analyticsClient } from '@npm_leadtech/cv-lib-app-analytics'; // COMMENTED FOR DEBUGGING
```

**Cambios en 4 instancias de `SignUpModule`:**
- `cookieEndpoint`: Removido `?amplitudeDeviceId=${amplitude.getDeviceId()}`
- `analyticsProvider`: Comentado `analyticsProvider: analyticsClient`

Afecta a:
- LinkedIn login (línea ~71)
- Google login (línea ~95)
- Cognito SignUp (línea ~121)
- Cognito SignIn (línea ~147)

### 4. Archivos SCSS con Rutas Absolutas

**Problema**: Module Federation no puede resolver rutas absolutas como `/images/icons/error.svg`

**Archivos modificados:**

#### `apps/login/src/app/styles/stylesheets/05_flashmessage/_flashmessage.scss`
```scss
/* ANTES */
background: #ffb7b6 url('/images/icons/error.svg') 15px center no-repeat;

/* DESPUÉS - TEMPORALMENTE COMENTADO */
background: #ffb7b6; /* TEMPORARILY COMMENTED: url('/images/icons/error.svg') ... */
```

#### `apps/login/src/app/styles/stylesheets/02_atom/_a-icons.scss`
```scss
/* ANTES */
content: url("/payment/images/icons/info.svg");

/* DESPUÉS - TEMPORALMENTE COMENTADO */
/* content: url("/payment/images/icons/info.svg"); */
```

#### `apps/login/src/app/styles/stylesheets/02_atom/_a-list.scss`
```scss
/* ANTES */
content: url(/login/images/icons/check-blue.png);

/* DESPUÉS - TEMPORALMENTE COMENTADO */
/* content: url(/login/images/icons/check-blue.png); */
```

**Impacto**:
- Flash messages no tendrán icono de error
- Listas no tendrán icono de check
- Info icons no se mostrarán

**Nota**: Estos son cambios cosméticos que no afectan la funcionalidad core.

## 🎯 Razón de los Cambios

Durante el debugging de Module Federation, los errores relacionados con analytics/logging estaban **generando ruido** que dificultaba identificar el problema real. Específicamente:

1. **Errores de GTM/Amplitude** en console
2. **Errores de FrontLog** por configuración
3. **Warnings de analytics** sin inicializar
4. **Logs excesivos** que ocultaban errores importantes

## ✅ Beneficios para Debugging

Con analytics deshabilitado:
- ✅ Console más limpia
- ✅ Errores de Module Federation más visibles
- ✅ Menos llamadas HTTP a servicios externos
- ✅ Inicio más rápido de la app
- ✅ No depende de configuración de tagManagerId/amplitudeKey

## 🔄 Cómo Revertir los Cambios

Cuando se resuelva el problema de Module Federation:

```bash
cd /home/amallen/www/cv-apps/cv-hibrid/apps/login

# Opción 1: Revertir con git (si está versionado)
git checkout src/app/App.jsx
git checkout src/app/Controller.js
git checkout src/app/hoc/withLoginComponent.js

# Opción 2: Buscar y descomentar manualmente
# Buscar todos los comentarios "COMMENTED FOR DEBUGGING" y revertir
grep -r "COMMENTED FOR DEBUGGING" src/app/
```

### Checklist para Revertir

- [ ] Descomentar imports en `App.jsx`
- [ ] Descomentar código en `initializeApp()` de `App.jsx`
- [ ] Descomentar imports en `Controller.js`
- [ ] Restaurar `new AnalyticsLayer()` en constructor
- [ ] Restaurar `amplitude.getDeviceId()` en `handleVisitor()`
- [ ] Restaurar `FrontLogService.logAjaxResponse()`
- [ ] Restaurar `sendAnalyticsData()` completo
- [ ] Descomentar imports en `withLoginComponent.js`
- [ ] Restaurar `amplitudeDeviceId` en 4 `cookieEndpoint`
- [ ] Restaurar `analyticsProvider` en 4 instancias de `SignUpModule`

## 🧪 Testing Sin Analytics

La app debe funcionar normalmente sin analytics:

### Funcionalidad Básica
- ✅ Carga de la app
- ✅ Routing entre SignIn/SignUp
- ✅ Formularios de login
- ✅ Social login (Google, LinkedIn)
- ✅ Cognito authentication
- ✅ Password reset/rescue

### Lo que NO Funcionará
- ❌ Google Tag Manager events
- ❌ Amplitude tracking
- ❌ FrontLog error reporting
- ❌ Analytics de conversión
- ❌ Tracking de app installs
- ❌ Device ID en visitor API

## 📊 Impacto en Producción

**⚠️ CRÍTICO**: Estos cambios **NO deben ir a producción**.

Sin analytics:
- No habrá tracking de usuarios
- No se reportarán errores a FrontLog
- No habrá datos en GTM/GA
- No habrá métricas en Amplitude
- Se perderán datos de conversión

## 🔍 Debugging Adicional

Si aún hay errores después de deshabilitar analytics, buscar:

```bash
# Buscar otros posibles imports de analytics
grep -r "analyticsClient" apps/login/src/app/
grep -r "amplitude" apps/login/src/app/
grep -r "FrontLogService" apps/login/src/app/
grep -r "getLogger" apps/login/src/app/

# Buscar referencias a tagManager
grep -r "tagManager" apps/login/src/app/
grep -r "GTM" apps/login/src/app/
```

## 📚 Archivos de Configuración Relacionados

Estos archivos contienen configuración de analytics (no modificados):

- `apps/login/src/app/config/appConfig.js` - `tagManagerId`, `amplitudeKey`
- `apps/login/src/app/internals/analytics-layer/AnalyticsLayer.js` - Implementación
- `apps/login/src/app/services/FrontLogService.js` - Servicio de logging
- `apps/login/src/app/trackAppInstalls.js` - Tracking de instalaciones

## 💡 Notas

- Los cambios solo afectan a la app **login**
- El **index.js** original no fue modificado (sigue con analytics para standalone)
- **App.jsx** es el nuevo entry point para Module Federation
- Console.error simple reemplaza FrontLogService para debugging básico

## ✨ Estado Actual

- ✅ Analytics comentado en App.jsx
- ✅ Analytics comentado en Controller.js
- ✅ Analytics comentado en withLoginComponent.js
- ✅ App funciona sin dependencias de analytics
- ✅ Console más limpia para debugging
- ⏳ **Pending**: Probar integración con shell-webpack

---

**Recordatorio**: Una vez resuelto el problema de Module Federation, **revertir todos estos cambios** para restaurar funcionalidad completa de analytics y logging.
