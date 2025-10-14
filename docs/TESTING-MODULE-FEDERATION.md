# Testing Module Federation - Shell Webpack + Login

## Arquitectura Actual

```
┌─────────────────────────────────────────────┐
│  Shell-Webpack (localhost:3000)             │
│  ┌───────────────────────────────────────┐  │
│  │  webpack.config.js                    │  │
│  │  remotes: {                           │  │
│  │    loginApp: 'loginApp@localhost:3001'│  │
│  │  }                                    │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  App.tsx:                                   │
│  const LoginApp = lazy(() =>                │
│    import('loginApp/App')                   │
│  );                                         │
└─────────────────────────────────────────────┘
                    │
                    │ HTTP Request
                    ▼
┌─────────────────────────────────────────────┐
│  Login App (localhost:3001)                 │
│  ┌───────────────────────────────────────┐  │
│  │  webpack.config.js                    │  │
│  │  ModuleFederationPlugin:              │  │
│  │    name: 'loginApp'                   │  │
│  │    exposes: {                         │  │
│  │      './App': './src/app/App.jsx'     │  │
│  │    }                                  │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  App.jsx exports:                           │
│  - Componente React wrapper                │
│  - Inicialización única                    │
│  - Controller component                    │
└─────────────────────────────────────────────┘
```

## Estado Actual ✅

### Login App
- ✅ `App.jsx` creado (exporta componente)
- ✅ `webpack.config.js` configurado con Module Federation
- ✅ Expone `./App` → `./src/app/App.jsx`
- ✅ Puerto 3001 con CORS habilitado
- ✅ Procesa archivos `.jsx`

### Shell-Webpack
- ✅ Configurado para consumir `loginApp`
- ✅ Remote URL correcta: `http://localhost:3001/dist/remoteEntry.js`
- ✅ Import correcto: `import('loginApp/App')`
- ✅ Puerto 3000
- ✅ Routing configurado para `/login/*`

## Pasos para Probar

### Paso 1: Iniciar Login App

```bash
cd /home/amallen/www/cv-apps/cv-hibrid/apps/login

# Asegurarse de que la configuración está actualizada
npm run setup

# Iniciar el dev server
npm run serve
```

**Verificación:**
```bash
# Debe retornar 200 OK
curl -I http://localhost:3001/dist/remoteEntry.js

# Debe mostrar el contenido del remoteEntry
curl http://localhost:3001/dist/remoteEntry.js | head -20
```

**Salida esperada:**
```
HTTP/1.1 200 OK
Content-Type: application/javascript; charset=utf-8
Access-Control-Allow-Origin: *
...
```

### Paso 2: Iniciar Shell-Webpack

En **otra terminal**:

```bash
cd /home/amallen/www/cv-apps/cv-hibrid/apps/shell-webpack

# Iniciar el dev server
npm run dev
```

**Salida esperada:**
```
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:3000/
...
webpack 5.x.x compiled successfully in XXXXms
```

### Paso 3: Probar en el Navegador

1. **Abrir**: http://localhost:3000
2. **Click en**: "🔐 Login" en el menú de navegación
3. **Observar**: La app login debería cargar

## Verificaciones en DevTools

### Console (F12)

**❌ NO debe aparecer:**
```
ScriptExternalLoadError: Loading script failed.
(missing: http://localhost:3001/dist/remoteEntry.js)
```

**✅ Puede aparecer (normal):**
```
[HMR] Waiting for update signal from WDS...
```

### Network Tab

**Debe aparecer:**
```
Name                    Status    Type            Size
remoteEntry.js          200       javascript      ~XX KB
index.bundle.js         200       javascript      ~XX KB
runtime.XXXXX.js        200       javascript      ~XX KB
```

### Sources Tab

**Debe aparecer:**
```
webpack://
  ├── loginApp/
  │   └── ./src/app/App.jsx
  └── shell/
      └── ./src/App.tsx
```

## Troubleshooting

### ❌ Error: "Failed to load Login remote"

**Causa**: Servidor login no está corriendo o no es accesible.

**Solución**:
1. Verificar que login esté corriendo: `curl http://localhost:3001/dist/remoteEntry.js`
2. Si da error de conexión, reiniciar login: `cd apps/login && npm run serve`
3. Verificar que no haya conflictos de puerto: `lsof -i :3001`

### ❌ Error: "Cannot read properties of undefined (reading 'apiSubdomain')"

**Causa**: Configuración de login no inicializada.

**Solución**:
```bash
cd apps/login
npm run setup
# Reiniciar el servidor
npm run serve
```

### ❌ Error: "Module not found: Error: Can't resolve 'loginApp/App'"

**Causa**: Shell-webpack no puede resolver el remote.

**Solución**:
1. Verificar que `webpack.config.js` tenga el remote configurado correctamente
2. Reiniciar el servidor shell: `npm run dev`
3. Limpiar cache: `rm -rf node_modules/.cache && npm run dev`

### ❌ Login carga pero muestra pantalla en blanco

**Causa**: Error en la inicialización del componente App.jsx

**Solución**:
1. Verificar en Console los errores específicos
2. Revisar que `App.jsx` exporte default correctamente
3. Verificar que todas las dependencias estén instaladas en login

### ❌ CORS errors

**Causa**: Headers de CORS no configurados correctamente.

**Solución**:
Verificar en `apps/login/webpack.config.js`:
```js
devServer: {
    port: 3001,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
}
```

## Testing Checklist

### Pre-flight
- [ ] Login app instalado: `cd apps/login && npm install`
- [ ] Shell app instalado: `cd apps/shell-webpack && npm install`
- [ ] Login configurado: `cd apps/login && npm run setup`

### Runtime
- [ ] Login server corriendo en puerto 3001
- [ ] Shell server corriendo en puerto 3000
- [ ] remoteEntry.js accesible: `curl -I http://localhost:3001/dist/remoteEntry.js`

### Browser
- [ ] http://localhost:3000 carga correctamente
- [ ] Navegación funciona (Home, Login links visibles)
- [ ] Click en Login carga el componente
- [ ] No hay errores en Console
- [ ] Network muestra remoteEntry.js con status 200

### Integration
- [ ] Login app muestra su UI completa
- [ ] Formularios de login visibles
- [ ] Estilos se cargan correctamente
- [ ] No hay conflictos de dependencias

## Comandos Útiles

### Ver puertos ocupados
```bash
lsof -i :3000
lsof -i :3001
```

### Matar procesos en puertos
```bash
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:3001)
```

### Limpiar cache y rebuild
```bash
# Login
cd apps/login
rm -rf build/ node_modules/.cache/
npm run serve

# Shell
cd apps/shell-webpack
rm -rf dist/ node_modules/.cache/
npm run dev
```

### Ver logs detallados de webpack
```bash
# Login
cd apps/login
NODE_ENV=development npm run serve -- --progress

# Shell
cd apps/shell-webpack
npm run dev -- --progress
```

## Próximos Pasos

Una vez que Login funcione correctamente:

1. **Habilitar User App**: Descomentar en `shell-webpack/webpack.config.js`
2. **Configurar User App**: Similar a Login con Module Federation
3. **Probar navegación**: Entre Login → User
4. **Implementar autenticación**: Compartir estado via zustand
5. **Configurar otras apps**: Editor, Payment, Shop

## Referencias

- [Webpack Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)
- Documentación interna: `docs/module-federation-fix.md`
