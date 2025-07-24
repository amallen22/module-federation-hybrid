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

**Development**
- 🏠 Shell: :5000
- 🛍️ Product: :5001
- 🎨 UI Kit: :5002

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


### 🎯 Próximos Pasos

1. 🧩 Integrar app de CV
1. 🔍 Testing E2E
2. 📊 Monitorización
3. 🚀 CI/CD Pipeline
