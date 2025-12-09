import React from 'react';
import { Link } from 'react-router-dom';
import { useUserProfile } from '../../hooks/queries/useUser';
import { useDocuments } from '../../hooks/queries/useDocuments';
import { useSubscription } from '../../hooks/queries/useSubscription';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: documents, isLoading: documentsLoading } = useDocuments();
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription();

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
          <Link to="/profile" className={styles.card}>
            <h2>Perfil</h2>
            <p>Gestiona tu información personal</p>
            {profile && (
              <div className={styles.cardInfo}>
                <span>{profile.email}</span>
              </div>
            )}
          </Link>
          
          <Link to="/documents" className={styles.card}>
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
          
          <Link to="/subscription" className={styles.card}>
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

