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
          Duración Estimada: 12-16 semanas (2 desarrolladores)
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
        duration="2 semanas"
        icon="🧪"
      >
        <h4>Semana 1: Setup y Configuración</h4>
        <ul>
          <li>Instalar Vitest y dependencias</li>
          <li>Crear <code>vitest.config.ts</code></li>
          <li>Configurar jsdom para tests de componentes</li>
          <li>Configurar coverage</li>
          <li>Migrar mocks y setup files</li>
        </ul>

        <h4>Semana 2: Migración de Tests</h4>
        <ul>
          <li>Migrar tests existentes</li>
          <li>Actualizar imports (jest → vitest)</li>
          <li>Actualizar syntax y mocks</li>
          <li>Verificar coverage se mantiene</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="3.2 Arquitectura Redux → Zustand + TanStack Query" 
        duration="3-4 semanas"
        icon="🔄"
        status="pending"
      >
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

        <h4>Beneficios</h4>
        <ul>
          <li>Cache automático de documentos y templates</li>
          <li>Optimistic updates para mejor UX</li>
          <li>Retry automático en fallos de red</li>
          <li>Reducción de boilerplate vs Redux</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="3.3 Migración de Componentes con TDD" 
        duration="6-8 semanas"
        icon="🛠️"
      >
        <h4>Proceso por Componente</h4>
        <ol>
          <li>Escribir tests para comportamiento actual</li>
          <li>Migrar componente a TypeScript</li>
          <li>Reemplazar MUI por packages/ui</li>
          <li>Refactorizar a functional components + hooks</li>
          <li>Migrar estilos a Sass modules</li>
          <li>Verificar tests pasan</li>
          <li>Refactorizar y optimizar</li>
        </ol>

        <h4>Componentes Críticos (priorizar)</h4>
        <ul>
          <li>EditorCanvas (área de edición principal)</li>
          <li>Sidebar (navegación de secciones)</li>
          <li>TemplateSelector</li>
          <li>PreviewPanel</li>
          <li>ExportModal</li>
          <li>SectionEditors (experiencia, educación, skills, etc.)</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="3.4 Integración y Optimización" 
        duration="2 semanas"
        icon="🚀"
      >
        <ul>
          <li>Integrar editor con shell</li>
          <li>Lazy loading de secciones pesadas</li>
          <li>Code splitting agresivo</li>
          <li>Optimización de bundle size</li>
          <li>Performance profiling</li>
          <li>Testing E2E completo</li>
          <li>Documentation</li>
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

