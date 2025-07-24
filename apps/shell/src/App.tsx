import React, { Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';


// Lazy load remote components con logs de debug
// const RemoteButton = React.lazy(async () => {
//   console.log('🔄 Shell: Cargando RemoteButton desde ui/Button');
//   try {
//     return await import('ui/Button');
//   } catch (err) {
//     console.error('❌ Shell: Error cargando ui/Button:', err);
//     throw err;    
//   }
// });

// const RemoteProduct = React.lazy(async () => {
  //   console.log('🔄 Shell: Cargando RemoteProduct desde product/App');
  //   try {
//     return await import('../../product/src/App.tsx');
//   } catch (err) {
  //     console.error('❌ Shell: Error cargando product/App:', err);
  //     throw err;
//   }
// });

// const RemoteLogin = React.lazy(async () => {
//   console.log('🔄 Shell: Cargando RemoteLogin desde login/App');
//   try {
//     return await import('../../login/src/app/App.jsx');
//   } catch (err) {
  //     console.error('❌ Shell: Error cargando login/App:', err);
//     throw err;
//   }
// });

const RemoteButton = React.lazy(() => import('ui/Button'));

const RemoteProduct = React.lazy(() => import('../../product/src/App.tsx'));

const RemoteLogin = React.lazy(() => import('../../login/src/app/App.jsx'));

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
        <li><strong>🎨 UI Kit:</strong> Componentes compartidos y librería de diseño</li>
      </ul>
      <p>Navega a /login, /signin, /signup o /product para acceder a los módulos.</p>
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
      </ul>
    </div>
    {/* <Suspense fallback={<div>Loading Button...</div>}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <RemoteButton variant="primary" onClick={() => alert('Primary clicked!')}>
          Button from remote UI Kit
        </RemoteButton>
      </div>
    </Suspense> */}
  </div>
);

const LoginPage = () => (
  <div>
    <h2>🔐 Login Module</h2>
    <Suspense fallback={<div>Loading Login Module...</div>}>
      <RemoteLogin />
    </Suspense>
  </div>
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
          <RemoteButton variant="primary" onClick={() => alert('Primary clicked!')}>
            Primary Button
          </RemoteButton>
          <RemoteButton variant="secondary" onClick={() => alert('Secondary clicked!')}>
            Secondary Button
          </RemoteButton>
        </div>
      </Suspense>
    </div>
  </div>
);

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav style={{
      padding: '10px 0',
      marginBottom: '30px',
      borderBottom: '2px solid #e0e0e0'
    }}>
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <Link 
          to="/"
          style={{
            padding: '10px 20px',
            backgroundColor: isActive('/') ? '#007bff' : '#f8f9fa',
            color: isActive('/') ? 'white' : '#333',
            border: '1px solid #ccc',
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
            padding: '10px 20px',
            backgroundColor: (isActive('/login') || isActive('/signin') || isActive('/signup')) ? '#007bff' : '#f8f9fa',
            color: (isActive('/login') || isActive('/signin') || isActive('/signup')) ? 'white' : '#333',
            border: '1px solid #ccc',
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
            padding: '10px 20px',
            backgroundColor: isActive('/product') ? '#007bff' : '#f8f9fa',
            color: isActive('/product') ? 'white' : '#333',
            border: '1px solid #ccc',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          📦 Product
        </Link>
        <Link 
          to="/ui-kit"
          style={{
            padding: '10px 20px',
            backgroundColor: isActive('/ui-kit') ? '#007bff' : '#f8f9fa',
            color: isActive('/ui-kit') ? 'white' : '#333',
            border: '1px solid #ccc',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          🎨 UI Kit
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1>CV Hibrid - Micro Frontend Platform</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Shell Application running on localhost:5000
        </p>
      </header>
      
      <Navigation />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/ui-kit" element={<UIKitPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;