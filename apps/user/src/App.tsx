import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from '@packages/query';
import { Layout } from './app/components/Layout';
import { Dashboard } from './app/pages/Dashboard';
import styles from './App.module.scss';

// Lazy load pages for better performance
const Profile = lazy(() => import('./app/pages/Profile').then(m => ({ default: m.Profile })));
const Documents = lazy(() => import('./app/pages/Documents').then(m => ({ default: m.Documents })));
const Subscription = lazy(() => import('./app/pages/Subscription').then(m => ({ default: m.Subscription })));

const LoadingFallback: React.FC = () => (
  <div className={styles.loading}>
    <p>Cargando...</p>
  </div>
);

interface AppProps {
  // Si se proporciona, no se usa BrowserRouter (para microfrontend)
  standalone?: boolean;
}

// Componente interno que no usa BrowserRouter (para cuando se carga desde shell)
const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {/* Rutas relativas para funcionar tanto standalone como desde shell */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="profile"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="documents"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Documents />
            </Suspense>
          }
        />
        <Route
          path="subscription"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Subscription />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC<AppProps> = ({ standalone = false }) => {
  // Si standalone es true, usar BrowserRouter y QueryProvider (para ejecución independiente)
  // Si standalone es false, solo usar QueryProvider (para microfrontend desde shell)
  if (standalone) {
    return (
      <BrowserRouter>
        <QueryProvider>
          <AppRoutes />
        </QueryProvider>
      </BrowserRouter>
    );
  }

  // Cuando se carga como microfrontend, el shell ya tiene BrowserRouter
  // Pero necesitamos QueryProvider para TanStack Query
  return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
};

export default App;

