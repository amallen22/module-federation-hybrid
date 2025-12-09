import React from 'react';
import { useUserProfile, useUpdateUserProfile } from '../../hooks/queries/useUser';
import { useUserSettings, useUpdateUserSettings } from '../../hooks/queries/useUser';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useUserProfile();
  const { data: settings, isLoading: settingsLoading } = useUserSettings();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateUserProfile();
  const { mutate: updateSettings, isPending: isUpdatingSettings } = useUpdateUserSettings();

  if (profileLoading || settingsLoading) {
    return (
      <div className={styles.profile}>
        <div className={styles.loading}>Cargando perfil...</div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className={styles.profile}>
        <div className={styles.error}>Error al cargar el perfil</div>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <h1>Perfil de Usuario</h1>
      </header>
      
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Información Personal</h2>
          {profile && (
            <div className={styles.info}>
              <div className={styles.infoRow}>
                <label>Email:</label>
                <span>{profile.email}</span>
              </div>
              {profile.firstName && (
                <div className={styles.infoRow}>
                  <label>Nombre:</label>
                  <span>{profile.firstName}</span>
                </div>
              )}
              {profile.lastName && (
                <div className={styles.infoRow}>
                  <label>Apellidos:</label>
                  <span>{profile.lastName}</span>
                </div>
              )}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h2>Configuración</h2>
          {settings && (
            <div className={styles.info}>
              <div className={styles.infoRow}>
                <label>Idioma:</label>
                <span>{settings.language}</span>
              </div>
              <div className={styles.infoRow}>
                <label>Zona horaria:</label>
                <span>{settings.timezone}</span>
              </div>
              <div className={styles.infoRow}>
                <label>Notificaciones por email:</label>
                <span>{settings.notifications.email ? 'Activadas' : 'Desactivadas'}</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;

