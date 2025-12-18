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
          Con Cursor AI: 8-10 semanas | Tradicional: 16-20 semanas
        </p>
      </div>

      <PhaseCard 
        title="2.1 cv-app-login (TanStack Query)" 
        duration="0.5-1 semana con IA ⚡"
        icon="🔐"
        status="in-progress"
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

        <h4>Con Cursor AI (0.5-1 semana)</h4>
        <ul>
          <li>✨ Cursor refactoriza API calls automáticamente</li>
          <li>✨ Genera hooks de TanStack Query con tipos</li>
          <li>✨ Implementa error handling y cache strategies</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="2.2 cv-app-user" 
        duration="2.5-3 semanas con IA ⚡"
        icon="👤"
        status="in-progress"
      >
        <h4>Análisis de Complejidad</h4>
        <ul>
          <li><strong>231 archivos</strong> JS/TS (alto volumen)</li>
          <li>Redux Toolkit con múltiples slices complejos</li>
          <li>~50+ componentes React</li>
          <li>React Router v6 (ya actualizado)</li>
          <li>Uso extensivo de MUI en todos los componentes</li>
        </ul>

        <h4>Aceleración con Cursor AI</h4>
        <ul>
          <li>✨ Cursor convierte 231 archivos JS → TypeScript en batch</li>
          <li>✨ Migra Redux → Zustand + TanStack Query automáticamente</li>
          <li>✨ Refactoriza class components → functional en segundos</li>
          <li>✨ Reemplaza MUI por componentes custom con prompts</li>
          <li>⚡ 50% más rápido: 2.5-3 semanas vs 5-6 tradicional</li>
        </ul>

        <h4>Subtareas</h4>
        <ul>
          <li>Setup y configuración (2-3 días)</li>
          <li>Conversión masiva JS → TS con IA (1 semana)</li>
          <li>Redux → Zustand + TanStack Query (1 semana)</li>
          <li>Migración componentes y MUI (0.5-1 semana)</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="2.3 cv-lib-app-components" 
        duration="1.5-2 semanas con IA ⚡"
        icon="🧩"
      >
        <ul>
          <li>✨ Cursor migra componentes a packages/ui automáticamente</li>
          <li>✨ Actualiza imports en todas las apps al instante</li>
          <li>Deprecación gradual de librería legacy</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="2.4 cv-app-shop" 
        duration="1.5-2 semanas con IA ⚡"
        icon="🛒"
      >
        <ul>
          <li>Flujo crítico de compra (alta complejidad)</li>
          <li>✨ Cursor migra lógica de carrito y checkout</li>
          <li>✨ Redux → Zustand + TanStack Query automático</li>
          <li>Dev se enfoca 100% en testing exhaustivo</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="2.5 cv-app-payment" 
        duration="1-1.5 semanas con IA ⚡"
        icon="💳"
      >
        <ul>
          <li>Procesamiento de pagos (crítico)</li>
          <li>✨ Cursor migra integraciones de payment gateways</li>
          <li>✨ TanStack Query para transacciones y estados</li>
          <li>Dev enfocado en testing crítico de seguridad</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="2.6 Otras Apps" 
        duration="0.5-1 semana con IA ⚡"
        icon="📦"
      >
        <ul>
          <li>cv-app-share (0.5-1 semana con IA)</li>
          <li>cv-app-crm (opcional, baja prioridad)</li>
          <li>Shell updates (0.5 semanas distribuido)</li>
          <li>✨ Apps simples migradas muy rápido con IA</li>
        </ul>
      </PhaseCard>
    </div>
  );
};

export default Fase2;


