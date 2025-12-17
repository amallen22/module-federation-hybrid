import { FC } from 'react';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import styles from '../ContextoGeneral/ContextoGeneral.module.scss';

const Fase2: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>🔧</span>
          Fase 2: Desacoplamiento del Proyecto Legacy
        </h1>
        <p className={styles.subtitle}>
          Duración Estimada: 12-16 semanas (2 desarrolladores)
        </p>
      </div>

      <PhaseCard 
        title="2.1 cv-app-login" 
        duration="Completado parcialmente"
        icon="🔐"
        status="completed"
      >
        <h4>Estado Actual</h4>
        <ul>
          <li>✅ Webpack → Vite</li>
          <li>✅ React 16 → 18</li>
          <li>✅ Jest → Vitest</li>
          <li>✅ Componentes MUI básicos reemplazados</li>
          <li>✅ Module Federation configurado</li>
          <li>✅ Puerto: 5003</li>
          <li>⚠️ PENDIENTE: Migrar a TanStack Query</li>
        </ul>

        <h4>Tareas Pendientes (1-2 semanas)</h4>
        <ul>
          <li>Implementar TanStack Query para autenticación</li>
          <li>Migrar llamadas API a hooks de TanStack Query</li>
          <li>Implementar manejo de errores con TanStack Query</li>
          <li>Configurar QueryClient con estrategias de cache</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="2.2 cv-app-user" 
        duration="4-5 semanas"
        icon="👤"
        status="in-progress"
      >
        <h4>Análisis de Complejidad</h4>
        <ul>
          <li>~231 archivos JS/TS</li>
          <li>Redux Toolkit con múltiples slices</li>
          <li>~50+ componentes React</li>
          <li>React Router v6 (ya actualizado)</li>
          <li>Uso extensivo de MUI</li>
        </ul>

        <h4>Subtareas</h4>
        <ul>
          <li>Semana 1: Setup y preparación</li>
          <li>Semana 2-3: Migración de componentes core</li>
          <li>Semana 3-4: Redux → Zustand + TanStack Query</li>
          <li>Semana 4-5: Integración y testing</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="2.3 cv-app-shop" 
        duration="2-3 semanas"
        icon="🛒"
      >
        <ul>
          <li>Flujo crítico de compra</li>
          <li>~150-200 archivos estimados</li>
          <li>Redux → Zustand + TanStack Query</li>
          <li>Integración con payment</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="2.4 cv-app-payment" 
        duration="2 semanas"
        icon="💳"
      >
        <ul>
          <li>Procesamiento de pagos</li>
          <li>Múltiples gateways</li>
          <li>Testing exhaustivo requerido</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="2.5 Otras Apps" 
        duration="Variable"
        icon="📦"
      >
        <ul>
          <li>cv-app-share (1 semana)</li>
          <li>cv-app-crm (2-3 semanas)</li>
          <li>cv-lib-app-components (3-4 semanas - paralelo)</li>
          <li>Shell updates (distribuido)</li>
        </ul>
      </PhaseCard>
    </div>
  );
};

export default Fase2;

