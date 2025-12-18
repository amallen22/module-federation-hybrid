import { FC } from 'react';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import styles from '../ContextoGeneral/ContextoGeneral.module.scss';

const Riesgos: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>⚠️</span>
          Riesgos y Mitigaciones
        </h1>
        <p className={styles.subtitle}>
          Identificación proactiva de riesgos y estrategias de mitigación
        </p>
      </div>

      <PhaseCard 
        title="Riesgos Técnicos" 
        duration="Alto Impacto"
        icon="🔧"
      >
        <h4>1. Breaking Changes en APIs Internas</h4>
        <p><strong>Mitigación:</strong> Mantener contratos de API estables, versionado</p>

        <h4>2. Performance de Module Federation</h4>
        <p><strong>Mitigación:</strong> Testing de performance, code splitting, lazy loading</p>

        <h4>3. Complejidad de Estado Compartido</h4>
        <p><strong>Mitigación:</strong> Event bus o state management centralizado en shell</p>

        <h4>4. Dependencias Legacy Incompatibles</h4>
        <p><strong>Mitigación:</strong> Polyfills, wrappers, o reescribir funcionalidad</p>

        <h4>5. Integración de TanStack Query con Module Federation</h4>
        <p><strong>Mitigación:</strong> Singleton QueryClient compartido, testing exhaustivo de cache invalidation</p>
      </PhaseCard>

      <PhaseCard 
        title="Riesgos de Negocio" 
        duration="Medio-Alto Impacto"
        icon="💼"
      >
        <h4>1. Regresiones Funcionales</h4>
        <p><strong>Mitigación:</strong> TDD, E2E testing, QA exhaustivo, canary deploys</p>

        <h4>2. Downtime en Producción</h4>
        <p><strong>Mitigación:</strong> Blue-green deployments, feature flags, rollback plan</p>

        <h4>3. Retraso en Roadmap de Features</h4>
        <p><strong>Mitigación:</strong> Priorización clara, migración incremental</p>

        <h4>4. Resistencia al Cambio del Equipo</h4>
        <p><strong>Mitigación:</strong> Training, documentación extensa, pair programming</p>

        <h4>5. Subestimación de Complejidad (Editor)</h4>
        <p><strong>Mitigación:</strong> Buffer adicional en estimaciones, spikes técnicos previos</p>
      </PhaseCard>

      <PhaseCard 
        title="Estrategia de Despliegue Gradual" 
        duration="Reducir Riesgos"
        icon="🚀"
      >
        <h4>Fase de Coexistencia</h4>
        <ul>
          <li>Legacy y nuevo sistema corriendo en paralelo</li>
          <li>Feature flags para habilitar microfrontends gradualmente</li>
          <li>Monitoreo intensivo de errores y performance</li>
          <li>Rollback inmediato si hay problemas críticos</li>
        </ul>

        <h4>Por Microfrontend</h4>
        <ol>
          <li>Deploy a staging</li>
          <li>Testing QA exhaustivo</li>
          <li>Deploy a producción con feature flag disabled</li>
          <li>Habilitar para % pequeño de usuarios (5-10%)</li>
          <li>Monitorear métricas (errores, performance, conversión)</li>
          <li>Incrementar % gradualmente (25%, 50%, 100%)</li>
          <li>Deprecar versión legacy</li>
        </ol>

        <h4>Rollback Strategy</h4>
        <ul>
          <li>Feature flags para revertir a legacy instantáneamente</li>
          <li>Backups de estado/datos</li>
          <li>Plan de comunicación a usuarios</li>
          <li>Monitoreo 24/7 durante primeras semanas</li>
        </ul>
      </PhaseCard>
    </div>
  );
};

export default Riesgos;


