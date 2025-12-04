# Troubleshooting - Errores en Consola del Navegador

## Errores Comunes y Soluciones

### 1. Error: "Failed to fetch dynamically imported module"
**Causa**: Module Federation no puede cargar el módulo remoto
**Solución**: 
- Verificar que login esté corriendo en puerto 5003
- Verificar CORS en ambos servidores
- Limpiar caché del navegador (Ctrl+Shift+R)

### 2. Error: "Cannot find module '@packages/ui'"
**Causa**: El alias no está resuelto correctamente
**Solución**: Ya configurado en `vite.config.ts`. Si persiste:
```bash
# Reinstalar dependencias
cd apps/login && pnpm install
```

### 3. Error: "APP_CONFIG is undefined"
**Causa**: El archivo de configuración no se generó
**Solución**:
```bash
pnpm --filter login run setup
```

### 4. Error: "The JSX syntax extension is not currently enabled"
**Causa**: Archivos .js con JSX no se procesan
**Solución**: Ya configurado. Si persiste, verificar que el archivo esté en `src/`

### 5. Error: "Cannot read property 'clientId' of undefined"
**Causa**: APP_CONFIG.googleLoginConfig es undefined
**Solución**: Verificar que `config.json` tenga la estructura correcta

### 6. Error: "SocialButtonsInline is not a function"
**Causa**: Problema con el export/import
**Solución**: Ya creado `index.ts` para facilitar imports

### 7. Error: "CircularProgress is not defined"
**Causa**: El componente CircularProgress no se importó
**Solución**: Ya migrado a componente custom con Sass

## Verificación Rápida

1. Abrir DevTools (F12)
2. Ir a la pestaña Console
3. Buscar errores en rojo
4. Copiar el mensaje de error completo
5. Revisar la pestaña Network para ver si hay requests fallidos

## Comandos Útiles

```bash
# Ver logs del servidor login
pnpm --filter login dev

# Verificar que remoteEntry esté disponible
curl http://localhost:5003/remoteEntry.js

# Limpiar y reinstalar
cd apps/login && rm -rf node_modules && pnpm install
```

