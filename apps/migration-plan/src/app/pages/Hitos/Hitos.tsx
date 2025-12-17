import { FC } from 'react';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import styles from '../ContextoGeneral/ContextoGeneral.module.scss';

const Hitos: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>🎯</span>
          Hitos Clave (Milestones)
        </h1>
        <p className={styles.subtitle}>
          Timeline acelerado con Cursor AI: 5 meses (Ene 2026 - Mayo 2026)
        </p>
      </div>

      <PhaseCard 
        title="⚡ Mes 1-2: Enero - Febrero 2026" 
        duration="Fase 1 + Inicio Fase 2"
        icon="🚀"
        status="in-progress"
        defaultExpanded={true}
      >
        <h4>✨ Con Cursor AI: 6-8 semanas → 3-4 semanas</h4>
        <ul>
          <li>✅ cv-app-login: Migración base (Webpack → Vite)</li>
          <li>✅ UI Kit base creado</li>
          <li>🎯 <strong>TanStack Query implementado en login</strong> (1 semana con Cursor AI)</li>
          <li>🎯 <strong>UI Kit completado</strong> (1-1.5 semanas con generación automática de componentes)</li>
          <li>🎯 <strong>cv-app-user migrado completo</strong> (2-2.5 semanas con refactoring automático)</li>
          <li>🎯 Upgrade de dependencias core (3-4 días)</li>
        </ul>
        <p style={{ marginTop: '12px', padding: '12px', background: '#dbeafe', borderRadius: '8px', fontSize: '14px' }}>
          <strong>🤖 Aceleración Cursor AI:</strong> Generación automática de componentes, tests y stories. Refactoring Redux→Zustand instantáneo.
        </p>
      </PhaseCard>

      <PhaseCard 
        title="⚡ Mes 3: Marzo 2026" 
        duration="Fase 2 Completa"
        icon="🔧"
      >
        <h4>✨ Con Cursor AI: 14-16 semanas → 6-8 semanas (Mes 2-3)</h4>
        <ul>
          <li>🎯 <strong>cv-app-shop migrado</strong> (1-1.5 semanas)</li>
          <li>🎯 <strong>cv-app-payment migrado</strong> (1 semana)</li>
          <li>🎯 <strong>cv-app-share migrado</strong> (3-4 días)</li>
          <li>🎯 <strong>cv-lib-app-components deprecado</strong> (1.5-2 semanas en paralelo)</li>
          <li>🎯 <strong>Deploy en producción de login + user + shop</strong> (canary)</li>
          <li>🎯 Apps secundarias (backoffice, crm) en progreso</li>
        </ul>
        <p style={{ marginTop: '12px', padding: '12px', background: '#dbeafe', borderRadius: '8px', fontSize: '14px' }}>
          <strong>🤖 Aceleración Cursor AI:</strong> Migración Redux→Zustand/TanStack Query automática. Conversión class→functional components instantánea.
        </p>
      </PhaseCard>

      <PhaseCard 
        title="⚡ Mes 4-5: Abril - Mayo 2026" 
        duration="Fase 3: Editor Completo"
        icon="⚡"
      >
        <h4>✨ Con Cursor AI: 15-18 semanas → 6-9 semanas</h4>
        <ul>
          <li>🎯 <strong>cv-app-editor: Jest → Vitest</strong> (3-4 días con conversión automática)</li>
          <li>🎯 <strong>cv-app-editor: Redux → Zustand + TanStack Query</strong> (1.5-2 semanas con IA)</li>
          <li>🎯 <strong>cv-app-editor: Migración de componentes con TDD</strong> (3-4 semanas):
            <ul style={{ marginLeft: '20px', marginTop: '6px' }}>
              <li>Cursor genera tests desde especificaciones</li>
              <li>Refactoring automático manteniendo funcionalidad</li>
              <li>TypeScript types inferidos automáticamente</li>
            </ul>
          </li>
          <li>🎯 <strong>Integración y optimización</strong> (1 semana)</li>
          <li>🎯 <strong>Deploy en producción de editor</strong> (canary)</li>
        </ul>
        <p style={{ marginTop: '12px', padding: '12px', background: '#dbeafe', borderRadius: '8px', fontSize: '14px' }}>
          <strong>🤖 Aceleración Cursor AI:</strong> TDD asistido con generación automática de tests. Separación automática de server state vs client state.
        </p>
      </PhaseCard>

      <PhaseCard 
        title="🎉 Mayo - Junio 2026: Finalización y Deploy" 
        duration="Limpieza y Producción"
        icon="🏁"
      >
        <ul>
          <li>🎯 <strong>Deploy completo en producción</strong> de todas las apps (canary → 100%)</li>
          <li>🎯 <strong>Monitoreo intensivo</strong> y ajustes basados en feedback</li>
          <li>🎯 <strong>Deprecación completa de apps legacy</strong></li>
          <li>🎯 <strong>Documentación final</strong> y knowledge transfer</li>
          <li>🎯 <strong>Retrospectiva</strong> y lecciones aprendidas</li>
          <li>🎯 <strong>Optimización de performance</strong> post-lanzamiento</li>
        </ul>
        <div style={{ marginTop: '12px', padding: '16px', background: '#d1fae5', borderRadius: '8px', border: '2px solid #10b981' }}>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: 600, color: '#065f46' }}>
            🚀 <strong>Proyecto Completado:</strong> De 10 meses tradicionales a 5 meses con Cursor AI (50% de reducción)
          </p>
        </div>
      </PhaseCard>

      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>✅</span>
          <span className={styles.statValue}>Mes 1-2</span>
          <span className={styles.statLabel}>En Progreso</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>⏳</span>
          <span className={styles.statValue}>Mes 3</span>
          <span className={styles.statLabel}>Pendiente</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>⏳</span>
          <span className={styles.statValue}>Mes 4-5</span>
          <span className={styles.statLabel}>Pendiente</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>🎯</span>
          <span className={styles.statValue}>Mayo</span>
          <span className={styles.statLabel}>Meta Final</span>
        </div>
      </div>
    </div>
  );
};

export default Hitos;

