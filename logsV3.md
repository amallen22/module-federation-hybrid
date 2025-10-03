# Logs V3 - Roadmap de Migración: Webpack MF → Vite MF

**Fecha de inicio:** 2025-10-03  
**Objetivo final:** 17 apps Vite + Module Federation + Zustand + Sin MUI  
**Estrategia:** Migración gradual en 3 fases  
**Duración estimada:** 12-18 meses

---

## 📊 Estado Actual del Proyecto

### Inventario de Aplicaciones (17 apps)

| App | Webpack | MUI | Estado |
|-----|---------|-----|--------|
| cv-app-backoffice-balancer | No info | v5.0.0 | ⚠️ Revisar |
| cv-app-backoffice-login | No info | ❌ | ⚠️ Revisar |
| cv-app-crm | v4.41.2 | ❌ | 🔴 Upgrade needed |
| cv-app-editor | v4.41.2 | ❌ | 🔴 Upgrade needed |
| cv-app-login | v5.90.3 | v5.13.4 | 🟢 Ready |
| cv-app-payment | v5.90.3 | v5.13.4 | 🟢 Ready |
| cv-app-payment-amazonpay-3ds | v4.41.2 | ❌ | 🔴 Upgrade needed |
| cv-app-payment-ingenico | v4.41.2 | ❌ | 🔴 Upgrade needed |
| cv-app-payment-macropay | v4.41.2 | ❌ | 🔴 Upgrade needed |
| cv-app-payment-nmi | v4.41.2 | ❌ | 🔴 Upgrade needed |
| cv-app-payment-paddle | v4.41.2 | ❌ | 🔴 Upgrade needed |
| cv-app-payment-worldpay | v4.41.2 | ❌ | 🔴 Upgrade needed |
| cv-app-share | v5.90.3 | v5.13.4 | 🟢 Ready |
| cv-app-shop | v5.90.3 | v5.15.15 | 🟢 Ready |
| cv-app-thankyou | v5.90.3 | v5.15.15 | 🟢 Ready |
| cv-app-user | v5.90.3 | v5.13.4 | 🟢 Ready |
| rj-app-crm | Webpack 4 | ❌ | 🔴 Upgrade needed |

**Resumen:**
- 🟢 **Webpack 5 (9 apps):** Listas para Module Federation
- 🔴 **Webpack 4 (8 apps):** Requieren upgrade primero
- **Apps con MUI:** 7 de 17
- **Apps sin MUI:** 10 de 17 (ventaja para migración)

### Problemas Actuales Identificados

1. **Aislamiento extremo:**
   - Apps usan cookies para compartir datos (límite 4KB)
   - No hay estado compartido
   - Duplicación de llamadas API
   - Deuda técnica acumulada

2. **Redux en múltiples apps:**
   - Código duplicado
   - Complejidad innecesaria
   - Difícil de mantener

3. **Builds lentos (Webpack):**
   - Tiempos de build largos
   - Deploy lento a producción
   - DX subóptimo

4. **MUI vendor lock-in:**
   - Dependencia externa crítica
   - Problemas de bundling
   - Performance no óptima

---

## 🎯 Visión y Objetivos

### Visión Final (12-18 meses)

```
┌─────────────────────────────────────────────┐
│              Shell (Vite)                   │
│  - Module Federation Host                   │
│  - Zustand Global Store                     │
│  - Router Orquestador                       │
│  - @npm_leadtech/ui-components              │
└─────────────────────────────────────────────┘
                     │
    ┌────────────────┼────────────────┐
    │                │                │
┌───▼────┐      ┌───▼────┐      ┌───▼────┐
│ Login  │      │ Editor │      │  User  │
│ (Vite) │      │ (Vite) │      │ (Vite) │
│   MF   │      │   MF   │      │   MF   │
└────────┘      └────────┘      └────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌───▼────┐            ┌─────▼──┐
    │Payment │   ...x13   │  Shop  │
    │ (Vite) │            │ (Vite) │
    └────────┘            └────────┘
                     │
         Zustand Shared State
    (Reemplaza Redux + Cookies)
```

### Objetivos Clave

1. ✅ **Conectividad:** 17 apps comunicándose vía Module Federation
2. ✅ **Estado compartido:** Zustand reemplaza cookies + Redux
3. ✅ **Deploy independiente:** Cada app se puede subir por separado
4. ✅ **Builds rápidos:** Vite 10x más rápido que Webpack
5. ✅ **Sin vendor lock-in:** Librería propia de componentes
6. ✅ **Type-safe:** TypeScript en todo el stack
7. ✅ **DX mejorado:** HMR instantáneo, mejor tooling

---

## 🗺️ Roadmap General

### Fase 1: Foundation - Webpack Module Federation
**Duración:** 1-2 meses  
**Q1 2025**

**Objetivo:** Conectar las 17 apps con Module Federation manteniendo Webpack

**Hitos:**
- ✅ Shell Webpack 5 + Module Federation configurado
- ✅ 9 apps Webpack 5 conectadas
- ✅ 8 apps migradas de Webpack 4 → 5
- ✅ Zustand global implementado
- ✅ Cookies eliminadas
- ✅ Redux deprecado (no eliminado aún)

---

### Fase 2: Component Library - Eliminar MUI
**Duración:** 3-6 meses  
**Q2-Q3 2025**

**Objetivo:** Crear librería propia y eliminar dependencia de MUI

**Hitos:**
- ✅ Design System diseñado
- ✅ @npm_leadtech/ui-components publicado
- ✅ 7 apps migradas de MUI → ui-components
- ✅ MUI completamente eliminado
- ✅ Componentes optimizados para Vite

---

### Fase 3: Vite Migration - Stack Moderno
**Duración:** 3-6 meses  
**Q4 2025 - Q1 2026**

**Objetivo:** Migrar todas las apps a Vite

**Hitos:**
- ✅ Shell migrado a Vite
- ✅ 17 apps migradas a Vite
- ✅ Module Federation funcionando con Vite
- ✅ Builds 10x más rápidos
- ✅ Redux completamente eliminado

---

## 📋 FASE 1: Webpack Module Federation

**Duración:** 1-2 meses  
**Inicio:** Q1 2025  
**Estado:** 🔵 PLANIFICACIÓN

### Objetivo de la Fase

Establecer la arquitectura de Module Federation con Webpack como base temporal, conectar las 17 apps, implementar Zustand para estado compartido y eliminar el uso de cookies.

### Pre-requisitos

- [x] Inventario de apps completado
- [x] Análisis de dependencias realizado
- [x] Limitaciones de Vite + MUI documentadas
- [ ] Plan de comunicación al equipo
- [ ] Rama feature/webpack-mf creada

---

## Tareas Fase 1

### 1.1 - Crear Shell Application (Semana 1)

**Objetivo:** Crear aplicación Shell que será el host de Module Federation

**Acciones:**

#### 1.1.1 - Setup inicial del proyecto
```bash
# En cv-apps/cv-hibrid/apps/
mkdir shell-webpack
cd shell-webpack
npm init -y
```

**Dependencias a instalar:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "webpack": "^5.90.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0",
    "@babel/core": "^7.23.0",
    "@babel/preset-react": "^7.23.0",
    "@babel/preset-typescript": "^7.23.0",
    "babel-loader": "^9.1.0",
    "html-webpack-plugin": "^5.6.0",
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

#### 1.1.2 - Configurar Webpack con Module Federation
**Archivo:** `webpack.config.js`

```javascript
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        // Se agregarán en tareas posteriores
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        'react-router-dom': { singleton: true },
        zustand: { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

#### 1.1.3 - Estructura de carpetas inicial
```
shell-webpack/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   ├── stores/
│   │   └── globalStore.ts
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── Navigation.tsx
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
└── webpack.config.js
```

**Checklist 1.1:**
- [ ] Proyecto shell-webpack creado
- [ ] Dependencias instaladas
- [ ] webpack.config.js configurado
- [ ] Estructura de carpetas creada
- [ ] Build dev funciona (`npm run dev`)
- [ ] App carga en localhost:3000

**Tiempo estimado:** 1-2 días

---

### 1.2 - Implementar Zustand Global Store (Semana 1)

**Objetivo:** Crear store global que reemplazará cookies y Redux

**Archivo:** `src/stores/globalStore.ts`

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Tipos
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface SessionData {
  token?: string;
  refreshToken?: string;
  expiresAt?: number;
  [key: string]: any;
}

interface GlobalState {
  // Usuario
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  
  // Sesión (reemplaza cookies)
  sessionData: SessionData;
  setSessionData: (key: string, value: any) => void;
  clearSession: () => void;
  
  // App activa
  activeApp: string;
  setActiveApp: (app: string) => void;
  
  // Datos compartidos entre apps
  sharedData: Record<string, any>;
  updateSharedData: (data: Record<string, any>) => void;
  clearSharedData: (key?: string) => void;
  
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Notificaciones globales
  notifications: Array<{ id: string; type: string; message: string }>;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        user: null,
        isAuthenticated: false,
        sessionData: {},
        activeApp: 'shell',
        sharedData: {},
        isLoading: false,
        notifications: [],
        
        // Usuario
        setUser: (user) => set({ 
          user, 
          isAuthenticated: true 
        }, false, 'setUser'),
        
        logout: () => set({ 
          user: null, 
          isAuthenticated: false, 
          sessionData: {},
          sharedData: {} 
        }, false, 'logout'),
        
        // Sesión
        setSessionData: (key, value) => 
          set((state) => ({
            sessionData: { ...state.sessionData, [key]: value }
          }), false, `setSessionData/${key}`),
        
        clearSession: () => 
          set({ sessionData: {} }, false, 'clearSession'),
        
        // App activa
        setActiveApp: (app) => 
          set({ activeApp: app }, false, 'setActiveApp'),
        
        // Datos compartidos
        updateSharedData: (data) =>
          set((state) => ({
            sharedData: { ...state.sharedData, ...data }
          }), false, 'updateSharedData'),
        
        clearSharedData: (key) =>
          set((state) => {
            if (key) {
              const { [key]: _, ...rest } = state.sharedData;
              return { sharedData: rest };
            }
            return { sharedData: {} };
          }, false, 'clearSharedData'),
        
        // Loading
        setLoading: (loading) =>
          set({ isLoading: loading }, false, 'setLoading'),
        
        // Notificaciones
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              ...state.notifications,
              { ...notification, id: Date.now().toString() }
            ]
          }), false, 'addNotification'),
        
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id)
          }), false, 'removeNotification'),
      }),
      {
        name: 'cv-global-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          sessionData: state.sessionData,
        }),
      }
    ),
    { name: 'CV Global Store' }
  )
);

// Selectores útiles
export const selectUser = (state: GlobalState) => state.user;
export const selectIsAuthenticated = (state: GlobalState) => state.isAuthenticated;
export const selectSharedData = (state: GlobalState) => state.sharedData;
```

**Checklist 1.2:**
- [ ] globalStore.ts creado
- [ ] Tipos TypeScript definidos
- [ ] Middleware devtools configurado
- [ ] Middleware persist configurado
- [ ] Selectores exportados
- [ ] Tests unitarios escritos
- [ ] Documentación en JSDoc

**Tiempo estimado:** 1 día

---

### 1.3 - Crear Layout y Navigation (Semana 1)

**Objetivo:** UI base para shell con navegación entre apps

**Archivo:** `src/components/Layout.tsx`

```typescript
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useGlobalStore } from '../stores/globalStore';

export const Layout: React.FC = () => {
  const { user, isAuthenticated } = useGlobalStore();
  
  return (
    <div className="layout">
      <header className="layout-header">
        <Navigation />
        {isAuthenticated && (
          <div className="user-info">
            Bienvenido, {user?.name}
          </div>
        )}
      </header>
      
      <main className="layout-content">
        <React.Suspense fallback={<div>Loading app...</div>}>
          <Outlet />
        </React.Suspense>
      </main>
      
      <footer className="layout-footer">
        © 2025 CV Apps
      </footer>
    </div>
  );
};
```

**Archivo:** `src/components/Navigation.tsx`

```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../stores/globalStore';

const apps = [
  { path: '/login', name: 'Login' },
  { path: '/editor', name: 'Editor' },
  { path: '/user', name: 'User' },
  { path: '/payment', name: 'Payment' },
  { path: '/shop', name: 'Shop' },
  // ... otras 12 apps
];

export const Navigation: React.FC = () => {
  const { activeApp, setActiveApp, isAuthenticated } = useGlobalStore();
  
  if (!isAuthenticated) {
    return (
      <nav className="navigation">
        <Link to="/login">Login</Link>
      </nav>
    );
  }
  
  return (
    <nav className="navigation">
      {apps.map(app => (
        <Link
          key={app.path}
          to={app.path}
          className={activeApp === app.name ? 'active' : ''}
          onClick={() => setActiveApp(app.name)}
        >
          {app.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
```

**Checklist 1.3:**
- [ ] Layout.tsx creado
- [ ] Navigation.tsx creado
- [ ] Estilos básicos aplicados
- [ ] Suspense para lazy loading
- [ ] Estado activeApp actualizado al navegar
- [ ] Responsive design básico

**Tiempo estimado:** 1 día

---

### 1.4 - Upgrade Apps Webpack 4 → 5 (Semana 2-3)

**Objetivo:** Actualizar 8 apps de Webpack 4 a Webpack 5

**Apps a actualizar:**
1. cv-app-crm
2. cv-app-editor
3. cv-app-payment-amazonpay-3ds
4. cv-app-payment-ingenico
5. cv-app-payment-macropay
6. cv-app-payment-nmi
7. cv-app-payment-paddle
8. cv-app-payment-worldpay

**Proceso por app (repetir 8 veces):**

#### 1.4.1 - Backup y branch
```bash
cd /home/amallen/www/cv/cv-environment-local/workspace/{app-name}
git checkout -b feature/webpack5-upgrade
```

#### 1.4.2 - Actualizar package.json
```json
{
  "devDependencies": {
    "webpack": "^5.90.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0"
  }
}
```

#### 1.4.3 - Migrar configuración
Seguir guía oficial: https://webpack.js.org/migrate/5/

**Cambios típicos necesarios:**
- `node.Buffer` → `require('buffer').Buffer`
- `node.process` → `require('process')`
- Actualizar loaders obsoletos
- Actualizar plugins obsoletos

#### 1.4.4 - Testing
```bash
npm install
npm run build
npm run dev
# Verificar que app funciona correctamente
```

**Checklist 1.4 (por app):**
- [ ] Branch creada
- [ ] package.json actualizado
- [ ] webpack.config.js migrado
- [ ] Build exitoso
- [ ] Dev server funciona
- [ ] App funciona sin errores
- [ ] Tests pasan
- [ ] Commit y PR creado

**Tiempo estimado:** 2-3 días por app (3 semanas total)

---

### 1.5 - Configurar Module Federation en Apps (Semana 4-5)

**Objetivo:** Agregar Module Federation a cada app para que sean remotes

**Proceso por app (17 apps):**

#### Template de configuración

**Archivo:** `webpack.config.js` (agregar al config existente)

```javascript
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  // ... configuración existente
  
  plugins: [
    // ... plugins existentes
    
    new ModuleFederationPlugin({
      name: 'appName', // Cambiar por nombre único de app
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App', // Componente principal
        './routes': './src/routes', // Rutas
        // Opcional: './store': './src/store'
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: '^18.2.0' 
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: '^18.2.0' 
        },
        'react-router-dom': { 
          singleton: true 
        },
        zustand: { 
          singleton: true 
        },
        // MUI solo si la app lo usa
        '@mui/material': { 
          singleton: true,
          requiredVersion: '^5.15.0'
        },
        // Librerías internas
        '@npm_leadtech/cv-lib-visitor': { 
          singleton: true 
        },
        '@npm_leadtech/cv-storage-js': { 
          singleton: true 
        },
        // ... otras librerías @npm_leadtech
      },
    }),
  ],
};
```

**Checklist 1.5 (por app):**
- [ ] Module Federation Plugin agregado
- [ ] Nombre único configurado
- [ ] Componentes expuestos correctamente
- [ ] Shared dependencies configuradas
- [ ] Build genera remoteEntry.js
- [ ] remoteEntry.js accesible vía HTTP
- [ ] App funciona standalone
- [ ] Documentado puerto asignado

**Puertos asignados:**
- Shell: 3000
- Login: 3001
- Editor: 3002
- User: 3003
- Payment: 3004
- Shop: 3005
- ... (asignar resto)

**Tiempo estimado:** 1 día por app (3-4 semanas total)

---

### 1.6 - Conectar Remotes al Shell (Semana 6)

**Objetivo:** Configurar shell para cargar todas las apps como remotes

#### 1.6.1 - Actualizar webpack.config.js del shell

```javascript
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    login: 'login@http://localhost:3001/remoteEntry.js',
    editor: 'editor@http://localhost:3002/remoteEntry.js',
    user: 'user@http://localhost:3003/remoteEntry.js',
    payment: 'payment@http://localhost:3004/remoteEntry.js',
    shop: 'shop@http://localhost:3005/remoteEntry.js',
    thankyou: 'thankyou@http://localhost:3006/remoteEntry.js',
    share: 'share@http://localhost:3007/remoteEntry.js',
    crm: 'crm@http://localhost:3008/remoteEntry.js',
    editorApp: 'editorApp@http://localhost:3009/remoteEntry.js',
    backofficeBalancer: 'backofficeBalancer@http://localhost:3010/remoteEntry.js',
    backofficeLogin: 'backofficeLogin@http://localhost:3011/remoteEntry.js',
    paymentAmazonpay: 'paymentAmazonpay@http://localhost:3012/remoteEntry.js',
    paymentIngenico: 'paymentIngenico@http://localhost:3013/remoteEntry.js',
    paymentMacropay: 'paymentMacropay@http://localhost:3014/remoteEntry.js',
    paymentNmi: 'paymentNmi@http://localhost:3015/remoteEntry.js',
    paymentPaddle: 'paymentPaddle@http://localhost:3016/remoteEntry.js',
    paymentWorldpay: 'paymentWorldpay@http://localhost:3017/remoteEntry.js',
  },
  shared: {
    // ... como antes
  },
}),
```

#### 1.6.2 - Crear routing dinámico

**Archivo:** `src/App.tsx`

```typescript
import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useGlobalStore } from './stores/globalStore';

// Lazy load all remote apps
const LoginApp = lazy(() => import('login/App'));
const EditorApp = lazy(() => import('editor/App'));
const UserApp = lazy(() => import('user/App'));
const PaymentApp = lazy(() => import('payment/App'));
const ShopApp = lazy(() => import('shop/App'));
const ThankyouApp = lazy(() => import('thankyou/App'));
const ShareApp = lazy(() => import('share/App'));
const CRMApp = lazy(() => import('crm/App'));
const BackofficeBalancerApp = lazy(() => import('backofficeBalancer/App'));
const BackofficeLoginApp = lazy(() => import('backofficeLogin/App'));
const PaymentAmazonpayApp = lazy(() => import('paymentAmazonpay/App'));
const PaymentIngenicoApp = lazy(() => import('paymentIngenico/App'));
const PaymentMacropayApp = lazy(() => import('paymentMacropay/App'));
const PaymentNmiApp = lazy(() => import('paymentNmi/App'));
const PaymentPaddleApp = lazy(() => import('paymentPaddle/App'));
const PaymentWorldpayApp = lazy(() => import('paymentWorldpay/App'));

const App: React.FC = () => {
  const { isAuthenticated } = useGlobalStore();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public route */}
          <Route path="login/*" element={<LoginApp />} />
          
          {/* Protected routes */}
          {isAuthenticated ? (
            <>
              <Route path="editor/*" element={<EditorApp />} />
              <Route path="user/*" element={<UserApp />} />
              <Route path="payment/*" element={<PaymentApp />} />
              <Route path="shop/*" element={<ShopApp />} />
              <Route path="thankyou/*" element={<ThankyouApp />} />
              <Route path="share/*" element={<ShareApp />} />
              <Route path="crm/*" element={<CRMApp />} />
              <Route path="backoffice-balancer/*" element={<BackofficeBalancerApp />} />
              <Route path="backoffice-login/*" element={<BackofficeLoginApp />} />
              <Route path="payment-amazonpay/*" element={<PaymentAmazonpayApp />} />
              <Route path="payment-ingenico/*" element={<PaymentIngenicoApp />} />
              <Route path="payment-macropay/*" element={<PaymentMacropayApp />} />
              <Route path="payment-nmi/*" element={<PaymentNmiApp />} />
              <Route path="payment-paddle/*" element={<PaymentPaddleApp />} />
              <Route path="payment-worldpay/*" element={<PaymentWorldpayApp />} />
              <Route path="/" element={<Navigate to="/user" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

**Checklist 1.6:**
- [ ] Remotes configurados en webpack.config.js
- [ ] App.tsx con lazy loading
- [ ] Routing protegido por autenticación
- [ ] Navegación entre apps funciona
- [ ] Suspense con fallback configurado
- [ ] Error boundaries agregados

**Tiempo estimado:** 2-3 días

---

### 1.7 - Migrar de Cookies a Zustand (Semana 7)

**Objetivo:** Eliminar uso de cookies, usar Zustand para todo

#### Identificar uso actual de cookies

```bash
# Buscar en todas las apps
grep -r "document.cookie" /home/amallen/www/cv/cv-environment-local/workspace/
grep -r "Cookies.set" /home/amallen/www/cv/cv-environment-local/workspace/
grep -r "js-cookie" /home/amallen/www/cv/cv-environment-local/workspace/
```

#### Pattern de migración

**ANTES (Cookies):**
```javascript
// Guardar
document.cookie = `userData=${JSON.stringify(user)}`;
Cookies.set('authToken', token);

// Leer
const userData = Cookies.get('userData');
const token = Cookies.get('authToken');
```

**DESPUÉS (Zustand):**
```typescript
// En cualquier componente de cualquier app
import { useGlobalStore } from 'shell/globalStore';

function MyComponent() {
  const { user, sessionData, setUser, setSessionData } = useGlobalStore();
  
  // Guardar
  setUser(userData);
  setSessionData('authToken', token);
  
  // Leer (automático via hook)
  console.log(user);
  console.log(sessionData.authToken);
}
```

**Ventajas:**
- ✅ Sin límite de 4KB
- ✅ TypeScript type-safe
- ✅ Auto-sincronizado entre apps
- ✅ Redux DevTools
- ✅ Persist en localStorage

**Checklist 1.7:**
- [ ] Inventario de uso de cookies completado
- [ ] Pattern de migración documentado
- [ ] Migración app por app
- [ ] Tests de integración
- [ ] Cookies eliminadas completamente
- [ ] Documentación actualizada

**Tiempo estimado:** 1 semana

---

### 1.8 - Testing e Integración (Semana 8)

**Objetivo:** Validar que todas las apps funcionan juntas

#### 1.8.1 - Setup de testing

```bash
# En shell-webpack/
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

#### 1.8.2 - Tests de integración

**Archivo:** `src/__tests__/integration.test.tsx`

```typescript
describe('Module Federation Integration', () => {
  it('should load all 17 remotes', async () => {
    // Test que remoteEntry.js es accesible
  });
  
  it('should share Zustand store across apps', () => {
    // Test estado compartido
  });
  
  it('should navigate between apps', () => {
    // Test routing
  });
  
  it('should persist session data', () => {
    // Test persist
  });
});
```

#### 1.8.3 - Manual testing checklist

- [ ] Shell carga correctamente
- [ ] Login flow completo funciona
- [ ] Navegación entre 17 apps funciona
- [ ] Estado se comparte correctamente
- [ ] Datos persisten en localStorage
- [ ] No hay múltiples instancias de React
- [ ] No hay conflictos de dependencias
- [ ] Performance aceptable
- [ ] Cada app puede deployarse independientemente

**Tiempo estimado:** 1 semana

---

## Entregables Fase 1

### Documentación
- [ ] README.md de arquitectura
- [ ] Guía de setup para developers
- [ ] Guía de agregar nueva app
- [ ] API docs de globalStore
- [ ] Troubleshooting guide

### Código
- [ ] Shell funcional con Module Federation
- [ ] 17 apps conectadas
- [ ] Zustand global implementado
- [ ] Cookies eliminadas
- [ ] Tests de integración pasando

### Deployment
- [ ] Scripts de build para producción
- [ ] Docker compose para desarrollo local
- [ ] CI/CD pipeline configurado
- [ ] Monitoring básico

---

## 📊 Métricas de Éxito Fase 1

| Métrica | Objetivo | Medición |
|---------|----------|----------|
| Apps conectadas | 17/17 | ✅ |
| Cookies eliminadas | 100% | grep en codebase |
| Build time | < 5 min | webpack --profile |
| Bundle size | < 500KB shell | webpack-bundle-analyzer |
| Shared deps correctos | Sin duplicados | Module Federation dashboard |
| Tests pasando | 100% | jest --coverage |

---

## 🚧 Riesgos y Mitigaciones Fase 1

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Conflictos de versiones MUI | Alta | Alto | Sincronizar versiones, usar singleton |
| Apps Webpack 4 con bugs | Media | Medio | Testing exhaustivo, rollback plan |
| Performance degradada | Baja | Alto | Lazy loading, code splitting |
| Resistance del equipo | Media | Medio | Training, documentación clara |
| Redux aún en uso | Alta | Bajo | Deprecar pero no eliminar aún |

---

## 📅 Cronograma Fase 1

```
Semana 1: Setup Shell + Zustand
├── Lun-Mar: Shell proyecto base
├── Mié: Zustand store
└── Jue-Vie: Layout + Navigation

Semana 2-3: Upgrade Webpack 4→5
├── 8 apps a migrar
└── ~2-3 días por app

Semana 4-5: Module Federation en apps
├── 17 apps a configurar
└── ~1 día por app

Semana 6: Conectar remotes
├── Configurar shell remotes
└── Routing dinámico

Semana 7: Migrar cookies → Zustand
├── Identificar usos
├── Migrar app por app
└── Tests

Semana 8: Testing e integración
├── Setup tests
├── Integration tests
└── Manual QA
```

---

## 🎯 Criterios de Aceptación Fase 1

**Fase 1 está completa cuando:**

1. ✅ 17 apps conectadas vía Module Federation
2. ✅ Shell funcional en localhost:3000
3. ✅ Zustand global store operativo
4. ✅ Cookies 100% eliminadas
5. ✅ Navegación entre apps sin reload
6. ✅ Estado compartido funcionando
7. ✅ Cada app deployable independientemente
8. ✅ Tests de integración pasando
9. ✅ Documentación completa
10. ✅ Team training completado

---

## 🔄 Siguiente: FASE 2

Una vez completada Fase 1, proceder con:
- **Fase 2: Component Library** (Documento separado)
- Diseño del Design System
- Implementación de @npm_leadtech/ui-components
- Migración de MUI

---

## 📝 Notas y Decisiones

### Decisiones Arquitectónicas

**DA-001:** Webpack como paso intermedio
- **Razón:** Apps ya usan Webpack, menor resistencia
- **Trade-off:** Builds más lentos temporalmente
- **Fecha:** 2025-10-03

**DA-002:** Zustand sobre Redux
- **Razón:** Más simple, menos boilerplate, mejor DX
- **Trade-off:** Migración necesaria
- **Fecha:** 2025-10-03

**DA-003:** No eliminar Redux inmediatamente
- **Razón:** Minimizar riesgo, migración gradual
- **Trade-off:** Código duplicado temporal
- **Fecha:** 2025-10-03

### Lecciones Aprendidas

_Se actualizará conforme avance la fase_

---

**Última actualización:** 2025-10-03  
**Versión:** 1.0.0  
**Autor:** Claude Sonnet 4.5 + amallen22  
**Estado:** 🔵 PLANIFICACIÓN
