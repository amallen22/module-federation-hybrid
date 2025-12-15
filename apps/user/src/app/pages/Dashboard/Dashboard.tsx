import React, { useMemo, memo } from 'react';
import { useAuth } from '@packages/auth';
import { Navbar, ActionCard, DocumentPreview, ArticleList } from '@packages/ui';
import { useUserProfile } from '../../hooks/queries/useUser';
import { useDocuments } from '../../hooks/queries/useDocuments';
import { useSubscription } from '../../hooks/queries/useSubscription';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = memo(() => {
  const { user: authUser, isAuthenticated, hasHydrated } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: documents } = useDocuments();
  const { data: subscription } = useSubscription();

  // Esperar a que el store se hidrate antes de verificar autenticación
  if (!hasHydrated) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Cargando...</div>
      </div>
    );
  }

  // Show message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>No autenticado</h2>
          <p>Por favor, inicia sesión para acceder a esta página.</p>
          <a href="/login">Ir a Login</a>
        </div>
      </div>
    );
  }

  // Datos computados
  const firstName = useMemo(
    () => profile?.firstName || authUser?.firstName || 'David',
    [profile?.firstName, authUser?.firstName]
  );

  const welcomeMessage = useMemo(
    () => {
      if (profileLoading) return 'Cargando...';
      return `Hi ${firstName}, get ready to land your dream job`;
    },
    [profileLoading, firstName]
  );

  const firstDocument = useMemo(
    () => documents?.[0] || null,
    [documents]
  );

  const documentsCount = useMemo(
    () => documents?.length || 3,
    [documents?.length]
  );

  // Artículos para TOP READS
  const topReadsArticles = useMemo(
    () => [
      { title: 'Level Up Your Resume Using AI', readTime: '5 min' },
      { title: 'Most Common Interview Questions', readTime: '9 min' },
      { title: 'How to Write a Resume in 2023 That...', readTime: '4 min' },
      { title: 'Are Cover Letters Still Useful?', readTime: '5 min' },
      { title: 'How to Get a Job Fast', readTime: '6 min' },
    ],
    []
  );

  // Menu items para el Navbar
  const navbarMenuItems = useMemo(
    () => [
      { label: 'Dashboard', path: '/dashboard', isActive: true },
      { label: 'Documents', path: '/documents', badge: documentsCount },
      { label: 'Resume review', path: '/resume-review', hasNotification: true },
    ],
    [documentsCount]
  );

  const userName = useMemo(
    () => {
      if (profile?.firstName && profile?.lastName) {
        return `${profile.firstName} ${profile.lastName}`;
      }
      if (authUser?.firstName) {
        return authUser.firstName;
      }
      return 'David Soriano';
    },
    [profile, authUser]
  );

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <Navbar
        menuItems={navbarMenuItems}
        userName={userName}
        language="en"
        showUpgrade={subscription?.plan !== 'premium'}
        onMenuItemClick={(path) => {
          console.log('Navigate to:', path);
          // TODO: Implementar navegación
        }}
        onUpgradeClick={() => {
          console.log('Upgrade clicked');
          // TODO: Implementar modal de upgrade
        }}
        onLanguageClick={() => {
          console.log('Language clicked');
          // TODO: Implementar selector de idioma
        }}
        onUserMenuClick={() => {
          console.log('User menu clicked');
          // TODO: Implementar dropdown de usuario
        }}
      />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Hero Heading */}
          <h1 className={styles.hero}>{welcomeMessage}</h1>

          {/* Layout Grid */}
          <div className={styles.grid}>
            {/* Módulo Promo 01 - NEXT STEP: Resume Review */}
            <div className={styles.promoLarge}>
              <div className={styles.promoContent}>
                <span className={styles.badgeNextStep}>NEXT STEP</span>
                <h2 className={styles.promoTitle}>
                  Get your resume reviewed by experts
                </h2>
                <p className={styles.promoDescription}>
                  Receive professional feedback within 48h, then apply to your dream job.
                </p>
                <button className={styles.ctaLink}>Request resume review</button>
              </div>
              <div className={styles.promoIllustration}>
                {/* Ilustración de revisión - placeholder por ahora */}
                <div className={styles.reviewVisual}>
                  <div className={styles.documentPreview}>
                    <div className={styles.docHeader}></div>
                    <div className={styles.docLines}>
                      <div className={styles.line}></div>
                      <div className={styles.line}></div>
                      <div className={styles.line}></div>
                      <div className={styles.line}></div>
                    </div>
                  </div>
                  <div className={styles.scanEffect}></div>
                </div>
              </div>
            </div>

            {/* Módulo Doc Preview */}
            <div className={styles.docPreviewModule}>
              <div className={styles.docPreviewHeader}>
                <div className={styles.docTitle}>
                  <span>{firstDocument?.name || 'David Soriano CV'}</span>
                  <button className={styles.editIcon} aria-label="Edit title">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.5 14.375v3.125h3.125l9.219-9.219-3.125-3.125L2.5 14.375zm14.781-8.531a.831.831 0 000-1.175l-1.95-1.95a.831.831 0 00-1.175 0l-1.525 1.525 3.125 3.125 1.525-1.525z" />
                    </svg>
                  </button>
                </div>
                <button className={styles.newResumeBtn}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>New resume</span>
                </button>
              </div>
              <div className={styles.docPreviewBody}>
                {firstDocument ? (
                  <div className={styles.documentThumbnail}>
                    <div className={styles.thumbnailHeader}>
                      <div className={styles.avatar}></div>
                      <div className={styles.headerInfo}>
                        <div className={styles.name}>JONATHAN IVERSSON</div>
                        <div className={styles.contact}></div>
                      </div>
                    </div>
                    <div className={styles.thumbnailSections}>
                      <div className={styles.section}>CONTACT</div>
                      <div className={styles.section}>SUMMARY</div>
                      <div className={styles.section}>EXPERIENCE</div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyDoc}>
                    <p>No documents yet</p>
                  </div>
                )}
              </div>
              <div className={styles.docToolbar}>
                <div className={styles.docActions}>
                  <button className={styles.docAction}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.5 14.375v3.125h3.125l9.219-9.219-3.125-3.125L2.5 14.375zm14.781-8.531a.831.831 0 000-1.175l-1.95-1.95a.831.831 0 00-1.175 0l-1.525 1.525 3.125 3.125 1.525-1.525z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <div className={styles.actionDivider}></div>
                  <button className={styles.docAction}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 7.5h-3.75v-5H5a1.25 1.25 0 00-1.25 1.25v12.5A1.25 1.25 0 005 17.5h10a1.25 1.25 0 001.25-1.25V7.5zm-6.25 7.5h-5v-1.25h5V15zm2.5-2.5h-7.5v-1.25h7.5V12.5zm0-2.5h-7.5V8.75h7.5V10zm1.25-5v-2.813L15.313 5H12.5z" />
                    </svg>
                    <span>Download</span>
                  </button>
                  <div className={styles.actionDivider}></div>
                  <button className={styles.docAction}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm0 13.75a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z" />
                      <path d="M10 5.625a.625.625 0 00-.625.625v3.75c0 .166.066.325.184.442l2.5 2.5a.625.625 0 00.884-.884L10.625 9.74V6.25A.625.625 0 0010 5.625z" />
                    </svg>
                    <span>Online resume</span>
                  </button>
                </div>
                <button className={styles.moreOptions}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="6" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="18" cy="12" r="1.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Módulos Promo 02 */}
            <div className={styles.promoRow}>
              {/* Cover Letter - RECOMMENDED */}
              <div className={styles.promoMedium}>
                <span className={styles.badgeRecommended}>RECOMMENDED</span>
                <h3 className={styles.promoTitleMedium}>
                  Every resume needs a cover letter
                </h3>
                <p className={styles.promoDescriptionMedium}>
                  Double your chances with a customized cover letter.
                </p>
                <button className={styles.ctaLink}>Create cover letter</button>
              </div>

              {/* Online Resume - ESSENTIAL */}
              <div className={styles.promoMedium}>
                <span className={styles.badgeEssential}>ESSENTIAL</span>
                <h3 className={styles.promoTitleMedium}>
                  Discover your online resume
                </h3>
                <p className={styles.promoDescriptionMedium}>
                  Copy and paste a URL for easy sharing and keep track of views.
                </p>
                <button className={styles.ctaLink}>View my online resume</button>
              </div>
            </div>

            {/* TOP READS Module */}
            <div className={styles.topReadsModule}>
              <h4 className={styles.topReadsTitle}>TOP READS</h4>
              <div className={styles.articlesList}>
                {topReadsArticles.map((article, index) => (
                  <div key={index} className={styles.articleItem}>
                    <div className={styles.articleIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className={styles.articleTitle}>{article.title}</span>
                    <div className={styles.articleReadTime}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1.333A6.667 6.667 0 1014.667 8 6.674 6.674 0 008 1.333zm0 12A5.333 5.333 0 1113.333 8 5.339 5.339 0 018 13.333zM8 4a.667.667 0 00-.667.667v3.666a.667.667 0 00.195.472l2 2a.667.667 0 00.943-.943L8.667 8.057V4.667A.667.667 0 008 4z" />
                      </svg>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
