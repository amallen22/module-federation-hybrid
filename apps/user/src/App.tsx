import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/documents"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Documents />
              </Suspense>
            }
          />
          <Route
            path="/subscription"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Subscription />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

