import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Card } from '../Card';
import styles from './ActionCard.module.scss';

export interface ActionCardProps {
  badge?: string;
  badgeVariant?: 'next-step' | 'recommended' | 'essential';
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  children?: ReactNode;
  className?: string;
}

export const ActionCard: FC<ActionCardProps> = ({
  badge,
  badgeVariant = 'next-step',
  title,
  description,
  actionText,
  onAction,
  children,
  className,
}) => {
  return (
    <Card variant="action" className={classNames(styles.actionCard, className)}>
      {badge && (
        <div className={classNames(styles.badge, styles[`badge--${badgeVariant}`])}>
          {badge}
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {actionText && (
          <button className={styles.actionButton} onClick={onAction}>
            {actionText}
          </button>
        )}
        {children}
      </div>
    </Card>
  );
};

