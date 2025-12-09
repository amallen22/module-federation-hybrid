import React from 'react';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Bienvenido a tu panel de usuario</p>
      </header>
      
      <div className={styles.content}>
        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>Perfil</h2>
            <p>Gestiona tu información personal</p>
          </section>
          
          <section className={styles.card}>
            <h2>Documentos</h2>
            <p>Administra tus CVs y documentos</p>
          </section>
          
          <section className={styles.card}>
            <h2>Suscripción</h2>
            <p>Gestiona tu plan y facturación</p>
          </section>
          
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

