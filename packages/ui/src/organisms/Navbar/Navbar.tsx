import React, { FC, ReactNode } from 'react';
import styles from './Navbar.module.scss';

export interface NavbarMenuItem {
  label: string;
  path: string;
  isActive?: boolean;
  badge?: number | string;
  hasNotification?: boolean;
}

export interface NavbarProps {
  /** Items del menú de navegación */
  menuItems: NavbarMenuItem[];
  /** Nombre del usuario */
  userName?: string;
  /** URL del avatar del usuario */
  userAvatar?: string;
  /** Idioma seleccionado (ISO code, ej: 'en', 'es') */
  language?: string;
  /** Mostrar botón de upgrade */
  showUpgrade?: boolean;
  /** Callback cuando se hace click en un item del menú */
  onMenuItemClick?: (path: string) => void;
  /** Callback cuando se hace click en el botón de upgrade */
  onUpgradeClick?: () => void;
  /** Callback cuando se hace click en el selector de idioma */
  onLanguageClick?: () => void;
  /** Callback cuando se hace click en el avatar/usuario */
  onUserMenuClick?: () => void;
  /** Componente personalizado para el logo (opcional) */
  logoComponent?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({
  menuItems = [],
  userName = 'User',
  userAvatar,
  language = 'en',
  showUpgrade = true,
  onMenuItemClick,
  onUpgradeClick,
  onLanguageClick,
  onUserMenuClick,
  logoComponent,
}) => {
  const languageFlags: Record<string, string> = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷',
    de: '🇩🇪',
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftContent}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          {logoComponent || (
            <div className={styles.logoDefault}>
              <span className={styles.resume}>Resume</span>
              <span className={styles.coach}>Coach</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Menu Items */}
        <div className={styles.menuItems}>
          {menuItems.map((item, index) => (
            <button
              key={`${item.path}-${index}`}
              className={`${styles.menuItem} ${item.isActive ? styles.active : ''}`}
              onClick={() => onMenuItemClick?.(item.path)}
            >
              <span className={styles.menuLabel}>
                {item.label}
                {item.hasNotification && <span className={styles.notificationDot} />}
              </span>
              {item.badge !== undefined && (
                <span className={styles.badge}>{item.badge}</span>
              )}
              {item.isActive && <div className={styles.activeIndicator} />}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.rightContent}>
        {/* Language Selector */}
        <button className={styles.languageSelector} onClick={onLanguageClick}>
          <span className={styles.flag}>{languageFlags[language] || '🇺🇸'}</span>
          <span className={styles.dropdownIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Upgrade Button */}
        {showUpgrade && (
          <button className={styles.upgradeButton} onClick={onUpgradeClick}>
            UPGRADE NOW
          </button>
        )}

        {/* User Menu */}
        <button className={styles.userMenu} onClick={onUserMenuClick}>
          <div className={styles.avatar}>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className={styles.avatarImage} />
            ) : (
              <span className={styles.avatarPlaceholder}>
                {userName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.dropdownIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
};

Navbar.displayName = 'Navbar';


