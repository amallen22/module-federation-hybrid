# 🚀 Micro-Frontend Architecture
## Con Module Federation y Vite

---

# 📦 Estructura del Proyecto

```ascii
cv-hibrid/
├── 📱 apps/
│   ├── 🏠 shell/
│   └── 🛍️ product/
├── 📚 packages/
│   └── 🎨 ui/
└── 📝 pnpm-workspace.yaml
```


### 🛠️ Stack Tecnológico

**Core**
- ⚛️ React
- 📦 Module Federation
- 🔷 TypeScript
- 🔧 Vite

**Herramientas**
- 📦 pnpm Workspaces
- 🔄 Hot Module Replacement
- 🎨 UI Kit compartido
- 🔗 Dynamic Imports


# 🚀 Inicio Rápido

```bash
# Instalar pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Clonar e instalar
git clone git@github.com:amallen22/module-federation-hybrid.git cv-hibrid
cd cv-hibrid
pnpm install

# Desarrollo
pnpm run dev
```


### 🔌 Module Federation

```typescript
// Shell Config
federation({
  name: 'shell',
  remotes: {
    product: 'http://localhost:5001/assets/remoteEntry.js',
    ui: 'http://localhost:5002/assets/remoteEntry.js'
  }
})
```


### 🎯 Puertos y Servicios

**Development (pnpm dev)**
- 🏠 Shell: :5000
- 🛍️ Product: :5001
- 🎨 UI Kit: :5002
- 🔐 Login: :5003
- 👤 User: :5004
- 📋 Migration Plan: :5006

**Docker Staging** (testing pre-deploy)
- 🐳 Todos los servicios: http://localhost:8080
- 📚 [Ver guía completa](./DOCKER_STAGING_README.md)

**Características**
- 🔄 Hot Reload
- 🔍 Source Maps
- 📱 Responsive
- 🔒 Type Safe


### 💡 Características Clave

**Arquitectura**
- 🏗️ Micro-Frontends
- 🔌 Module Federation
- 📦 Componentes Compartidos (ui)
- 🔄 Lazy Loading

**Desarrollo**
- 👥 Multi-equipo
- 🚀 Despliegue Independiente
- 🔍 Código tipado
- 🎨 UI Consistente


### 📱 Ejemplo de Uso

```typescript
// En Shell App.tsx
import React, { Suspense } from 'react';

const RemoteButton = React.lazy(() => import('ui/Button'));
const RemoteProduct = React.lazy(() => import('product/App'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <RemoteProduct />
  );
}
```

### 🔄 Flujo de Desarrollo

1. 📝 Desarrollo en módulos independientes
2. 🔄 Build automático con watch
3. 🔌 Integración dinámica de módulos
4. 🚀 Despliegues independientes



### 📈 Escalabilidad

**Actual**
- 🏠 Shell App
- 🛍️ Product Module
- 🎨 UI Kit

**Futuro**
- 👤 User Module
- 🛒 Payment Module
- 📊 Analytics
- 🔐 Auth Module
- 🏪​ Store Module
- 🧲 Error logs Module


### 📚 Documentación del Proyecto

**Plan de Migración y Estimaciones**:
- 📋 [Plan de Migración Completo](./plan_migracion.md) - Plan técnico detallado de todas las fases
- 📊 [Estimaciones Actualizadas](./docs/estimaciones-actualizadas.md) - Análisis de tiempos y costes (con y sin IA)
- 🤖 [Comparación Desarrollo IA vs Tradicional](./docs/comparacion-desarrollo-con-sin-ia.md) - Análisis visual comparativo
- 🚀 [Guía de Inicio con Cursor AI](./docs/guia-inicio-cursor-ai.md) - Training y best practices para el equipo
- 📄 [Resumen Ejecutivo para Stakeholders](./docs/resumen-ejecutivo-stakeholders.md) - Propuesta de 1 página

**Docker y Deployment**:
- 🐳 [Entorno Docker Staging](./DOCKER_STAGING_README.md) - Testing/staging local
- 📖 [Guía Completa Docker](./docs/docker-staging-guide.md) - Documentación exhaustiva

**Otras Referencias**:
- 🌍 [Soluciones de i18n](./docs/i18n-solutions.md)
- 🎨 [Plan de Eliminación de MUI](./docs/plan-eliminar-mui.md)

### ⚡ Desarrollo con Cursor AI (RECOMENDADO)

**Timeline Acelerado**: 6 meses (vs 12 meses tradicional)  
**Ahorro**: $90,000 + 10 meses de tiempo  
**ROI**: 375x retorno de inversión

**Hitos con IA**:
- ✅ Enero 2025: UI Kit completo
- 🎯 Mayo 2025: Apps principales en producción
- 🎯 Agosto 2025: Editor migrado - **PROYECTO COMPLETO**

Ver [comparación detallada](./docs/comparacion-desarrollo-con-sin-ia.md) para más información.

### 🤖 Comandos de Cursor AI

Hemos configurado comandos automatizados para facilitar el desarrollo:

**Comandos principales**:
- `test and build all` - Pipeline completo (tests + build + E2E)
- `quick check` - Verificación rápida antes de commits
- `run ci pipeline` - Simula CI/CD completo
- `test watch` - Tests en modo watch para TDD

**Ver documentación completa**:
- 📚 [Guía completa de comandos](./.cursor/CURSOR_COMMANDS.md)
- ⚡ [Quick Reference](./.cursor/QUICK_REFERENCE.md)

**Scripts de pnpm**:
```bash
# Desarrollo
pnpm dev               # Dev servers (todos)
pnpm dev:minimal       # Dev servers (mínimos)

# Testing
pnpm test              # Tests unitarios
pnpm test:e2e          # Tests E2E
pnpm test:coverage     # Coverage report

# Build
pnpm build:all         # Build todas las apps
pnpm ci                # Pipeline CI completo

# Docker Staging (via Makefile)
make docker-setup      # Setup completo
make docker-start      # Iniciar staging
make docker-stop       # Detener staging
make docker-logs       # Ver logs
```

### 🎯 Próximos Pasos

1. ✅ Aprobar desarrollo con Cursor AI (ver [propuesta](./docs/resumen-ejecutivo-stakeholders.md))
2. 🤖 Adquirir licencias Cursor AI ($240 total)
3. 🎓 Training del equipo (1 semana)
4. 🚀 Iniciar Fase 1: UI Kit
5. 🧪 Testing continuo con `test watch`
6. 🔍 Testing E2E con Playwright
7. 📊 Monitorización y métricas
8. 🚀 CI/CD Pipeline optimizado
