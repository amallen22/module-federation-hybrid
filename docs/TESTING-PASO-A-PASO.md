# Testing Module Federation - Paso a Paso

**Fecha**: 2025-10-06  
**Objetivo**: Probar correctamente la integración entre shell-webpack y login

## ⚠️ Importante

Hay **DOS modos** de ejecutar la app login:

1. **Standalone** (localhost:3001) - Usa `index.js` con analytics **HABILITADO**
2. **Module Federation** (desde shell) - Usa `App.jsx` con analytics **COMENTADO**

## 🎯 Modo Correcto de Testing

Para probar Module Federation, **NO debes abrir** `localhost:3001` directamente. Solo debes:

1. Verificar que el servidor login esté corriendo
2. Verificar que remoteEntry.js sea accesible
3. **Abrir SOLO** `localhost:3000/login` (desde shell)

## 📋 Pasos Exactos

### Paso 0: Limpiar Todo

```bash
# Matar procesos en puertos
kill -9 $(lsof -t -i:3000) 2>/dev/null
kill -9 $(lsof -t -i:3001) 2>/dev/null

# Limpiar cache (opcional pero recomendado)
cd /home/amallen/www/cv-apps/cv-hibrid/apps/login
rm -rf build/ node_modules/.cache/

cd /home/amallen/www/cv-apps/cv-hibrid/apps/shell-webpack
rm -rf dist/ node_modules/.cache/
```

### Paso 1: Verificar Loaders Instalados

```bash
cd /home/amallen/www/cv-apps/cv-hibrid/apps/shell-webpack

# Verificar que sass-loader esté instalado
npm list sass-loader
# Debe mostrar: sass-loader@X.X.X

npm list sass
# Debe mostrar: sass@X.X.X
```

### Paso 2: Iniciar Login (Terminal 1)

```bash
cd /home/amallen/www/cv-apps/cv-hibrid/apps/login

# Si nunca se ha ejecutado setup:
npm run setup

# Iniciar servidor
npm run serve
```

**Esperar a ver:**
```
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:3001/
...
webpack compiled successfully
```

### Paso 3: Verificar RemoteEntry (Terminal 2)

```bash
# Debe retornar 200 OK
curl -I http://localhost:3001/dist/remoteEntry.js

# Debe mostrar contenido JavaScript
curl http://localhost:3001/dist/remoteEntry.js | head -20
```

**Salida esperada:**
```
HTTP/1.1 200 OK
Content-Type: application/javascript; charset=utf-8
Access-Control-Allow-Origin: *
...
```

### Paso 4: Iniciar Shell-Webpack (Terminal 2)

```bash
cd /home/amallen/www/cv-apps/cv-hibrid/apps/shell-webpack

# Iniciar servidor
npm run dev
```

**Esperar a ver:**
```
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:3000/
...
webpack compiled successfully
```

### Paso 5: Probar en Navegador

1. **Abrir**: http://localhost:3000 (shell homepage)
2. **NO abrir**: ~~http://localhost:3001~~ (standalone - NO usar)
3. **Click en**: "🔐 Login" en el menú
4. **URL debe ser**: http://localhost:3000/login

## ✅ Qué Verificar en DevTools

### Console (F12) - Lo que DEBE aparecer:

✅ Líneas del tipo:
```
[HMR] Waiting for update signal from WDS...
HandleVisitorUseCase error: ...  // Simple console.error
```

### Console - Lo que NO debe aparecer:

❌ Errores de Module Federation:
```
ScriptExternalLoadError: Loading script failed.
```

❌ Errores de Webpack Loaders:
```
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type
```

❌ Errores de SCSS/SVG:
```
ERROR in ../login/src/app/styles/cv.scss
ERROR in ../login/src/app/public_common/login/images/icons/google-icon.svg
```

❌ Llamadas a Google Ads/Analytics:
```
GET https://www.google.com/pagead/...
POST https://stage.resumecoach.com/api-public-v15/frontlog
```

### Network Tab

Debe aparecer:
```
Name                          Status    Type            Size
remoteEntry.js                200       javascript      ~XX KB
login_src_app_App_jsx...js    200       javascript      ~XX KB
```

### Sources Tab

Debe aparecer:
```
webpack://
  ├── loginApp/
  │   └── ./src/app/App.jsx         ← Debe ser App.jsx, NO index.js
  └── shell/
      └── ./src/App.tsx
```

## 🐛 Troubleshooting

### Error: SVG/SCSS Loader

**Síntoma:**
```
ERROR in ../login/src/app/public_common/login/images/icons/google-icon.svg
Module parse failed: Unexpected token
```

**Solución:**
```bash
cd apps/shell-webpack
npm install --save-dev sass-loader sass
npm run dev  # Reiniciar
```

### Error: Analytics ejecutándose

**Síntoma:**
```
POST https://stage.resumecoach.com/api-public-v15/frontlog
GET https://www.google.com/pagead/...
```

**Causa**: Estás abriendo `localhost:3001` directamente (modo standalone).

**Solución**: Solo abrir `localhost:3000/login` (desde shell).

### Error: 404 en auto../images/

**Síntoma:**
```
GET http://localhost:3001/auto../images/loader/google-icon-7nFD.svg 404
```

**Causa**: `publicPath: 'auto'` genera URL incorrecta.

**Solución**: Este error aparece en modo standalone. En Module Federation no debería aparecer.

### Warning: State update during render

**Síntoma:**
```
Warning: Cannot update during an existing state transition
```

**Causa**: Bug en Controller.js línea 457 (setState en getContentByHash durante render).

**Solución**: Este es un problema del código original de login, no afecta Module Federation. Se puede ignorar por ahora.

### Warning: State update on unmounted component

**Síntoma:**
```
Warning: Can't perform a React state update on an unmounted component
```

**Causa**: Falta cleanup en componentWillUnmount de Controller.

**Solución**: Ignorar por ahora, no afecta funcionalidad de Module Federation.

## 📊 Comparación de Logs

### ❌ Logs INCORRECTOS (Standalone - localhost:3001)

```
GET http://localhost:3001/auto../images/loader/google-icon-7nFD.svg 404
POST https://stage.resumecoach.com/api-public-v15/frontlog net::ERR_FAILED
GET https://www.google.com/pagead/1p-user-list/...
```

👆 Estos logs indican que estás en modo standalone con analytics habilitado.

### ✅ Logs CORRECTOS (Module Federation - localhost:3000/login)

```
[HMR] Waiting for update signal from WDS...
HandleVisitorUseCase error: ... (console.error simple)
```

👆 Logs limpios sin analytics, sin Google Ads, sin FrontLog.

## 🎬 Video Mental del Flujo Correcto

1. Terminal 1: `cd apps/login && npm run serve`
2. Esperar "webpack compiled successfully"
3. Terminal 2: `curl -I localhost:3001/dist/remoteEntry.js` → 200 OK
4. Terminal 2: `cd apps/shell-webpack && npm run dev`
5. Esperar "webpack compiled successfully"
6. Browser: Abrir **solo** `localhost:3000`
7. Click en "🔐 Login"
8. Verificar que URL es `localhost:3000/login` (no 3001)
9. Login debe cargar sin errores de loader
10. DevTools Console debe estar limpia (sin analytics)

## 🔍 Verificación Final

### Checklist Pre-Testing

- [ ] Instalado sass-loader en shell-webpack
- [ ] Instalado sass en shell-webpack
- [ ] Loaders agregados en webpack.config.js de shell
- [ ] Analytics comentado en App.jsx, Controller.js, withLoginComponent.js
- [ ] Servidores parados (puertos 3000 y 3001 libres)

### Checklist Durante Testing

- [ ] Login server corriendo en 3001
- [ ] remoteEntry.js accesible (curl 200 OK)
- [ ] Shell server corriendo en 3000
- [ ] **NO** abro localhost:3001 en el browser
- [ ] **SÍ** abro localhost:3000
- [ ] Click en Login lleva a localhost:3000/login

### Checklist Post-Testing

- [ ] No hay errores de loader (SVG/SCSS)
- [ ] No hay llamadas a Google Ads
- [ ] No hay llamadas a FrontLog
- [ ] Login UI se muestra correctamente
- [ ] Sources muestra App.jsx (no index.js)

## 💡 Resumen

**Modo Standalone** (localhost:3001):
- Usa: `index.js`
- Analytics: ✅ HABILITADO
- Uso: Testing independiente de login
- **NO usar para probar Module Federation**

**Modo Module Federation** (localhost:3000/login):
- Usa: `App.jsx` (via remoteEntry.js)
- Analytics: ❌ COMENTADO
- Uso: Testing de integración shell ↔ login
- **ESTE es el modo correcto para probar**

---

**Siguiente paso**: Una vez funcionando Module Federation, replicar el patrón para user app.
