import React, { FC } from 'react';
import classNames from 'classnames';
import { Card } from '../Card';
import styles from './DocumentPreview.module.scss';

export interface DocumentPreviewProps {
  title?: string;
  isEditable?: boolean;
  onEdit?: () => void;
  onNew?: () => void;
  preview?: React.ReactNode;
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }>;
  className?: string;
}

export const DocumentPreview: FC<DocumentPreviewProps> = ({
  title = 'Document untitled',
  isEditable = true,
  onEdit,
  onNew,
  preview,
  actions = [],
  className,
}) => {
  return (
    <Card variant="document" className={classNames(styles.documentPreview, className)}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {title}
            {isEditable && (
              <button className={styles.editIcon} onClick={onEdit} aria-label="Edit title">
                ✏️
              </button>
            )}
          </h3>
          {onNew && (
            <button className={styles.newButton} onClick={onNew}>
              + New Resume
            </button>
          )}
        </div>
      </div>

      {preview && <div className={styles.preview}>{preview}</div>}

      {actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <button
              key={index}
              className={styles.actionButton}
              onClick={action.onClick}
            >
              {action.icon && <span className={styles.icon}>{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
};

