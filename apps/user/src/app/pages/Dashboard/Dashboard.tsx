import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserProfile } from '../../hooks/queries/useUser';
import { useDocuments } from '../../hooks/queries/useDocuments';
import { useSubscription } from '../../hooks/queries/useSubscription';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: documents, isLoading: documentsLoading } = useDocuments();
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription();

  // Detectar si estamos en modo standalone (no desde shell)
  // Si el pathname NO empieza con /user, estamos en modo standalone
  const isStandalone = !location.pathname.startsWith('/user');
  
  // Función para normalizar rutas
  // En modo standalone: /dashboard, /profile, etc.
  // Desde shell: /user/dashboard, /user/profile, etc.
  const getRoute = (path: string) => {
    if (isStandalone) {
      return path.startsWith('/') ? path : `/${path}`;
    }
    // Desde shell, usar rutas absolutas con prefijo /user
    return `/user/${path}`;
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>
          {profileLoading ? 'Cargando...' : `Bienvenido, ${profile?.firstName || 'Usuario'}`}
        </p>
      </header>
      
      <div className={styles.content}>
        <div className={styles.grid}>
          <Link to={getRoute('profile')} className={styles.card}>
            <h2>Perfil</h2>
            <p>Gestiona tu información personal</p>
            {profile && (
              <div className={styles.cardInfo}>
                <span>{profile.email}</span>
              </div>
            )}
          </Link>
          
          <Link to={getRoute('documents')} className={styles.card}>
            <h2>Documentos</h2>
            <p>Administra tus CVs y documentos</p>
            {documentsLoading ? (
              <div className={styles.cardInfo}>Cargando...</div>
            ) : (
              <div className={styles.cardInfo}>
                <span>{documents?.length || 0} documentos</span>
              </div>
            )}
          </Link>
          
          <Link to={getRoute('subscription')} className={styles.card}>
            <h2>Suscripción</h2>
            <p>Gestiona tu plan y facturación</p>
            {subscriptionLoading ? (
              <div className={styles.cardInfo}>Cargando...</div>
            ) : (
              <div className={styles.cardInfo}>
                <span className={styles.badge}>{subscription?.plan || 'N/A'}</span>
              </div>
            )}
          </Link>
          
          <section className={styles.card}>
            <h2>Configuración</h2>
            <p>Ajusta tus preferencias</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

