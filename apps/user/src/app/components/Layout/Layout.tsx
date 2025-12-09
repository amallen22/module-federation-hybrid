import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

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

  const isActive = (path: string) => {
    const normalizedPath = getRoute(path);
    return location.pathname === normalizedPath || 
           location.pathname.endsWith(normalizedPath) ||
           (normalizedPath === 'dashboard' && (location.pathname.endsWith('/user') || location.pathname.endsWith('/user/')));
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <Link to={getRoute('dashboard')} className={styles.logo}>
            <h2>CV User</h2>
          </Link>
          
          <ul className={styles.navLinks}>
            <li>
              <Link
                to={getRoute('dashboard')}
                className={`${styles.navLink} ${isActive('dashboard') ? styles.active : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={getRoute('profile')}
                className={`${styles.navLink} ${isActive('profile') ? styles.active : ''}`}
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to={getRoute('documents')}
                className={`${styles.navLink} ${isActive('documents') ? styles.active : ''}`}
              >
                Documentos
              </Link>
            </li>
            <li>
              <Link
                to={getRoute('subscription')}
                className={`${styles.navLink} ${isActive('subscription') ? styles.active : ''}`}
              >
                Suscripción
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

