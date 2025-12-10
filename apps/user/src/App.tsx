import React, { Suspense, lazy, memo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from '@packages/query';
import { Layout } from './app/components/Layout';
import styles from './App.module.scss';

// Lazy load all pages for better performance and code splitting
const Dashboard = lazy(() => import('./app/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Profile = lazy(() => import('./app/pages/Profile').then(m => ({ default: m.Profile })));
const Documents = lazy(() => import('./app/pages/Documents').then(m => ({ default: m.Documents })));
const Subscription = lazy(() => import('./app/pages/Subscription').then(m => ({ default: m.Subscription })));

const LoadingFallback: React.FC = memo(() => (
  <div className={styles.loading}>
    <p>Cargando...</p>
  </div>
));
LoadingFallback.displayName = 'LoadingFallback';

interface AppProps {
  // Si se proporciona, no se usa BrowserRouter (para microfrontend)
  standalone?: boolean;
}

// Componente interno que no usa BrowserRouter (para cuando se carga desde shell)
const AppRoutes: React.FC = memo(() => {
  return (
    <Layout>
      <Routes>
        {/* Rutas relativas para funcionar tanto standalone como desde shell */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          }
        />
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
});
AppRoutes.displayName = 'AppRoutes';

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

