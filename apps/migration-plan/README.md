# Migration Plan - Web App

Aplicación web para visualizar el plan de migración del proyecto CV-Hibrid.

> **Nota**: Esta es una herramienta de **documentación interna**, no forma parte del producto final CV.

## 📋 Descripción

Aplicación SPA (Single Page Application) construida con React que presenta de forma visual e interactiva el plan completo de migración del proyecto CV-Hibrid desde arquitectura legacy a microservicios modernos.

### Páginas Incluidas

- **Contexto General** - Visión completa del proyecto y objetivos
- **Estimación** - Comparativa de tiempos tradicional vs Cursor AI
- **Fase 1** - Desbloqueo del Stack (3-4 semanas)
- **Fase 2** - Migración de Microservicios (8-10 semanas)
- **Fase 3** - Testing y Optimización (8-10 semanas)
- **Stack Técnico** - Arquitectura y tecnologías
- **Riesgos** - Análisis de riesgos y mitigación
- **Hitos** - Timeline y milestones
- **Métricas** - KPIs y medición de progreso

## 🚀 Stack Tecnológico

- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.7
- **Lenguaje**: TypeScript 5.8.3
- **Routing**: React Router DOM 6.30.1 (HashRouter para S3)
- **Estilos**: Sass 1.83.4
- **Module Federation**: @module-federation/vite 1.0.11

## 🛠️ Desarrollo Local

### Prerequisitos

- Node.js 18+ (recomendado 20 LTS)
- pnpm 9+

### Instalación

```bash
# Desde la raíz del monorepo
cd apps/migration-plan

# Instalar dependencias
pnpm install
```

### Scripts Disponibles

```bash
# Desarrollo (puerto 5006)
pnpm dev

# Build de producción
pnpm build
pnpm build:production  # Con optimizaciones completas

# Preview del build
pnpm preview

# Deploy a S3 (requiere AWS CLI configurado)
export S3_BUCKET=migration-plan-cv-hibrid
pnpm deploy:s3

# Build + Deploy
pnpm build:deploy
```

### URLs de Desarrollo

```
Local: http://localhost:5006
```

**Rutas disponibles**:
- `/#/` - Redirige a Contexto
- `/#/contexto` - Contexto General
- `/#/fase1` - Fase 1
- `/#/fase2` - Fase 2
- `/#/fase3` - Fase 3
- `/#/riesgos` - Riesgos
- `/#/estimacion` - Estimación
- `/#/hitos` - Hitos
- `/#/metricas` - Métricas

## 📦 Build de Producción

### Generar Build

```bash
pnpm build:production
```

**Salida**:
```
dist/
├── index.html                    # ~2 KB
├── assets/
│   ├── index-[hash].js          # ~250 KB (gzipped: ~60 KB)
│   ├── react-vendor-[hash].js   # ~140 KB (gzipped: ~45 KB)
│   ├── style-[hash].css         # ~17 KB (gzipped: ~4 KB)
│   └── ...
├── mf-manifest.json
└── remoteEntry.js
```

**Tamaño total**: ~700 KB uncompressed, ~160 KB gzipped

### Optimizaciones Aplicadas

- ✅ Minificación con Terser
- ✅ CSS code splitting
- ✅ Vendor chunk separation (React libs)
- ✅ Assets inlining < 4KB
- ✅ Tree shaking automático
- ✅ Base path relativo para flexibilidad

## 🌐 Deploy a S3

### Prerequisitos AWS

```bash
# AWS CLI instalado y configurado
aws --version

# Credenciales configuradas
aws configure list
```

### Deploy Automático

```bash
# 1. Configurar bucket name
export S3_BUCKET=migration-plan-cv-hibrid

# 2. Build + Deploy
pnpm build:deploy

# O en pasos separados:
pnpm build:production
pnpm deploy:s3
```

### Deploy Manual

```bash
# Build
pnpm build:production

# Subir a S3 con cache correcto
aws s3 sync dist/ s3://migration-plan-cv-hibrid/ \
  --delete \
  --cache-control 'max-age=31536000,public' \
  --exclude 'index.html'

# index.html sin cache
aws s3 cp dist/index.html s3://migration-plan-cv-hibrid/index.html \
  --cache-control 'max-age=0,no-cache,no-store,must-revalidate'
```

### Documentación Completa

Ver **[DEPLOY_S3.md](./DEPLOY_S3.md)** para:
- Configuración completa de S3
- Bucket policies
- Troubleshooting
- Validación post-deploy

### Ticket para DevOps

Ver **[JIRA_TICKET_DEVOPS.md](./JIRA_TICKET_DEVOPS.md)** para crear ticket en Jira con toda la información necesaria.

## 🏗️ Arquitectura

### Estructura de Archivos

```
migration-plan/
├── src/
│   ├── app/
│   │   ├── components/        # Componentes reutilizables
│   │   │   └── Layout/        # Layout principal con navegación
│   │   ├── pages/             # Páginas de la app
│   │   │   ├── ContextoGeneral/
│   │   │   ├── Estimacion/
│   │   │   ├── Fase1/
│   │   │   ├── Fase2/
│   │   │   ├── Fase3/
│   │   │   ├── Riesgos/
│   │   │   ├── Hitos/
│   │   │   └── Metricas/
│   │   ├── styles/            # Estilos globales
│   │   │   └── globals.scss
│   │   └── App.tsx            # Componente raíz con HashRouter
│   └── main.tsx               # Entry point
├── public/                    # Assets estáticos
├── dist/                      # Build output (generado)
├── vite.config.ts             # Configuración Vite
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies y scripts
├── CHANGELOG.md               # Historial de cambios
├── DEPLOY_S3.md              # Guía de deploy
├── JIRA_TICKET_DEVOPS.md     # Template ticket Jira
└── README.md                 # Este archivo
```

### HashRouter vs BrowserRouter

**¿Por qué HashRouter?**

Esta app usa `HashRouter` en lugar de `BrowserRouter` para permitir hosting estático simple en S3 sin necesidad de:
- Configuración de servidor
- Reglas de reescritura de URLs
- CloudFront con error pages
- Backend para manejar rutas

**URLs resultantes**:
```
✅ Con HashRouter (actual):
https://bucket.s3.amazonaws.com/#/fase1
https://bucket.s3.amazonaws.com/#/fase2

❌ Con BrowserRouter (requeriría servidor):
https://bucket.s3.amazonaws.com/fase1  (404 en S3 sin config)
```

**Trade-off aceptable**: Es documentación interna, el `#` en URLs no afecta la usabilidad.

## 🔧 Configuración

### Variables de Entorno

```bash
# Para deploy a S3
export S3_BUCKET=nombre-del-bucket

# Región (opcional, default: us-east-1)
export AWS_REGION=us-east-1
```

### Alias de Path

```typescript
// Alias configurados en vite.config.ts
'@' → './src/app'
'@packages/ui' → '../../packages/ui/src'
```

Uso:
```typescript
import { Button } from '@packages/ui';
import Layout from '@/components/Layout/Layout';
```

## 📊 Métricas de Build

### Tamaños

```
Total uncompressed: ~700 KB
Total gzipped: ~160 KB

Desglose:
- JavaScript: ~390 KB (gzipped: ~105 KB)
- React vendor: ~140 KB (gzipped: ~45 KB)
- CSS: ~17 KB (gzipped: ~4 KB)
- HTML: ~2 KB
```

### Performance

- **First Load**: < 2s (con buena conexión)
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+ (Performance)

## 🧪 Testing

Actualmente no hay tests configurados (es una app de documentación estática).

**Validación manual**:
- ✅ Navegación entre páginas funciona
- ✅ Estilos se aplican correctamente
- ✅ No hay errores en consola
- ✅ Responsive en mobile/tablet/desktop

## 📝 Mantenimiento

### Actualizar Contenido

1. Editar archivos en `src/app/pages/[Pagina]/[Pagina].tsx`
2. Build: `pnpm build:production`
3. Deploy: `pnpm deploy:s3`
4. Verificar en S3 URL
5. Actualizar `CHANGELOG.md`

### Agregar Nueva Página

1. Crear componente en `src/app/pages/NuevaPagina/`
2. Añadir ruta en `App.tsx`:
   ```typescript
   <Route path="nueva-pagina" element={<NuevaPagina />} />
   ```
3. Añadir link en `Layout/Layout.tsx` (menú de navegación)
4. Rebuild y redeploy

## 🐛 Troubleshooting

### Build falla

```bash
# Limpiar cache y reinstalar
rm -rf node_modules dist
pnpm install
pnpm build
```

### Deploy falla

```bash
# Verificar credenciales AWS
aws sts get-caller-identity

# Verificar bucket existe
aws s3 ls s3://migration-plan-cv-hibrid/

# Verificar permisos
aws s3api get-bucket-policy --bucket migration-plan-cv-hibrid
```

### Rutas no funcionan en S3

✅ **Solución**: Verificar que estás usando HashRouter (no BrowserRouter)

Las URLs deben tener `#`:
- ✅ Correcto: `https://.../#/fase1`
- ❌ Incorrecto: `https://.../fase1`

### Assets no cargan (404)

```bash
# Verificar base path en vite.config.ts
base: './'  # Debe ser relativo

# Rebuild completo
pnpm build:production
pnpm deploy:s3
```

## 📚 Documentación Relacionada

- **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios y versiones
- **[DEPLOY_S3.md](./DEPLOY_S3.md)** - Guía completa de deploy a AWS S3
- **[JIRA_TICKET_DEVOPS.md](./JIRA_TICKET_DEVOPS.md)** - Template para ticket de DevOps
- **[../../readme.md](../../readme.md)** - README principal del proyecto CV-Hibrid
- **[../../plan_migracion.md](../../plan_migracion.md)** - Plan de migración completo

## 🤝 Contribuir

Esta app es parte del proyecto CV-Hibrid. Para contribuir:

1. Crear rama desde `migration-plan`
2. Hacer cambios y commit
3. Actualizar `CHANGELOG.md`
4. Push y crear PR
5. Revisión por tech lead
6. Merge y deploy

## 📞 Soporte

- **Equipo**: CV-Hibrid Development Team
- **Slack**: #cv-hibrid-dev
- **Email**: dev-team@company.com
- **Repositorio**: github.com:amallen22/module-federation-hybrid.git

## 📄 Licencia

Proyecto interno - Todos los derechos reservados.

---

**Última actualización**: Diciembre 2025  
**Versión**: 1.2.0


