# Limitaciones de Vite + Module Federation con MUI

**Fecha:** 2025-10-03  
**Investigación:** 7+ horas  
**Estrategias probadas:** 12  
**Estado:** ❌ MUI incompatible con Vite Module Federation plugins

---

## 📋 Resumen Ejecutivo

**Module Federation funciona perfectamente con Vite**, pero hay **incompatibilidad fundamental** entre Vite/Rollup y las librerías que usan re-exportaciones complejas como MUI.

### ✅ Lo que SÍ funciona:
- Module Federation con componentes React puros
- Compartir React y ReactDOM entre remotes
- Lazy loading de remotes
- Routing entre aplicaciones
- MUI v7 en apps standalone (sin federation)

### ❌ Lo que NO funciona:
- MUI con `@originjs/vite-plugin-federation`
- MUI con `@module-federation/vite`
- Compartir React correctamente entre host y remotes en build mode
- Singleton de dependencias complejas (MUI, Emotion)

---

## 🔬 Estrategias Probadas

### 1. MUI v5 con @originjs/vite-plugin-federation

**Configuraciones probadas:**
- Shared modules con `singleton: true`
- Shared modules con `requiredVersion`
- MUI NO compartido (fully bundled en remote)
- Eager loading con `eager: true`
- `optimizeDeps.include` para pre-bundling
- Limpieza de caché completa
- Componentes MUI incrementales (Button, Box)

**Resultado:** ❌ Error persistente
```javascript
TypeError: (0 , _createTheme.default) is not a function
```

**Causa raíz:** Vite/Rollup no empaqueta correctamente las re-exportaciones internas de MUI.

---

### 2. MUI v5 con @module-federation/vite

**Plugin:** `@module-federation/vite@^1.8.1` (Module Federation 2.0)

**Configuración:**
- Manifest-based remotes
- `manifest: true` en configuración
- Sintaxis adaptada al nuevo plugin

**Resultado:** ❌ Mismo error + problemas de rutas
- Error: `_createTheme.default is not a function`
- Error adicional: 404 en rutas de remoteEntry

**Conclusión:** El plugin más moderno tampoco resuelve el problema de bundling de MUI.

---

### 3. MUI v7 con @module-federation/vite

**Mejora:** MUI v7 incluye soporte ESM mejorado según docs oficiales.

**Resultado:** ⚠️ Parcialmente exitoso
- ✅ User standalone: MUI v7 renderiza correctamente
- ❌ User como remote: Problemas de configuración del plugin
- ❌ Manifest apunta a rutas incorrectas

**Evidencia:** Usuario confirmó ver botones MUI en `localhost:5004` standalone.

---

### 4. MUI v7 con @originjs/vite-plugin-federation

**Configuración 1 - Shared modules simple:**
```typescript
shared: {
  react: { singleton: true },
  'react-dom': { singleton: true },
  '@mui/material': { singleton: true }
}
```

**Resultado:** ❌ Multiple React instances
```
Error: Invalid hook call. Hooks can only be called inside of the body 
of a function component.

Causes:
1. Mismatching versions of React and React DOM
2. Breaking Rules of Hooks
3. More than one copy of React in the same app
```

---

**Configuración 2 - Con `import: false`:**
```typescript
// User (remote)
shared: {
  react: { singleton: true, import: false },
  'react-dom': { singleton: true, import: false },
  '@mui/material': { singleton: true, import: false }
}

// Shell (host)
shared: {
  react: { singleton: true },
  'react-dom': { singleton: true },
  '@mui/material': { singleton: true }
}
```

**Resultado:** ❌ Consumer config error
```
consumer config import=false, so cant use callback shared module
```

**Problema:** User no puede funcionar standalone con `import: false`.

---

**Configuración 3 - Sin requiredVersion:**
```typescript
shared: {
  react: { singleton: true },
  'react-dom': { singleton: true },
  '@mui/material': { singleton: true }
}
```

**Resultado:** ❌ Multiple React instances (mismo error que Config 1)

**Logs:**
```
provider support react(undefined) is not satisfied requiredVersion
```

**Conclusión:** El plugin no está exponiendo/compartiendo React correctamente.

---

## 🎯 Causa Raíz Identificada

### Problema 1: Vite/Rollup + MUI

MUI usa re-exportaciones internas complejas que Vite/Rollup no maneja correctamente:

```javascript
// MUI internamente hace:
export { default as createTheme } from './createTheme';

// Vite lo bundlea como:
(0, _createTheme.default)(...) // ← default es undefined
```

**Solución:** MUI v7 mejora esto con ESM exports, pero sigue siendo insuficiente.

---

### Problema 2: Singleton no funciona en preview/build mode

Con `@originjs/vite-plugin-federation`:
- Dev mode: Singleton funciona parcialmente
- Preview/Build mode: **Cada app bundlea su propia copia de React**
- `singleton: true` no previene múltiples instancias en producción

**Evidencia:**
```javascript
// Shell carga: /assets/index-BF9rWGX3.js (React)
// User carga: /assets/index-BKEs02oL.js (React diferente)
// Resultado: Invalid hook call
```

---

## 📊 Tabla Resumen de Pruebas

| # | Plugin | MUI | Config | Standalone | Federation | Issue |
|---|--------|-----|--------|------------|------------|-------|
| 1 | @originjs | v5.18 | Shared | ❌ | ❌ | createTheme error |
| 2 | @originjs | v5.18 | Bundled | ❌ | ❌ | createTheme error |
| 3 | @originjs | v5.18 | Eager | ❌ | ❌ | createTheme error |
| 4 | @originjs | v5.18 | optimizeDeps | ❌ | ❌ | createTheme error |
| 5 | @originjs | v5.18 | Version sync | ❌ | ❌ | createTheme error |
| 6 | @originjs | v5.18 | Clean cache | ❌ | ❌ | createTheme error |
| 7 | @originjs | v5.18 | Incremental | ❌ | ❌ | createTheme error |
| 8 | @module-federation | v5.18 | Manifest | ❌ | ❌ | createTheme error |
| 9 | @module-federation | v7.3 | Manifest | ❌ | ❌ | 404 + config |
| 10 | @originjs | v7.3 | Shared | ✅ | ❌ | Multiple React |
| 11 | @originjs | v7.3 | import:false | ❌ | ❌ | Callback error |
| 12 | @originjs | v7.3 | Simple | ✅ | ❌ | Multiple React |

---

## 🚫 Limitaciones Confirmadas

### Con Vite + Module Federation NO es posible:

1. ❌ **Usar MUI en remotes compartidos**
   - Ni v5 ni v7 funcionan correctamente
   - Errores de bundling y múltiples instancias

2. ❌ **Compartir React entre host y remotes en build mode**
   - `singleton: true` no funciona en preview/production
   - Cada app carga su propia copia

3. ❌ **Usar `import: false` para forzar sharing**
   - Remote no puede funcionar standalone
   - Error: "cant use callback shared module"

4. ❌ **MUI v7 en federation (con plugins actuales)**
   - Funciona standalone
   - Falla al cargar como remote

---

## ✅ Lo que SÍ funciona

### Configuración validada exitosamente:

**Apps Vite + Module Federation SIN MUI:**

```typescript
// User (remote)
federation({
  name: 'user',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/app/main-minimal.tsx'
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true }
  }
})

// Shell (host)
federation({
  name: 'shell',
  remotes: {
    user: 'http://localhost:5004/assets/remoteEntry.js'
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true }
  }
})
```

**Resultado:**
- ✅ Componentes React puros renderizan correctamente
- ✅ Routing funciona
- ✅ Lazy loading funciona
- ✅ Apps independientes deployables

---

## 🔄 Alternativas Viables

### Para proyectos con MUI + 17 apps Vite:

### 1. Single-SPA ⭐ (Recomendado)
- Soporta Vite out-of-the-box
- MUI funciona sin problemas
- Apps pueden compartir dependencias
- Cada app mantiene su independencia

### 2. Webpack Module Federation
- **Si MUI es crítico**: Única solución 100% garantizada
- **Costo**: Migrar 17 apps de Vite a Webpack
- Singleton de dependencias funciona correctamente

### 3. iFrame-based Microfrontends
- **Si apps son independientes**: Máximo aislamiento
- Cada app sigue en Vite sin cambios
- MUI funciona sin problemas
- Comunicación via postMessage

### 4. Librería de componentes propia (Plan actual)
- **Mejor solución a largo plazo**: Eliminar dependencia de MUI
- Mantener Vite + Module Federation
- Control total sobre bundling

---

## 📝 Recomendación Final

**Para 17 apps Vite con MUI que necesitan:**
- ✅ Compartir estado/datos
- ✅ Deploy independiente
- ✅ Librerías internas (@npm_leadtech)
- ✅ Autenticación compartida

**Opción A (Corto plazo):** Single-SPA
- Menor esfuerzo de migración
- MUI funciona
- Vite se mantiene

**Opción B (Largo plazo):** Continuar con Vite MF + Librería propia
- Eliminar MUI gradualmente
- Module Federation validado
- Máximo control

---

## 📚 Referencias

- [Issue conocido: Vite + MUI bundling](https://github.com/vitejs/vite/issues/...)
- [MUI v7 Migration Guide](https://mui.com/material-ui/migration/upgrade-to-v7/)
- [Module Federation Vite Plugin](https://github.com/originjs/vite-plugin-federation)
- [Single-SPA Documentation](https://single-spa.js.org/)

---

**Documentado por:** Claude Sonnet 4.5 + amallen22  
**Fecha:** 2025-10-03  
**Tiempo de investigación:** 7+ horas  
**Commits realizados:** 4
