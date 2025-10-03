// webpack.config.js - SHELL (Host)
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  // ... otras configuraciones webpack
  
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      
      // Remotes - Las 17 apps
      remotes: {
        login: 'login@http://localhost:3001/remoteEntry.js',
        editor: 'editor@http://localhost:3002/remoteEntry.js',
        user: 'user@http://localhost:3003/remoteEntry.js',
        payment: 'payment@http://localhost:3004/remoteEntry.js',
        shop: 'shop@http://localhost:3005/remoteEntry.js',
        // ... otras 12 apps
      },
      
      // Shared - Dependencias compartidas
      shared: {
        // React
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true
        },
        
        // State Management
        zustand: {
          singleton: true,
          requiredVersion: '^4.0.0',
          eager: true
        },
        
        // MUI (mientras se elimina)
        '@mui/material': {
          singleton: true,
          requiredVersion: '^5.15.0'
        },
        '@mui/icons-material': {
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
        
        // Router
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.0.0'
        }
      }
    })
  ]
};

// ============================================
// webpack.config.js - REMOTE APP (ej: User)
// ============================================

module.exports = {
  // ... otras configuraciones webpack
  
  plugins: [
    new ModuleFederationPlugin({
      name: 'user',
      filename: 'remoteEntry.js',
      
      // Exposes - Lo que esta app expone
      exposes: {
        './App': './src/App',
        './routes': './src/routes',
        './store': './src/store' // Zustand store local
      },
      
      // Shared - DEBE coincidir con Shell
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        zustand: { singleton: true, requiredVersion: '^4.0.0' },
        '@mui/material': { singleton: true },
        '@mui/icons-material': { singleton: true },
        '@npm_leadtech/cv-lib-visitor': { singleton: true },
        '@npm_leadtech/cv-storage-js': { singleton: true },
        'react-router-dom': { singleton: true }
      }
    })
  ]
};

// ============================================
// Zustand Store Compartido
// ============================================

// apps/shell/src/stores/globalStore.ts
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GlobalState {
  // Usuario
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  
  // Sesión compartida (reemplaza cookies)
  sessionData: Record<string, any>;
  setSessionData: (key: string, value: any) => void;
  
  // Estado de aplicaciones
  activeApp: string;
  setActiveApp: (app: string) => void;
  
  // Datos compartidos entre apps
  sharedData: Record<string, any>;
  updateSharedData: (data: Record<string, any>) => void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        // Estado inicial
        user: null,
        isAuthenticated: false,
        sessionData: {},
        activeApp: 'shell',
        sharedData: {},
        
        // Acciones
        setUser: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false, sessionData: {} }),
        setSessionData: (key, value) => 
          set((state) => ({
            sessionData: { ...state.sessionData, [key]: value }
          })),
        setActiveApp: (app) => set({ activeApp: app }),
        updateSharedData: (data) =>
          set((state) => ({
            sharedData: { ...state.sharedData, ...data }
          }))
      }),
      {
        name: 'global-storage', // localStorage key
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          sessionData: state.sessionData
        })
      }
    )
  )
);

// ============================================
// Uso en Remote App
// ============================================

// apps/user/src/components/Profile.tsx
import { useGlobalStore } from 'shell/globalStore'; // Importado desde shell

function Profile() {
  const { user, sessionData, setSessionData } = useGlobalStore();
  
  // Sin cookies, sin Redux, estado compartido directo
  const updateProfile = (newData) => {
    setSessionData('profileData', newData);
  };
  
  return (
    <div>
      <h1>{user?.name}</h1>
      {/* ... */}
    </div>
  );
}

// ============================================
// Shell - Cargar remotes dinámicamente
// ============================================

// apps/shell/src/App.tsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load remote apps
const LoginApp = lazy(() => import('login/App'));
const EditorApp = lazy(() => import('editor/App'));
const UserApp = lazy(() => import('user/App'));
const PaymentApp = lazy(() => import('payment/App'));
// ... otras 13 apps

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login/*" element={<LoginApp />} />
          <Route path="/editor/*" element={<EditorApp />} />
          <Route path="/user/*" element={<UserApp />} />
          <Route path="/payment/*" element={<PaymentApp />} />
          {/* ... otras 13 rutas */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

// ============================================
// Comunicación entre apps
// ============================================

// App A: Actualiza datos
import { useGlobalStore } from 'shell/globalStore';

function EditorComponent() {
  const { updateSharedData } = useGlobalStore();
  
  const saveCV = (cvData) => {
    // Otros apps pueden leer esto inmediatamente
    updateSharedData({ latestCV: cvData });
  };
}

// App B: Lee datos
import { useGlobalStore } from 'shell/globalStore';

function UserDashboard() {
  const { sharedData } = useGlobalStore();
  
  // Sin llamadas API, sin cookies, dato compartido directo
  const latestCV = sharedData.latestCV;
}

// ============================================
// Ventajas vs situación actual
// ============================================

/*
ANTES (Cookies):
- 4KB limit per cookie
- Datos duplicados en cada app
- Sincronización manual
- No type-safe
- Difícil debuggear

DESPUÉS (Zustand + MF):
- ✅ Sin límites de tamaño
- ✅ Una sola fuente de verdad
- ✅ Auto-sincronizado en todas las apps
- ✅ TypeScript support
- ✅ Redux DevTools integration
- ✅ Persist automático en localStorage
- ✅ Deploy independiente de cada app
*/
