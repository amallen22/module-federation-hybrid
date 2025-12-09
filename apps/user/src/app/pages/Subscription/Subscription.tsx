import React from 'react';
import { useSubscription } from '../../hooks/queries/useSubscription';
import styles from './Subscription.module.scss';

const Subscription: React.FC = () => {
  const { data: subscription, isLoading, error } = useSubscription();

  return (
    <div className={styles.subscription}>
      <header className={styles.header}>
        <h1>Suscripción</h1>
      </header>
      
      <div className={styles.content}>
        {isLoading && <div className={styles.loading}>Cargando información de suscripción...</div>}
        
        {error && (
          <div className={styles.error}>
            Error al cargar la información de suscripción.
          </div>
        )}
        
        {subscription && (
          <div className={styles.subscriptionInfo}>
            <div className={styles.infoRow}>
              <label>Plan:</label>
              <span className={styles.badge}>{subscription.plan}</span>
            </div>
            <div className={styles.infoRow}>
              <label>Estado:</label>
              <span className={`${styles.status} ${styles[subscription.status]}`}>
                {subscription.status}
              </span>
            </div>
            <div className={styles.infoRow}>
              <label>Fecha de inicio:</label>
              <span>{new Date(subscription.startDate).toLocaleDateString()}</span>
            </div>
            {subscription.endDate && (
              <div className={styles.infoRow}>
                <label>Fecha de fin:</label>
                <span>{new Date(subscription.endDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className={styles.infoRow}>
              <label>Renovación automática:</label>
              <span>{subscription.autoRenew ? 'Sí' : 'No'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;

