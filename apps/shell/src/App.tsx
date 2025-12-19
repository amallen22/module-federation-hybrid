import React, { Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const RemoteButton = React.lazy(() => 
  import('@packages/ui/atoms/Button').then(module => ({ default: module.Button }))
);

const RemoteProduct = React.lazy(() => import('@apps/product/App.tsx'));

// En desarrollo, cargar login vía path alias (como product)
// En producción, usar Module Federation: import('login/App')
const RemoteLogin = React.lazy(() => import('@apps/login/app/App.tsx'));

// En desarrollo, cargar user vía path alias
// En producción, usar Module Federation: import('user/App')
const RemoteUser = React.lazy(() => import('@apps/user/App.tsx'));

// Migration Plan - Visualización del plan de migración (importar el export nombrado sin BrowserRouter)
const RemoteMigrationPlan = React.lazy(() => 
  import('@apps/migration-plan/app/App.tsx').then(module => ({ default: module.MigrationPlanRoutes }))
);

// Components for each route
const HomePage = () => (
  <div>
    <h2>🏠 Welcome to CV Hibrid Shell</h2>
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <p><strong>Esta es la aplicación shell que orquesta los diferentes micro frontends:</strong></p>
      <ul style={{ marginLeft: '20px' }}>
        <li><strong>🔐 Login:</strong> Módulo de autenticación y login</li>
        <li><strong>📦 Product:</strong> Módulo de gestión de productos</li>
        <li><strong>👤 User:</strong> Módulo de gestión de usuario (dashboard, perfil, documentos, suscripción)</li>
        <li><strong>🎨 UI Kit:</strong> Componentes compartidos y librería de diseño</li>
        <li><strong>🗺️ Migration Plan:</strong> Visualización del plan de migración CV Legacy → CV-Hibrid</li>
      </ul>
      <p>Navega a /login, /signin, /signup, /product, /user o /plan para acceder a los módulos.</p>
    </div>
    <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
      <Suspense fallback={<div>Loading Button...</div>}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <RemoteButton variant="primary" onClick={() => alert('Primary clicked!')}>
            Button from remote UI Kit
          </RemoteButton>
        </div>
      </Suspense>
    </div>
    
    <div style={{
      backgroundColor: '#e3f2fd',
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #2196f3'
    }}>
      <h3>🚀 Estado del Sistema</h3>
      <ul>
        <li>✅ Shell App: Funcionando en puerto 5000</li>
        <li>✅ UI Kit: Disponible en puerto 5002</li>
        <li>✅ Product: Disponible en puerto 5001</li>
        <li>✅ Login: Disponible en puerto 5003</li>
        <li>✅ User: Disponible en puerto 5004</li>
        <li>✅ Migration Plan: Disponible en puerto 5006</li>
      </ul>
    </div>
  </div>
);

const LoginPage = () => (
  <Suspense fallback={<div>Loading Login Module...</div>}>
    <RemoteLogin />
  </Suspense>
);

const ProductPage = () => (
  <div>
    <h2>📦 Product Module</h2>
    <Suspense fallback={<div>Loading Product Module...</div>}>
      <RemoteProduct />
    </Suspense>
  </div>
);

const UIKitPage = () => (
  <div>
    <h2>🎨 UI Kit Demo</h2>
    <div style={{ marginBottom: '20px' }}>
      <p>Here are some components from the UI Kit:</p>
      <Suspense fallback={<div>Loading Button...</div>}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <RemoteButton variant="primary" onClick={() => alert('Primary clicked!')}>Primary Button</RemoteButton>
          <RemoteButton variant="secondary" onClick={() => alert('Secondary clicked!')}>Secondary Button</RemoteButton>
        </div>
      </Suspense>
    </div>
  </div>
);

const UserPage = () => (
  <ErrorBoundary
    fallback={
      <div style={{ padding: '20px' }}>
        <h2>⚠️ Error al cargar User Module</h2>
        <p>Por favor, verifica que el servidor de user esté corriendo en el puerto 5004.</p>
      </div>
    }
  >
    <Suspense fallback={
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Cargando User Module...</p>
      </div>
    }>
      <RemoteUser />
    </Suspense>
  </ErrorBoundary>
);

const MigrationPlanPage = () => (
  <ErrorBoundary
    fallback={
      <div style={{ padding: '20px' }}>
        <h2>⚠️ Error al cargar Migration Plan</h2>
        <p>Por favor, verifica que el servidor de migration-plan esté corriendo en el puerto 5006.</p>
      </div>
    }
  >
    <Suspense fallback={
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Cargando Migration Plan...</p>
      </div>
    }>
      <RemoteMigrationPlan />
    </Suspense>
  </ErrorBoundary>
);

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav style={{
      paddingBottom: '9px',
      paddingTop: '9px',
      paddingRight: '20px',
      marginBottom: '26px',
      borderBottom: '2px solid #e0e0e0',
      backgroundColor: 'rgba(30, 59, 139, 1)',
      height: '100%',
      lineHeight: 'inherit'
    }}>
      <div style={{
        display: 'flex',
        gap: '17px',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
      }}>
        <Link 
          to="/"
          style={{
            padding: '9px 17px',
            fontSize: '0.85em',
            backgroundColor: isActive('/') ? '#007bff' : 'transparent',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          🏠 Home
        </Link>
        <Link 
          to="/signin"
          style={{
            padding: '9px 17px',
            fontSize: '0.85em',
            backgroundColor: (isActive('/login') || isActive('/signin') || isActive('/signup')) ? '#007bff' : 'transparent',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          🔐 Login
        </Link>
        <Link 
          to="/product"
          style={{
            padding: '9px 17px',
            fontSize: '0.85em',
            backgroundColor: isActive('/product') ? '#007bff' : 'transparent',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          📦 Product
        </Link>
        <Link 
          to="/user"
          style={{
            padding: '9px 17px',
            fontSize: '0.85em',
            backgroundColor: isActive('/user') || location.pathname.startsWith('/user/') ? '#007bff' : 'transparent',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          👤 User
        </Link>
        <Link 
          to="/ui"
          style={{
            padding: '9px 17px',
            fontSize: '0.85em',
            backgroundColor: isActive('/ui') ? '#007bff' : 'transparent',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          🎨 UI Kit
        </Link>
        <Link 
          to="/plan"
          style={{
            padding: '9px 17px',
            fontSize: '0.85em',
            backgroundColor: isActive('/plan') || location.pathname.startsWith('/plan/') ? '#007bff' : 'transparent',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          🗺️ Plan
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <div className="shell-app">
      <Navigation />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/user/*" element={<UserPage />} />
          <Route path="/ui" element={<UIKitPage />} />
          <Route path="/plan/*" element={<MigrationPlanPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;