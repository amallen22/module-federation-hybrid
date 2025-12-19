import { FC, ReactNode, useState } from 'react';
import styles from './PhaseCard.module.scss';

interface PhaseCardProps {
  title: string;
  duration: string;
  icon: string;
  children: ReactNode;
  status?: 'completed' | 'in-progress' | 'pending';
  defaultExpanded?: boolean;
}

const PhaseCard: FC<PhaseCardProps> = ({ 
  title, 
  duration, 
  icon, 
  children, 
  status = 'pending',
  defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.header} onClick={toggleExpanded}>
        <span className={styles.icon}>{icon}</span>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.duration}>⏱️ {duration}</span>
        </div>
        {status && (
          <span className={`${styles.badge} ${styles[`badge-${status}`]}`}>
            {status === 'completed' && '✅ Completado'}
            {status === 'in-progress' && '🔄 En Progreso'}
            {status === 'pending' && '⏳ Pendiente'}
          </span>
        )}
        <span className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}>
          ▼
        </span>
      </div>
      <div className={`${styles.content} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        {children}
      </div>
    </div>
  );
};

export default PhaseCard;

