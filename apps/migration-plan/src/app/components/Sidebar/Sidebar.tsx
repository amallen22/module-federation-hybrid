import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  // Para HashRouter, todas las rutas son relativas (sin base path)
  const menuItems = [
    { path: 'contexto', label: 'Contexto General', icon: '📋' },
    { path: 'fase1', label: 'Fase 1: Desbloqueo Stack', icon: '🚀' },
    { path: 'fase2', label: 'Fase 2: Desacoplamiento', icon: '🔧' },
    { path: 'fase3', label: 'Fase 3: Editor Refactoring', icon: '⚡' },
    { path: 'riesgos', label: 'Riesgos y Mitigaciones', icon: '⚠️' },
    { path: 'estimacion', label: 'Estimación de Tiempos', icon: '⏱️' },
    { path: 'hitos', label: 'Hitos Clave', icon: '🎯' },
    { path: 'metricas', label: 'Métricas de Éxito', icon: '📊' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        {/* <img 
          src="https://static.resumecoach.com/assets/rch/logo_desktop.png" 
          alt="Resume Coach Logo" 
          className={styles.logo}
        /> */}
        <h3>Resume<span className={styles.coach}>Coach</span></h3>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Plan de Migración</h1>
          <p className={styles.subtitle}>CV Legacy → CV-Hibrid</p>
        </div>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <p className={styles.version}>v1.0.0</p>
        <p className={styles.date}>Diciembre 2025</p>
      </div>
    </aside>
  );
};

export default Sidebar;

