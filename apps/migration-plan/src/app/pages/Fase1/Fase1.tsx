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
          Con Cursor AI: 3-4 semanas | Tradicional: 6-8 semanas
        </p>
      </div>

      <PhaseCard 
        title="1.1 Completar UI Kit Propio" 
        duration="1.5-2 semanas con IA ⚡"
        icon="🎨"
        status="in-progress"
      >
        <h4>Contexto</h4>
        <ul>
          <li>Ya existe <code>packages/ui</code> con estructura base y Storybook</li>
          <li>Login ya usa algunos componentes del nuevo UI Kit (Button)</li>
          <li>Con Cursor AI: generación automática de componentes, stories y tests</li>
          <li>~18-20 componentes complejos necesarios</li>
        </ul>

        <h4>Componentes Básicos (con Cursor AI)</h4>
        <ul>
          <li>✨ Cursor genera TypeScript + Sass + Storybook + Tests automáticamente</li>
          <li>TextField/Input con validación</li>
          <li>Select/Dropdown</li>
          <li>Checkbox y Radio</li>
          <li>Switch/Toggle</li>
          <li>Dialog/Modal</li>
          <li>Card</li>
          <li>Tooltip</li>
        </ul>

        <h4>Componentes Intermedios y Avanzados</h4>
        <ul>
          <li>Tabs, Avatar, Chip/Badge</li>
          <li>DatePicker, Autocomplete</li>
          <li>Stepper, Accordion</li>
          <li>Menu/Dropdown, Pagination</li>
          <li>Snackbar/Toast, Skeleton loader</li>
        </ul>

        <h4>Aceleración con IA</h4>
        <ul>
          <li>🚀 Tiempo por componente: ~40-50 min (vs ~120 min sin IA)</li>
          <li>🎯 Auto-generación de tests con 85%+ coverage</li>
          <li>📚 Documentación y stories automáticas</li>
          <li>⚡ ~50% más rápido que desarrollo tradicional</li>
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
        duration="0.5 semanas con IA ⚡"
        icon="⬆️"
      >
        <h4>Aceleración con Cursor AI</h4>
        <ul>
          <li>✨ Cursor detecta y corrige breaking changes automáticamente</li>
          <li>✨ Actualiza imports y sintaxis deprecated al instante</li>
          <li>⚡ 50% más rápido que actualización manual</li>
        </ul>
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
        title="1.3 TanStack Query en Login" 
        duration="0.5-1 semana con IA ⚡"
        icon="🔄"
      >
        <h4>Migración con Cursor AI</h4>
        <ul>
          <li>✨ Cursor convierte API calls a TanStack Query hooks automáticamente</li>
          <li>✨ Auto-genera tipos TypeScript desde respuestas API</li>
          <li>✨ Implementa error handling y retry logic</li>
        </ul>

        <h4>Hooks a Crear</h4>
        <ul>
          <li>useLogin, useGoogleAuth, useLinkedInAuth</li>
          <li>usePasswordReset, useSignUp</li>
          <li>Configuración de QueryClient con cache strategies</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="1.4 Documentación de Arquitectura" 
        duration="0.5 semanas - paralelo con IA ⚡"
        icon="📚"
      >
        <h4>Con Cursor AI</h4>
        <ul>
          <li>✨ IA genera documentación base automáticamente</li>
          <li>✨ Dev valida y extiende con contexto de negocio</li>
        </ul>
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


