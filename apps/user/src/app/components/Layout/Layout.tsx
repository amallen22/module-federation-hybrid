import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <Link to="/dashboard" className={styles.logo}>
            <h2>CV User</h2>
          </Link>
          
          <ul className={styles.navLinks}>
            <li>
              <Link
                to="/dashboard"
                className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`${styles.navLink} ${isActive('/profile') ? styles.active : ''}`}
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/documents"
                className={`${styles.navLink} ${isActive('/documents') ? styles.active : ''}`}
              >
                Documentos
              </Link>
            </li>
            <li>
              <Link
                to="/subscription"
                className={`${styles.navLink} ${isActive('/subscription') ? styles.active : ''}`}
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

