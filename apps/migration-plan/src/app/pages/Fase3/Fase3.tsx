import { FC } from 'react';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import styles from '../ContextoGeneral/ContextoGeneral.module.scss';

const Fase3: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>⚡</span>
          Fase 3: Refactoring y Mejoras del Editor
        </h1>
        <p className={styles.subtitle}>
          Con Cursor AI: 8-10 semanas | Tradicional: 16-20 semanas
        </p>
      </div>

      <PhaseCard 
        title="Análisis de cv-app-editor" 
        duration="El más complejo"
        icon="📊"
      >
        <h4>Complejidad</h4>
        <ul>
          <li><strong>Archivos:</strong> ~887 archivos (el más grande con diferencia)</li>
          <li><strong>Líneas de código:</strong> ~50,000+ estimadas</li>
          <li><strong>Componentes:</strong> ~200+ componentes React</li>
          <li><strong>Estado:</strong> Redux con múltiples slices complejos</li>
          <li><strong>Features:</strong> Editor WYSIWYG, drag & drop, templates, preview, export PDF</li>
        </ul>

        <h4>Desafíos Específicos</h4>
        <ul>
          <li>Lógica de negocio compleja (rendering de CV, templates)</li>
          <li>Estado global extenso (documento, UI, history/undo-redo)</li>
          <li>Drag & drop con @dnd-kit</li>
          <li>Integración con canvas/PDF generation</li>
          <li>Performance crítica</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="3.1 Migración Jest → Vitest" 
        duration="1 semana con IA ⚡"
        icon="🧪"
      >
        <h4>Aceleración con Cursor AI</h4>
        <ul>
          <li>✨ Cursor convierte tests automáticamente (jest → vitest)</li>
          <li>✨ Actualiza syntax y mocks al instante</li>
          <li>✨ Dev valida y ajusta casos edge</li>
          <li>⚡ 50% más rápido: 1 semana vs 2 tradicional</li>
        </ul>

        <h4>Tareas</h4>
        <ul>
          <li>Setup y configuración Vitest (1 día)</li>
          <li>Migración automática de tests (2-3 días)</li>
          <li>Validación y ajustes (1-2 días)</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="3.2 Setup y Preparación" 
        duration="1 semana con IA ⚡"
        icon="⚙️"
      >
        <ul>
          <li>Crear estructura apps/editor</li>
          <li>Configurar Vite + Module Federation</li>
          <li>✨ Cursor acelera configuración inicial</li>
          <li>Setup TanStack Query con DevTools</li>
          <li>Análisis detallado de arquitectura legacy</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="3.3 Redux → Zustand + TanStack Query" 
        duration="2 semanas con IA ⚡"
        icon="🔄"
        status="pending"
      >
        <h4>Aceleración con Cursor AI</h4>
        <ul>
          <li>✨ Cursor analiza Redux stores y genera Zustand equivalente</li>
          <li>✨ Identifica automáticamente qué va a TanStack Query vs Zustand</li>
          <li>✨ Dev valida lógica de negocio compleja</li>
          <li>⚡ 50% más rápido: 2 semanas vs 4 tradicional</li>
        </ul>

        <h4>Separación de Responsabilidades</h4>
        
        <h4>TanStack Query (Server State):</h4>
        <ul>
          <li>Cargar/guardar documentos</li>
          <li>Fetch templates disponibles</li>
          <li>User settings del servidor</li>
          <li>Export a PDF (mutations)</li>
        </ul>

        <h4>Zustand (Client State):</h4>
        <ul>
          <li>Estado actual del editor (isDirty, modo edición)</li>
          <li>UI state (sidebar, modal, panel seleccionado)</li>
          <li>History/undo-redo stack</li>
          <li>Drag & drop state temporal</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="3.4 Migración de Componentes con TDD" 
        duration="3 semanas con IA ⚡"
        icon="🛠️"
      >
        <h4>Aceleración con Cursor AI</h4>
        <ul>
          <li>✨ Cursor genera tests de caracterización automáticamente</li>
          <li>✨ Convierte ~200 componentes class → functional</li>
          <li>✨ Reemplaza MUI por componentes custom al instante</li>
          <li>✨ Infiere tipos TypeScript automáticamente</li>
          <li>⚡ 50% más rápido: 3 semanas vs 6 tradicional</li>
        </ul>
        <h4>Proceso por Componente</h4>
        <ol>
          <li>✨ Cursor genera tests para comportamiento actual</li>
          <li>✨ Migra componente a TypeScript automáticamente</li>
          <li>✨ Reemplaza MUI por packages/ui con prompts</li>
          <li>✨ Refactoriza a functional components + hooks</li>
          <li>Dev valida lógica crítica de negocio</li>
          <li>Verificar tests pasan</li>
          <li>Refactorizar y optimizar manualmente</li>
        </ol>

        <h4>Componentes Críticos (priorizar)</h4>
        <ul>
          <li>EditorCanvas (2 días con IA vs 1 semana tradicional)</li>
          <li>SectionEditors (1 semana con IA vs 2 semanas)</li>
          <li>Sidebar, TemplateSelector, PreviewPanel (días vs semanas)</li>
          <li>ExportModal con PDF generation</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="3.5 Integración y Optimización" 
        duration="1 semana con IA ⚡"
        icon="🚀"
      >
        <h4>Aceleración con Cursor AI</h4>
        <ul>
          <li>✨ Cursor identifica optimizaciones de bundle</li>
          <li>✨ Sugiere code splitting y lazy loading</li>
          <li>✨ Detecta problemas de performance automáticamente</li>
        </ul>

        <h4>Tareas</h4>
        <ul>
          <li>Integrar editor con shell</li>
          <li>Lazy loading de secciones pesadas</li>
          <li>Code splitting agresivo</li>
          <li>Optimización de bundle size</li>
          <li>Performance profiling</li>
          <li>Testing E2E completo</li>
        </ul>

        <h4>Métricas Objetivo</h4>
        <ul>
          <li><strong>Test Coverage:</strong> &gt; 80%</li>
          <li><strong>TypeScript Coverage:</strong> 100% (strict mode)</li>
          <li><strong>Bundle Size:</strong> Reducir 30-40% vs legacy</li>
          <li><strong>Performance:</strong> FCP &lt; 1.5s, TTI &lt; 3s</li>
        </ul>
      </PhaseCard>
    </div>
  );
};

export default Fase3;


