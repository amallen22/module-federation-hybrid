# Fix Module Federation - Login App

## Problema Identificado

El error que experimentabas:
```
ScriptExternalLoadError: Loading script failed.
(missing: http://localhost:3001/dist/remoteEntry.js)
while loading "./App" from webpack/container/reference/loginApp
```

**Causa raíz**: Estabas mezclando dos enfoques incompatibles:

1. **Shell (Vite)**: Intentaba importar login usando alias de filesystem (`@apps/login`)
2. **Login (Webpack)**: Exponía módulos via Module Federation en puerto 3001

El problema es que **con Module Federation NO importas desde el filesystem**, sino que **cargas módulos remotos desde un servidor HTTP**.

### Diferencias clave con V2

En tu versión V2 con Vite, todo usaba **importación directa del filesystem**:

```js
// V2 - Vite con alias
const RemoteLogin = React.lazy(() => import('@apps/login/app/App.jsx'));
```

Con **Module Federation**, el enfoque es diferente:

```js
// V3 - Module Federation (carga desde HTTP)
const RemoteLogin = React.lazy(() => import('loginApp/App'));
```

## Cambios Realizados

### 1. Shell-Webpack - Configuración (`apps/shell-webpack/webpack.config.js`)

**Antes:**
```javascript
// En apps/shell-webpack/webpack.config.js
remotes: {
  // loginApp comentado o no configurado
}
```

**Después:**
```javascript
remotes: {
  loginApp: 'loginApp@http://localhost:3001/dist/remoteEntry.js', // ✅ Remote de Webpack
  // userApp: 'userApp@http://localhost:3003/dist/remoteEntry.js', // Temporalmente deshabilitado
}
```

### 2. Shell-Webpack - App.tsx (`apps/shell-webpack/src/App.tsx`)

**Antes:**
```tsx
// ❌ Intenta importar desde filesystem
const RemoteLogin = React.lazy(() => import('@apps/login/app/App.jsx'));
```

**Después:**
```tsx
// ✅ Importa desde remote de Module Federation
const RemoteLogin = React.lazy(() => 
  import('loginApp/App').catch(err => {
    console.error('Failed to load Login remote:', err);
    return { default: () => <div>❌ Error loading Login module</div> };
  })
);
```

### 3. Login - Nuevo archivo App.jsx (`apps/login/src/app/App.jsx`)

**Problema**: `index.js` hacía `render()` directo al DOM, no exportaba un componente.

**Solución**: Crear `App.jsx` que:
- Exporta un componente React
- Inicializa la app en `useEffect` (evita múltiples inicializaciones)
- Es consumible tanto standalone como desde shell

```jsx
const App = () => {
    React.useEffect(() => {
        initializeApp(); // Solo se ejecuta una vez
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={CvMuiTheme}>
                <Controller />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
```

### 4. Login - Webpack config (`apps/login/webpack.config.js`)

**Cambios:**
```js
// ModuleFederationPlugin - exponer App.jsx
exposes: {
    './App': './src/app/App.jsx', // ✅ Antes: './src/app/index.js'
}

// Babel loader - procesar .jsx
test : /\.(js|jsx)$/, // ✅ Antes: /\.js$/

// Resolver extensiones
resolve: {
    extensions: ['.js', '.jsx', '.json']
}
```

## Arquitectura Final

**Nota**: Este proyecto usa `apps/shell-webpack` como shell principal (no `apps/shell` que usa Vite).

```
┌─────────────────────────────────────────────┐
│  Shell-Webpack (localhost:3000)             │
│  ┌───────────────────────────────────────┐  │
│  │  webpack.config.js                    │  │
│  │  remotes: {                           │  │
│  │    loginApp: 'localhost:3001/...'     │  │
│  │    userApp: 'localhost:3003/...'      │  │
│  │  }                                    │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  import('loginApp/App') ────────────────┐   │
│  import('userApp/App') ──────────────┐  │   │
└──────────────────────────────────────│─│───┘
                                       │ │
                  ┌────────────────────┘ │
                  │  HTTP                │
                  ▼                      │
┌─────────────────────────────────┐     │
│ Login (Webpack - localhost:3001)│     │
│ ModuleFederationPlugin          │     │
│ exposes: { './App': './App.jsx'}│     │
│ remoteEntry.js                  │     │
└─────────────────────────────────┘     │
                                        │
                  ┌─────────────────────┘
                  │  HTTP
                  ▼
┌─────────────────────────────────┐
│ User (Webpack - localhost:3003) │
│ ModuleFederationPlugin          │
│ exposes: { './App': './App.jsx'}│
│ remoteEntry.js                  │
└─────────────────────────────────┘
```

## Cómo Probar

### 1. Reiniciar Login (Webpack)
```bash
cd apps/login
npm run serve
```

Verifica que esté accesible:
```bash
curl -I http://localhost:3001/dist/remoteEntry.js
# Debe retornar 200 OK
```

### 2. Reiniciar Shell-Webpack
```bash
cd apps/shell-webpack
npm run dev
```

### 3. Probar en el navegador
1. Abrir `http://localhost:5000`
2. Hacer clic en "🔐 Login" en la navegación
3. La app login debería cargar **sin errores**

### 4. Verificar en DevTools

**Console**: No debe haber errores de `ScriptExternalLoadError`

**Network**: Debe aparecer:
```
remoteEntry.js    200 OK    localhost:3001/dist/
```

**Sources**: Debe aparecer:
```
webpack://loginApp/
  └── ./src/app/App.jsx
```

## Troubleshooting

### Error: "Cannot read properties of undefined (reading 'apiSubdomain')"
- **Causa**: Configuración de login no inicializada
- **Solución**: Ejecutar `npm run setup` en la app login

### Error: "Failed to fetch"
- **Causa**: Servidor login no está corriendo
- **Solución**: Ejecutar `npm run serve` en login

### Error: "Uncaught SyntaxError"
- **Causa**: remoteEntry.js corrupto o no generado
- **Solución**: 
  1. Detener el servidor
  2. Borrar `apps/login/build/`
  3. Reiniciar con `npm run serve`

### Login se carga pero tiene errores internos
- **Causa**: App intenta acceder al DOM directamente
- **Solución**: Verificar que `App.jsx` esté siendo usado (no `index.js`)

## Próximos Pasos

1. ✅ **Completado**: Configurar Module Federation para login
2. ⏳ **Pendiente**: Verificar que user app funcione similar
3. ⏳ **Pendiente**: Configurar product app con Module Federation
4. ⏳ **Pendiente**: Implementar manejo de routing entre apps
5. ⏳ **Pendiente**: Configurar shared state management (zustand)

## Notas Técnicas

### ¿Por qué no usar alias de filesystem con Module Federation?

Module Federation está diseñado para:
- **Cargar código en runtime** desde servidores remotos
- **Compartir dependencias** entre apps (singleton)
- **Deploy independiente** de cada micro-frontend

Los alias de filesystem son para **build-time imports**, no runtime.

### ¿Cuándo usar cada enfoque?

**Alias de filesystem** (como en V2):
- Monorepo donde todo se compila junto
- Desarrollo más simple
- No requiere múltiples servidores

**Module Federation**:
- Micro-frontends verdaderamente independientes
- Deploy separado de cada app
- Equipos trabajando en apps diferentes
- Carga lazy de módulos bajo demanda

## Referencias

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [@originjs/vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)
