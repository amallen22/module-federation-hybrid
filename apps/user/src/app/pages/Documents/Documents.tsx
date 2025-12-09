import React from 'react';
import { useDocuments } from '../../hooks/queries/useDocuments';
import styles from './Documents.module.scss';

const Documents: React.FC = () => {
  const { data: documents, isLoading, error } = useDocuments();

  return (
    <div className={styles.documents}>
      <header className={styles.header}>
        <h1>Mis Documentos</h1>
      </header>
      
      <div className={styles.content}>
        {isLoading && <div className={styles.loading}>Cargando documentos...</div>}
        
        {error && (
          <div className={styles.error}>
            Error al cargar los documentos. Por favor, intenta de nuevo.
          </div>
        )}
        
        {documents && documents.length === 0 && (
          <div className={styles.empty}>
            <p>No tienes documentos aún.</p>
            <p>Crea tu primer CV para comenzar.</p>
          </div>
        )}
        
        {documents && documents.length > 0 && (
          <div className={styles.list}>
            {documents.map((doc) => (
              <div key={doc.id} className={styles.documentCard}>
                <div className={styles.documentInfo}>
                  <h3>{doc.name}</h3>
                  <p className={styles.documentType}>{doc.type}</p>
                </div>
                <div className={styles.documentMeta}>
                  <span>Actualizado: {new Date(doc.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;

