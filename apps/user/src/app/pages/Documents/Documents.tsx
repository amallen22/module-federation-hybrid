import React from 'react';
import styles from './Documents.module.scss';

const Documents: React.FC = () => {
  return (
    <div className={styles.documents}>
      <header className={styles.header}>
        <h1>Mis Documentos</h1>
      </header>
      
      <div className={styles.content}>
        <p>Lista de documentos en desarrollo...</p>
      </div>
    </div>
  );
};

export default Documents;

