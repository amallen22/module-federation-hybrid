import React, { useMemo, memo } from 'react';
import { useAuth } from '@packages/auth';
import { ActionCard, DocumentPreview, ArticleList } from '@packages/ui';
import { useUserProfile } from '../../hooks/queries/useUser';
import { useDocuments } from '../../hooks/queries/useDocuments';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = memo(() => {
  const { user: authUser, isAuthenticated, hasHydrated } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: documents } = useDocuments();

  // Esperar a que el store se hidrate antes de verificar autenticación
  if (!hasHydrated) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.loading}>Cargando...</div>
      </div>
    );
  }

  // Show message if not authenticated (don't use Navigate to avoid infinite loops)
  if (!isAuthenticated) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.error}>
          <h2>No autenticado</h2>
          <p>Por favor, inicia sesión para acceder a esta página.</p>
          <a href="/login">Ir a Login</a>
        </div>
      </div>
    );
  }

  // Memoizar valores calculados
  // Priorizar datos del store de autenticación si están disponibles
  const firstName = useMemo(
    () => profile?.firstName || authUser?.firstName || 'Usuario',
    [profile?.firstName, authUser?.firstName]
  );

  const welcomeMessage = useMemo(
    () => {
      if (profileLoading) return 'Cargando...';
      return `Hi! ${firstName} get ready to land your dream job`;
    },
    [profileLoading, firstName]
  );

  const firstDocument = useMemo(
    () => documents?.[0] || null,
    [documents]
  );

  // Artículos para TOP READS
  const topReadsArticles = useMemo(
    () => [
      { title: 'Most Common Interview Questions', readTime: '9 min' },
      { title: 'How to Write a Resume that Gets Results', readTime: '4 min' },
      { title: 'Are Cover Letters Still Useful?', readTime: '5 min' },
      { title: 'How to Get a Job Fast', readTime: '6 min' },
      { title: 'Level Up Your Resume Using AI', readTime: '5 min' },
    ],
    []
  );

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.welcome}>{welcomeMessage}</h1>
      </header>
      
      <div className={styles.content}>
        <div className={styles.grid}>
          {/* NEXT STEP: Get your resume reviewed by experts */}
          <div className={styles.cardRow}>
            <ActionCard
              badge="NEXT STEP"
              badgeVariant="next-step"
              title="Get your resume reviewed by experts"
              description="Receive professional feedback in seconds, then apply to your dream job."
              actionText="Request resume review"
              onAction={() => {
                // TODO: Implementar acción
                console.log('Request resume review');
              }}
            >
              <div className={styles.resumeReviewVisual}>
                <div className={styles.personIcon}>👤</div>
                <div className={styles.resumeIcon}>📄</div>
              </div>
            </ActionCard>
          </div>

          {/* Document Preview */}
          <div className={styles.cardRow}>
            <DocumentPreview
              title={firstDocument?.name || 'Document untitled'}
              isEditable={!!firstDocument}
              onEdit={() => {
                // TODO: Implementar edición
                console.log('Edit document');
              }}
              onNew={() => {
                // TODO: Implementar nuevo documento
                console.log('New resume');
              }}
              preview={
                firstDocument ? (
                  <div className={styles.documentPreviewContent}>
                    <div className={styles.documentHeader}>
                      <h3>{firstDocument.name || 'Untitled Resume'}</h3>
                    </div>
                    <div className={styles.documentBody}>
                      <p>CONTACT</p>
                      <p>SUMMARY</p>
                      <p>EXPERIENCE</p>
                      <p>EDUCATION</p>
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyDocument}>
                    <p>No documents yet</p>
                    <p>Create your first resume to get started</p>
                  </div>
                )
              }
              actions={[
                { label: 'Edit', icon: '✏️', onClick: () => console.log('Edit') },
                { label: 'Download', icon: '⬇️', onClick: () => console.log('Download') },
                { label: 'Online resume', icon: '🌐', onClick: () => console.log('Online resume') },
              ]}
            />
          </div>

          {/* RECOMMENDED: Every resume needs a cover letter */}
          <div className={styles.cardRow}>
            <ActionCard
              badge="RECOMMENDED"
              badgeVariant="recommended"
              title="Every resume needs a cover letter"
              description="Double your chances with a customized cover letter."
              actionText="Create cover letter"
              onAction={() => {
                // TODO: Implementar acción
                console.log('Create cover letter');
              }}
            />
          </div>

          {/* ESSENTIAL: Discover your online resume */}
          <div className={styles.cardRow}>
            <ActionCard
              badge="ESSENTIAL"
              badgeVariant="essential"
              title="Discover your online resume"
              description="Copy and paste a unique URL for easy sharing and keep track of views."
              actionText="View my online resume"
              onAction={() => {
                // TODO: Implementar acción
                console.log('View online resume');
              }}
            />
          </div>

          {/* TOP READS */}
          <div className={styles.cardRow}>
            <ArticleList
              title="TOP READS"
              articles={topReadsArticles}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;

