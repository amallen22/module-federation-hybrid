import { FC } from 'react';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import styles from './Estimacion.module.scss';

const Estimacion: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>⏱️</span>
          Estimación de Tiempos
        </h1>
        <p className={styles.subtitle}>
          Proyección de duración del proyecto según diferentes escenarios
        </p>
      </div>

      <PhaseCard 
        title="Con 2 Desarrolladores (Método Tradicional)" 
        duration="9-12 meses"
        icon="👨‍💻👨‍💻"
      >
        <div className={styles.timelineSection}>
          <h4>Fase 1: Desbloqueo del Stack (6-8 semanas)</h4>
          <ul>
            <li>Completar UI Kit: 3-4 semanas (~18-20 componentes con Storybook + tests)</li>
            <li>Upgrade dependencias: 1 semana</li>
            <li>Implementación TanStack Query en login: 1-2 semanas</li>
            <li>Documentación: 1 semana (paralelo)</li>
            <li>Buffer: +1 semana</li>
          </ul>

          <h4>Fase 2: Desacoplamiento Legacy (16-20 semanas)</h4>
          <ul>
            <li>cv-app-login: TanStack Query (1-2 semanas)</li>
            <li>cv-app-user: 5-6 semanas (231 archivos, migración completa)</li>
            <li>cv-lib-app-components: 3-4 semanas (paralelo con user)</li>
            <li>cv-app-shop: 3-4 semanas (flujo crítico de compra)</li>
            <li>cv-app-payment: 2-3 semanas (testing exhaustivo)</li>
            <li>cv-app-share: 1-2 semanas</li>
            <li>Shell updates: 1 semana (distribuido)</li>
            <li>Buffer: +2 semanas</li>
          </ul>

          <h4>Fase 3: Editor Refactoring (16-20 semanas)</h4>
          <ul>
            <li>Jest → Vitest: 2 semanas</li>
            <li>Setup y preparación: 2 semanas</li>
            <li>Migración Redux → Zustand + TanStack Query: 4 semanas</li>
            <li>Migración componentes con TDD: 6 semanas (~200 componentes)</li>
            <li>Integración y optimización: 2 semanas</li>
            <li>Buffer: +2 semanas</li>
          </ul>
        </div>

        <div className={styles.totalBox}>
          <div className={styles.totalLabel}>Timeline Total:</div>
          <div className={styles.totalValues}>
            <div className={styles.scenario}>
              <span className={styles.scenarioLabel}>Optimista:</span>
              <span className={styles.scenarioValue}>38 semanas (~9 meses)</span>
            </div>
            <div className={styles.scenario}>
              <span className={styles.scenarioLabel}>Realista:</span>
              <span className={styles.scenarioValue}>46 semanas (~11 meses)</span>
            </div>
            <div className={styles.scenario}>
              <span className={styles.scenarioLabel}>Pesimista:</span>
              <span className={styles.scenarioValue}>56 semanas (~13-14 meses)</span>
            </div>
          </div>
        </div>
      </PhaseCard>

      <PhaseCard 
        title="Con 2 Desarrolladores + Cursor AI" 
        duration="4-6 meses"
        icon="🤖👨‍💻"
        status="in-progress"
        defaultExpanded={true}
      >
        <div className={styles.cursorSection}>
          <div className={styles.aiHighlight}>
            <span className={styles.sparkle}>✨</span>
            <h4>Aceleración con IA: Reducción del 40-50% del tiempo</h4>
          </div>

          <h4>Fase 1: Desbloqueo del Stack (3-4 semanas) ⚡️</h4>
          <ul>
            <li><strong>UI Kit:</strong> 1.5-2 semanas
              <ul>
                <li>Cursor genera componentes base desde descripciones</li>
                <li>Auto-genera stories de Storybook</li>
                <li>Genera tests automáticamente</li>
                <li>Crea variantes de componentes al instante</li>
              </ul>
            </li>
            <li><strong>Upgrade dependencias:</strong> 0.5 semanas
              <ul>
                <li>Cursor detecta y corrige breaking changes automáticamente</li>
                <li>Actualiza imports y sintaxis deprecated</li>
              </ul>
            </li>
            <li><strong>TanStack Query:</strong> 0.5-1 semana
              <ul>
                <li>Cursor genera hooks personalizados desde especificaciones API</li>
                <li>Auto-implementa error handling y retry logic</li>
              </ul>
            </li>
            <li><strong>Documentación:</strong> 0.5 semanas (paralelo con IA)</li>
          </ul>

          <h4>Fase 2: Desacoplamiento Legacy (8-10 semanas) ⚡️</h4>
          <ul>
            <li><strong>cv-app-login:</strong> 0.5-1 semana (TanStack Query)</li>
            <li><strong>cv-app-user:</strong> 2.5-3 semanas
              <ul>
                <li>Cursor convierte 231 archivos JS → TypeScript</li>
                <li>Cursor migra Redux a Zustand/TanStack Query automáticamente</li>
                <li>Refactoriza componentes class → functional en segundos</li>
                <li>Migra estilos MUI a Sass con prompts</li>
              </ul>
            </li>
            <li><strong>cv-lib-app-components:</strong> 1.5-2 semanas (paralelo)</li>
            <li><strong>cv-app-shop:</strong> 1.5-2 semanas</li>
            <li><strong>cv-app-payment:</strong> 1-1.5 semanas</li>
            <li><strong>cv-app-share:</strong> 0.5-1 semana</li>
            <li><strong>Shell updates:</strong> 0.5 semanas</li>
            <li><strong>Buffer:</strong> +1 semana</li>
          </ul>

          <h4>Fase 3: Editor Refactoring (8-10 semanas) ⚡️</h4>
          <ul>
            <li><strong>Jest → Vitest:</strong> 1 semana
              <ul>
                <li>Cursor convierte tests automáticamente</li>
                <li>Actualiza syntax y mocks instantáneamente</li>
              </ul>
            </li>
            <li><strong>Setup y preparación:</strong> 1 semana</li>
            <li><strong>Migración Redux → Zustand + TanStack Query:</strong> 2 semanas
              <ul>
                <li>Cursor identifica patrones y genera stores Zustand</li>
                <li>Separa automáticamente server state vs client state</li>
              </ul>
            </li>
            <li><strong>Migración componentes con TDD:</strong> 3 semanas
              <ul>
                <li>TDD asistido: Cursor genera tests desde especificaciones</li>
                <li>Refactoring automático manteniendo funcionalidad</li>
                <li>TypeScript types inferidos automáticamente</li>
              </ul>
            </li>
            <li><strong>Integración y optimización:</strong> 1 semana</li>
            <li><strong>Buffer:</strong> +1 semana</li>
          </ul>
        </div>

        <div className={`${styles.totalBox} ${styles.cursorTotal}`}>
          <div className={styles.totalLabel}>
            <span className={styles.sparkle}>🚀</span>
            Timeline con Cursor AI:
          </div>
          <div className={styles.totalValues}>
            <div className={styles.scenario}>
              <span className={styles.scenarioLabel}>Optimista:</span>
              <span className={styles.scenarioValue}>19 semanas (~4.5 meses)</span>
            </div>
            <div className={styles.scenario}>
              <span className={styles.scenarioLabel}>Realista:</span>
              <span className={styles.scenarioValue}>23 semanas (~5.5 meses)</span>
            </div>
            <div className={styles.scenario}>
              <span className={styles.scenarioLabel}>Pesimista:</span>
              <span className={styles.scenarioValue}>28 semanas (~7 meses)</span>
            </div>
          </div>
          <div className={styles.savings}>
            💰 Ahorro de tiempo: <strong>19-28 semanas</strong> (50% reducción)
          </div>
        </div>
      </PhaseCard>

      <div className={styles.comparisonChart}>
        <h3 className={styles.chartTitle}>Comparación Visual</h3>
        <div className={styles.chartContainer}>
          <div className={styles.chartRow}>
            <span className={styles.chartLabel}>Método Tradicional</span>
            <div className={styles.chartBar} style={{ width: '100%', background: '#6b7280' }}>
              <span className={styles.chartValue}>11 meses</span>
            </div>
          </div>
          <div className={styles.chartRow}>
            <span className={styles.chartLabel}>Con Cursor AI</span>
            <div className={styles.chartBar} style={{ width: '50%', background: '#10b981' }}>
              <span className={styles.chartValue}>5.5 meses</span>
            </div>
          </div>
        </div>
        <p className={styles.chartFootnote}>
          ✨ Reducción del 50% del tiempo total gracias a la asistencia de IA
        </p>
      </div>

      <div className={styles.ganttChart}>
        <h3 className={styles.chartTitle}>📊 Diagrama de Gantt: Trabajo en Paralelo (2 Developers + Cursor AI)</h3>
        <p className={styles.ganttSubtitle}>Timeline de 5 meses mostrando cómo 2 desarrolladores trabajan simultáneamente</p>
        
        <div className={styles.ganttContainer}>
          {/* Timeline Header */}
          <div className={styles.ganttHeader}>
            <div className={styles.ganttLabel}>Developer</div>
            <div className={styles.ganttTimeline}>
              <div className={styles.ganttMonth}>Mes 1</div>
              <div className={styles.ganttMonth}>Mes 2</div>
              <div className={styles.ganttMonth}>Mes 3</div>
              <div className={styles.ganttMonth}>Mes 4</div>
              <div className={styles.ganttMonth}>Mes 5</div>
            </div>
          </div>

          {/* Developer 1 */}
          <div className={styles.ganttRow}>
            <div className={styles.ganttDevLabel}>
              <span className={styles.devIcon}>👨‍💻</span>
              <div>
                <strong>Dev 1</strong>
                <span className={styles.devFocus}>UI Kit + Apps Core</span>
              </div>
            </div>
            <div className={styles.ganttTimeline}>
              <div className={styles.ganttTask} style={{ gridColumn: '1 / 3', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <span className={styles.taskLabel}>Fase 1: UI Kit Completo</span>
                <span className={styles.taskDuration}>1.5 mes</span>
              </div>
              <div className={styles.ganttTask} style={{ gridColumn: '3 / 5', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <span className={styles.taskLabel}>Fase 2: User + Shop</span>
                <span className={styles.taskDuration}>2 meses</span>
              </div>
              <div className={styles.ganttTask} style={{ gridColumn: '5 / 6', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <span className={styles.taskLabel}>Payment + Testing</span>
                <span className={styles.taskDuration}>1 mes</span>
              </div>
            </div>
          </div>

          {/* Developer 2 */}
          <div className={styles.ganttRow}>
            <div className={styles.ganttDevLabel}>
              <span className={styles.devIcon}>👨‍💻</span>
              <div>
                <strong>Dev 2</strong>
                <span className={styles.devFocus}>Components + Editor</span>
              </div>
            </div>
            <div className={styles.ganttTimeline}>
              <div className={styles.ganttTask} style={{ gridColumn: '1 / 2', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <span className={styles.taskLabel}>Fase 1: Setup</span>
                <span className={styles.taskDuration}>0.5 mes</span>
              </div>
              <div className={styles.ganttTask} style={{ gridColumn: '2 / 4', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                <span className={styles.taskLabel}>Fase 2: Components Lib</span>
                <span className={styles.taskDuration}>2 meses</span>
              </div>
              <div className={styles.ganttTask} style={{ gridColumn: '4 / 6', background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
                <span className={styles.taskLabel}>Fase 3: Editor Completo</span>
                <span className={styles.taskDuration}>2 meses</span>
              </div>
            </div>
          </div>

          {/* Collaboration Points */}
          <div className={styles.ganttRow} style={{ borderTop: '2px dashed #e5e7eb', paddingTop: '16px' }}>
            <div className={styles.ganttDevLabel}>
              <span className={styles.devIcon}>🤝</span>
              <div>
                <strong>Colaboración</strong>
                <span className={styles.devFocus}>Code Reviews & Pair</span>
              </div>
            </div>
            <div className={styles.ganttTimeline}>
              <div className={styles.ganttCollaboration} style={{ gridColumn: '1 / 6' }}>
                <div className={styles.collabPoint} style={{ left: '10%' }}>📝</div>
                <div className={styles.collabPoint} style={{ left: '30%' }}>🔄</div>
                <div className={styles.collabPoint} style={{ left: '50%' }}>🔍</div>
                <div className={styles.collabPoint} style={{ left: '70%' }}>✅</div>
                <div className={styles.collabPoint} style={{ left: '90%' }}>🚀</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ganttLegend}>
          <h4>Distribución de Trabajo:</h4>
          <ul>
            <li><strong>Dev 1:</strong> Se enfoca en UI Kit base → User App → Shop → Payment</li>
            <li><strong>Dev 2:</strong> Trabaja en parallel en Components Library → Editor (la app más compleja)</li>
            <li><strong>Colaboración continua:</strong> Code reviews, pair programming en áreas complejas, y sincronización diaria</li>
          </ul>
          <div className={styles.ganttNote}>
            <strong>🤖 Ventaja de Cursor AI:</strong> Ambos developers pueden avanzar más rápido gracias a generación automática de código, 
            tests, y refactoring asistido. La IA permite mantener el paralelismo sin bloqueos de dependencias.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimacion;

