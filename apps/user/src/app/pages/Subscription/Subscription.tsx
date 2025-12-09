import React from 'react';
import styles from './Subscription.module.scss';

const Subscription: React.FC = () => {
  return (
    <div className={styles.subscription}>
      <header className={styles.header}>
        <h1>Suscripción</h1>
      </header>
      
      <div className={styles.content}>
        <p>Gestión de suscripción en desarrollo...</p>
      </div>
    </div>
  );
};

export default Subscription;

