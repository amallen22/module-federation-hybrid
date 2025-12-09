import React from 'react';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <h1>Perfil de Usuario</h1>
      </header>
      
      <div className={styles.content}>
        <p>Configuración de perfil en desarrollo...</p>
      </div>
    </div>
  );
};

export default Profile;

