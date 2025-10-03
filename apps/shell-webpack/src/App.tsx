import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useGlobalStore } from './stores/globalStore';

// Temporary welcome pages (will be replaced with lazy-loaded remotes in Task 1.6)
const WelcomePage: React.FC = () => {
  const { isAuthenticated, setUser } = useGlobalStore();
  
  const handleMockLogin = () => {
    setUser({
      id: '1',
      email: 'demo@cvapps.com',
      name: 'Demo User',
      role: 'Admin'
    });
  };
  
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1>🚀 Module Federation Shell</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1rem' }}>
        Phase 1: Webpack Module Federation Setup
      </p>
      
      {!isAuthenticated ? (
        <div style={{ marginTop: '3rem' }}>
          <h2>Welcome to CV Apps</h2>
          <p style={{ color: '#666', marginTop: '1rem' }}>
            Click below to simulate login and test the global store
          </p>
          <button 
            onClick={handleMockLogin}
            style={{
              marginTop: '2rem',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            🔑 Mock Login
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '3rem' }}>
          <h2>✅ Shell Application Running!</h2>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px',
            maxWidth: '600px',
            margin: '2rem auto',
            textAlign: 'left',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3>Completed Tasks (1.1 - 1.3):</h3>
            <ul style={{ color: '#666', lineHeight: '2' }}>
              <li>✅ Shell project created</li>
              <li>✅ Webpack 5 + Module Federation configured</li>
              <li>✅ Zustand global store implemented</li>
              <li>✅ Layout and Navigation components</li>
              <li>✅ App running on localhost:3000</li>
            </ul>
            
            <h3 style={{ marginTop: '2rem' }}>Next Steps:</h3>
            <ul style={{ color: '#666', lineHeight: '2' }}>
              <li>🔄 Task 1.4: Upgrade Webpack 4 → 5 apps</li>
              <li>🔄 Task 1.5: Configure Module Federation in apps</li>
              <li>🔄 Task 1.6: Connect remotes to shell</li>
            </ul>
          </div>
          
          <p style={{ color: '#666', marginTop: '2rem' }}>
            Navigate using the menu above to test routing
          </p>
        </div>
      )}
    </div>
  );
};

const LoginPlaceholder: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h2>🔑 Login App (Remote)</h2>
    <p style={{ color: '#666' }}>Will be loaded from localhost:3001</p>
  </div>
);

const EditorPlaceholder: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h2>✏️ Editor App (Remote)</h2>
    <p style={{ color: '#666' }}>Will be loaded from localhost:3002</p>
  </div>
);

const UserPlaceholder: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h2>👤 User App (Remote)</h2>
    <p style={{ color: '#666' }}>Will be loaded from localhost:3003</p>
  </div>
);

const PaymentPlaceholder: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h2>💳 Payment App (Remote)</h2>
    <p style={{ color: '#666' }}>Will be loaded from localhost:3004</p>
  </div>
);

const ShopPlaceholder: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h2>🛒 Shop App (Remote)</h2>
    <p style={{ color: '#666' }}>Will be loaded from localhost:3005</p>
  </div>
);

const App: React.FC = () => {
  const { isAuthenticated } = useGlobalStore();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          
          {/* Public route */}
          <Route path="login/*" element={<LoginPlaceholder />} />
          
          {/* Protected routes */}
          {isAuthenticated ? (
            <>
              <Route path="editor/*" element={<EditorPlaceholder />} />
              <Route path="user/*" element={<UserPlaceholder />} />
              <Route path="payment/*" element={<PaymentPlaceholder />} />
              <Route path="shop/*" element={<ShopPlaceholder />} />
              <Route path="thankyou/*" element={<WelcomePage />} />
              <Route path="share/*" element={<WelcomePage />} />
              <Route path="crm/*" element={<WelcomePage />} />
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
