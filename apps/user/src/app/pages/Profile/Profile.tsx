import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@packages/auth';
import { useUserProfile, useUpdateUserProfile } from '../../hooks/queries/useUser';
import { useUserSettings, useUpdateUserSettings } from '../../hooks/queries/useUser';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  const { user: authUser, isAuthenticated, hasHydrated } = useAuth();
  const { data: profile, isLoading: profileLoading, error: profileError } = useUserProfile();
  const { data: settings, isLoading: settingsLoading } = useUserSettings();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateUserProfile();
  const { mutate: updateSettings, isPending: isUpdatingSettings } = useUpdateUserSettings();

  // Esperar a que el store se hidrate antes de verificar autenticación
  if (!hasHydrated) {
    return (
      <div className={styles.profile}>
        <div className={styles.loading}>Cargando...</div>
      </div>
    );
  }

  // Show message if not authenticated (don't use Navigate to avoid infinite loops)
  if (!isAuthenticated) {
    return (
      <div className={styles.profile}>
        <div className={styles.error}>
          <h2>No autenticado</h2>
          <p>Por favor, inicia sesión para acceder a esta página.</p>
          <a href="/login">Ir a Login</a>
        </div>
      </div>
    );
  }

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
                <span>{authUser?.email || profile?.email || 'No disponible'}</span>
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

