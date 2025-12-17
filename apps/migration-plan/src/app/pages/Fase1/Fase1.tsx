import { FC } from 'react';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import styles from '../ContextoGeneral/ContextoGeneral.module.scss';

const Fase1: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>🚀</span>
          Fase 1: Desbloqueo del Stack Tecnológico
        </h1>
        <p className={styles.subtitle}>
          Duración Estimada: 4-6 semanas (2 desarrolladores)
        </p>
      </div>

      <PhaseCard 
        title="1.1 Completar UI Kit Propio" 
        duration="2-3 semanas"
        icon="🎨"
        status="in-progress"
      >
        <h4>Contexto</h4>
        <ul>
          <li>Ya existe <code>packages/ui</code> con estructura base y Storybook</li>
          <li>Login ya usa algunos componentes del nuevo UI Kit (Button)</li>
          <li>Necesitamos completar todos los componentes de MUI que se usan en el proyecto</li>
        </ul>

        <h4>Componentes Básicos (Semana 1-2)</h4>
        <ul>
          <li>TextField/Input con validación</li>
          <li>Select/Dropdown</li>
          <li>Checkbox y Radio</li>
          <li>Switch/Toggle</li>
          <li>Dialog/Modal</li>
          <li>Card</li>
          <li>Tabs</li>
          <li>Avatar</li>
          <li>Chip/Badge</li>
          <li>Tooltip</li>
        </ul>

        <h4>Componentes Avanzados (Semana 2-3)</h4>
        <ul>
          <li>DatePicker</li>
          <li>Autocomplete</li>
          <li>Stepper</li>
          <li>Accordion</li>
          <li>Menu/Dropdown Menu</li>
          <li>Pagination</li>
          <li>Snackbar/Toast</li>
          <li>Skeleton loader</li>
        </ul>

        <h4>Criterios de Éxito</h4>
        <ul>
          <li>✅ Todos los componentes MUI usados tienen equivalente en <code>packages/ui</code></li>
          <li>✅ 100% de componentes con Storybook stories</li>
          <li>✅ Cobertura de tests &gt; 80%</li>
          <li>✅ Documentación completa de API</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="1.2 Upgrade de Dependencias Core" 
        duration="1 semana"
        icon="⬆️"
      >
        <h4>Node.js y pnpm</h4>
        <ul>
          <li>Actualizar <code>.nvmrc</code> a Node LTS (v20.x o v22.x)</li>
          <li>Verificar compatibilidad de todas las dependencias</li>
          <li>Actualizar scripts CI/CD</li>
        </ul>

        <h4>React Ecosystem</h4>
        <ul>
          <li>Asegurar React 18.3+ en todos los packages</li>
          <li>react-dom 18.3+</li>
          <li>react-router-dom v6+</li>
          <li>Actualizar @types/react y @types/react-dom</li>
        </ul>

        <h4>Build Tools</h4>
        <ul>
          <li>Vite 6.x (latest stable)</li>
          <li>@module-federation/vite</li>
          <li>TypeScript 5.8+</li>
          <li>Vitest 3.x</li>
        </ul>

        <h4>Estado y Datos</h4>
        <ul>
          <li>Zustand 5.x para estado local/global sincrónico</li>
          <li>TanStack Query v5.x para datos asíncronos, cache y sincronización servidor</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="1.3 Documentación de Arquitectura" 
        duration="1 semana - paralelo"
        icon="📚"
      >
        <ul>
          <li>Documentar patrón de Module Federation usado</li>
          <li>Guía de desarrollo de nuevos microfrontends</li>
          <li>Guía de migración de componentes legacy</li>
          <li>Arquitectura de comunicación entre microfrontends</li>
          <li>Patrones de TanStack Query + Zustand</li>
          <li>Estrategia de versionado y despliegue</li>
          <li>Troubleshooting común</li>
        </ul>
      </PhaseCard>
    </div>
  );
};

export default Fase1;

