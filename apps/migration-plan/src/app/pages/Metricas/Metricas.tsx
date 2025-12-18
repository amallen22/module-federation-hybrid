import { FC } from 'react';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import styles from '../ContextoGeneral/ContextoGeneral.module.scss';

const Metricas: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>📊</span>
          Métricas de Éxito
        </h1>
        <p className={styles.subtitle}>
          Indicadores clave de rendimiento (KPIs) para medir el éxito de la migración
        </p>
      </div>

      <PhaseCard 
        title="Métricas Técnicas" 
        duration="Objetivos Cuantitativos"
        icon="🔧"
      >
        <h4>Dependencias y Modernización</h4>
        <ul>
          <li>✅ Zero dependencias de Material-UI</li>
          <li>✅ Zero dependencias de Redux</li>
          <li>✅ Zero dependencias de Webpack</li>
          <li>✅ Zero dependencias de Jest</li>
          <li>✅ TypeScript strict mode habilitado</li>
        </ul>

        <h4>Calidad del Código</h4>
        <ul>
          <li>✅ Test coverage &gt; 80%</li>
          <li>✅ Todos los componentes con Storybook stories</li>
          <li>✅ Zero vulnerabilidades críticas en pnpm audit</li>
          <li>✅ ESLint warnings &lt; 10</li>
        </ul>

        <h4>Performance</h4>
        <ul>
          <li>✅ Bundle size reducido 30-40%</li>
          <li>✅ Build time &lt; 30s por microfrontend</li>
          <li>✅ HMR &lt; 200ms (Vite)</li>
          <li>✅ First Contentful Paint (FCP) &lt; 1.5s</li>
          <li>✅ Time to Interactive (TTI) &lt; 3s</li>
        </ul>

        <h4>Arquitectura</h4>
        <ul>
          <li>✅ Todos los microfrontends desplegables independientemente</li>
          <li>✅ Module Federation funcionando en producción</li>
          <li>✅ Shared dependencies correctamente configuradas</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="Métricas de Negocio" 
        duration="Impacto en el Producto"
        icon="💼"
      >
        <h4>Despliegue y Operaciones</h4>
        <ul>
          <li>✅ Zero downtime en deploys</li>
          <li>✅ Time to deploy &lt; 10 minutos por microfrontend</li>
          <li>✅ Rollback time &lt; 5 minutos</li>
          <li>✅ Canary deploys implementados</li>
        </ul>

        <h4>Desarrollo</h4>
        <ul>
          <li>✅ Velocity de desarrollo aumentada 30-50%</li>
          <li>✅ Time to market para nuevas features reducido 40%</li>
          <li>✅ Developer satisfaction &gt; 8/10</li>
          <li>✅ Onboarding time para nuevos devs &lt; 2 semanas</li>
        </ul>

        <h4>Calidad y Estabilidad</h4>
        <ul>
          <li>✅ Bug rate reducido 40%</li>
          <li>✅ Critical bugs in production &lt; 5/month</li>
          <li>✅ Mean Time to Recovery (MTTR) &lt; 2 hours</li>
          <li>✅ Error rate &lt; 0.1%</li>
        </ul>

        <h4>Usuario Final</h4>
        <ul>
          <li>✅ Performance igual o mejor (Core Web Vitals)</li>
          <li>✅ User satisfaction mantenida o mejorada</li>
          <li>✅ Conversion rate mantenida o mejorada</li>
          <li>✅ Zero quejas sobre nuevas features migradas</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="Métricas de TanStack Query" 
        duration="Gestión de Estado Asíncrono"
        icon="🔄"
      >
        <h4>Cache y Performance</h4>
        <ul>
          <li>✅ Cache hit rate &gt; 70%</li>
          <li>✅ Average API response time &lt; 500ms</li>
          <li>✅ Reducción de llamadas API redundantes 50%</li>
          <li>✅ Optimistic updates implementadas en operaciones críticas</li>
        </ul>

        <h4>Experiencia de Usuario</h4>
        <ul>
          <li>✅ Loading states consistentes en toda la app</li>
          <li>✅ Error handling unificado</li>
          <li>✅ Retry automático funcionando correctamente</li>
          <li>✅ Stale data revalidation &lt; 5 segundos</li>
        </ul>
      </PhaseCard>

      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>📉</span>
          <span className={styles.statValue}>-40%</span>
          <span className={styles.statLabel}>Bundle Size</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>⚡</span>
          <span className={styles.statValue}>+50%</span>
          <span className={styles.statLabel}>Dev Velocity</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>🐛</span>
          <span className={styles.statValue}>-40%</span>
          <span className={styles.statLabel}>Bug Rate</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>⏱️</span>
          <span className={styles.statValue}>&lt;10min</span>
          <span className={styles.statLabel}>Deploy Time</span>
        </div>
      </div>
    </div>
  );
};

export default Metricas;


