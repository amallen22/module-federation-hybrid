# ✅ Checklist de Pruebas - Migration Plan con HashRouter

**Servidor Preview**: http://localhost:5006  
**Fecha**: 18 Diciembre 2025  
**Build**: Producción optimizado (416 KB)

---

## 🌐 Abrir en Navegador

### 1. URL Principal
```
http://localhost:5006/
```

**Esperado**:
- ✅ Carga la página principal
- ✅ Redirige automáticamente a `http://localhost:5006/#/contexto`
- ✅ Se ve el menú de navegación a la izquierda
- ✅ Se ve el contenido "Contexto General" en el centro
- ✅ Estilos aplicados correctamente
- ✅ Sin errores en la consola del navegador (F12)

---

## 🧪 Pruebas de Navegación

### 2. Probar cada ruta manualmente

Copiar y pegar cada URL en el navegador:

#### a) Contexto General
```
http://localhost:5006/#/contexto
```
- [ ] Carga correctamente
- [ ] Se ve el título "Contexto General"
- [ ] Menú de navegación activo en "Contexto"

#### b) Estimación
```
http://localhost:5006/#/estimacion
```
- [ ] Carga correctamente
- [ ] Se ve comparativa "Tradicional vs Cursor AI"
- [ ] Se ven las tarjetas de fase con duraciones
- [ ] Gráfico visual de tiempos visible

#### c) Fase 1
```
http://localhost:5006/#/fase1
```
- [ ] Carga correctamente
- [ ] Se ve título "Fase 1: Desbloqueo del Stack"
- [ ] Duración: "3-4 semanas (con Cursor AI)"
- [ ] Tarjetas de tareas visibles

#### d) Fase 2
```
http://localhost:5006/#/fase2
```
- [ ] Carga correctamente
- [ ] Se ve título "Fase 2: Migración de Microservicios"
- [ ] Duración: "8-10 semanas"
- [ ] Aplicaciones listadas (login, user, shop, etc.)

#### e) Fase 3
```
http://localhost:5006/#/fase3
```
- [ ] Carga correctamente
- [ ] Se ve título "Fase 3: Testing y Optimización"
- [ ] Duración: "8-10 semanas"
- [ ] Tareas de testing listadas

#### f) Riesgos
```
http://localhost:5006/#/riesgos
```
- [ ] Carga correctamente
- [ ] Se ven tarjetas de riesgos
- [ ] Tabla o lista de mitigación visible

#### g) Hitos
```
http://localhost:5006/#/hitos
```
- [ ] Carga correctamente
- [ ] Timeline o lista de hitos visible

#### h) Métricas
```
http://localhost:5006/#/metricas
```
- [ ] Carga correctamente
- [ ] KPIs o métricas visibles

---

## 🖱️ Pruebas de Interacción

### 3. Navegación con menú

- [ ] Click en cada item del menú de navegación
- [ ] Cada click cambia la URL (aparece el `#/ruta`)
- [ ] Cada click cambia el contenido
- [ ] Item activo se resalta en el menú

### 4. Botón "Atrás" del navegador

- [ ] Navegar a varias páginas usando el menú
- [ ] Presionar botón "Atrás" del navegador
- [ ] Vuelve a la página anterior correctamente
- [ ] URL actualiza con el hash correcto

### 5. Refresh de página (F5)

- [ ] Navegar a cualquier ruta (ej: `#/fase1`)
- [ ] Presionar F5 (refresh)
- [ ] La página recarga correctamente
- [ ] Permanece en la misma ruta (no va al inicio)

### 6. Hard Refresh (Ctrl+F5 o Cmd+Shift+R)

- [ ] Navegar a cualquier ruta
- [ ] Hacer hard refresh (Ctrl+F5)
- [ ] La página recarga sin errores
- [ ] Assets se cargan correctamente

### 7. Copiar/Pegar URL

- [ ] Navegar a una página (ej: `#/estimacion`)
- [ ] Copiar la URL completa de la barra de direcciones
- [ ] Abrir nueva pestaña
- [ ] Pegar la URL
- [ ] La página carga directamente en esa ruta

---

## 🎨 Pruebas de Estilos

### 8. Verificar estilos

- [ ] Colores correctos (azul, verde, gris)
- [ ] Fuentes legibles (Roboto)
- [ ] Espaciado consistente
- [ ] Tarjetas con bordes redondeados
- [ ] Badges de estado con colores
- [ ] Hover effects en botones/links

### 9. Responsive (opcional)

- [ ] Abrir DevTools (F12)
- [ ] Cambiar a vista mobile (Toggle device toolbar)
- [ ] Verificar que se adapta al tamaño
- [ ] Menú de navegación funciona en mobile

---

## 🔍 Pruebas de Consola

### 10. Verificar errores JavaScript

1. Abrir DevTools (F12)
2. Ir a pestaña "Console"
3. Navegar por todas las páginas

**Esperado**:
- [ ] ✅ Sin errores rojos
- [ ] ✅ Sin warnings críticos
- [ ] ✅ Puede haber logs de desarrollo (normales)

### 11. Verificar Network (Assets)

1. Abrir DevTools (F12)
2. Ir a pestaña "Network"
3. Refrescar página (F5)
4. Ver lista de archivos cargados

**Verificar**:
- [ ] ✅ `index.html` - 200 OK
- [ ] ✅ `App-fCx2EV6F.css` - 200 OK
- [ ] ✅ `index-DgCXLs4A.js` - 200 OK
- [ ] ✅ `App-Mo01NZhc.js` - 200 OK
- [ ] ✅ Todos los assets con status 200
- [ ] ✅ Sin archivos 404

### 12. Verificar Cache Headers (Preview no aplica en S3)

Esto se verificará cuando esté en S3, pero por ahora:

- [ ] Los assets JS/CSS se cargan correctamente
- [ ] No hay errores de CORS

---

## 🚨 Pruebas de Edge Cases

### 13. Ruta inexistente

```
http://localhost:5006/#/ruta-que-no-existe
```

**Esperado**:
- [ ] Puede mostrar página en blanco (sin crash)
- [ ] O redirige a la ruta por defecto
- [ ] Sin errores JavaScript críticos

### 14. URL sin hash

```
http://localhost:5006/
```

**Esperado**:
- [ ] Redirige automáticamente a `#/contexto`
- [ ] Página carga correctamente

### 15. Hash vacío

```
http://localhost:5006/#/
```

**Esperado**:
- [ ] Redirige a `#/contexto` (ruta por defecto)
- [ ] Página carga correctamente

---

## 📊 Performance (Opcional)

### 16. Lighthouse Audit (Chrome)

1. Abrir DevTools (F12)
2. Ir a pestaña "Lighthouse"
3. Click "Generate report"
4. Seleccionar "Performance"

**Esperado**:
- [ ] Performance: > 80
- [ ] First Contentful Paint: < 2s
- [ ] Largest Contentful Paint: < 2.5s
- [ ] Time to Interactive: < 3.5s

---

## ✅ Verificación Final

### 17. Checklist de aprobación

- [ ] ✅ Todas las rutas cargan correctamente
- [ ] ✅ Navegación funciona (menú + browser back/forward)
- [ ] ✅ Refresh mantiene la ruta actual
- [ ] ✅ Assets estáticos se cargan (CSS, JS)
- [ ] ✅ Sin errores en consola
- [ ] ✅ Estilos se aplican correctamente
- [ ] ✅ URLs con hash (#/) funcionan
- [ ] ✅ Copiar/pegar URLs funciona
- [ ] ✅ Ready para deploy a S3

---

## 🐛 Reporte de Issues

Si encuentras algún problema, anota:

1. **URL problemática**: 
2. **Qué esperabas**: 
3. **Qué pasó**: 
4. **Errores en consola**: 
5. **Screenshot** (si aplica):

---

## 📸 Screenshots Recomendados

Para documentación, toma screenshots de:

- [ ] Homepage (#/contexto)
- [ ] Estimación (#/estimacion) - comparativa
- [ ] Fase 1 (#/fase1)
- [ ] Fase 2 (#/fase2)
- [ ] Network tab (mostrando assets con 200 OK)
- [ ] Console tab (sin errores)

---

## 🎉 Si Todo Pasa

**¡La aplicación está lista para S3!** 

Siguiente paso:
1. Compartir este checklist con el equipo
2. DevOps crear ticket usando `JIRA_TICKET_DEVOPS.md`
3. DevOps configurar S3 bucket
4. Deploy inicial a S3
5. Repetir estas pruebas en la URL final de S3

---

**URL de preview**: http://localhost:5006  
**Estado**: 🧪 EN TESTING  
**Tester**: [Tu nombre]  
**Fecha**: 18 Diciembre 2025


