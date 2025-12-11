import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';

export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'action' | 'document';
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

export const Card: FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  onClick,
  as: Component = 'div',
}) => {
  return (
    <Component
      className={classNames(styles.card, styles[`card--${variant}`], className)}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

