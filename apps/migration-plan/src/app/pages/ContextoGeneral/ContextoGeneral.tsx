import { FC, useState } from 'react';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import styles from './ContextoGeneral.module.scss';

const ContextoGeneral: FC = () => {
  const [isNodeVersionsExpanded, setIsNodeVersionsExpanded] = useState(false);
  const [isReactVersionsExpanded, setIsReactVersionsExpanded] = useState(false);
  const [isDeploymentExpanded, setIsDeploymentExpanded] = useState(false);
  const [isTestingExpanded, setIsTestingExpanded] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>🗺️</span>
          Plan de Migración
        </h1>
        <p className={styles.subtitle}>
          CV Legacy → CV-Hibrid: Arquitectura de Microservicios con Vite Module Federation
        </p>
      </div>

      <PhaseCard 
        title="Situación Actual" 
        duration="Legacy System"
        icon="🏚️"
        defaultExpanded={true}
      >
        <h4>Proyecto Legacy:</h4>
        <ul>
          <li>20+ aplicaciones independientes en Webpack</li>
          <li>Dependencia crítica de Material-UI v5</li>
          <li>Redux/Redux Toolkit para estado global</li>
          <li>
            <div className={styles.nodeVersions}>
              <span 
                className={styles.nodeVersionsToggle}
                onClick={() => setIsTestingExpanded(!isTestingExpanded)}
              >
                Testing: Fragmentado entre Jest (v22-v29), Enzyme, Testing Library y Vitest
                <span className={`${styles.chevron} ${isTestingExpanded ? styles.expanded : ''}`}>
                  ▼
                </span>
              </span>
              {isTestingExpanded && (
                <div className={styles.nodeVersionsContent}>
                  <div className={styles.versionGroup}>
                    <h5>Vitest (Moderno) ✨:</h5>
                    <ul>
                      <li>cv-ui-kit: Vitest 3.0.9 + @testing-library/react 16.2.0</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>Jest 29.x (Moderno) + Testing Library:</h5>
                    <ul>
                      <li>cv-app-payment: Jest ^29.7.0 + @testing-library/react 14.2.1</li>
                      <li>cv-app-shop: Jest ^29.7.0 + @testing-library/react ^14.2.1</li>
                      <li>cv-lib-app-components: Jest ^29.5.0 + @testing-library/react ^14.0.0</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>Jest 25.x + Enzyme (Legacy):</h5>
                    <ul>
                      <li>cv-app-login: Jest 25.1.0 + Enzyme 3.11.0 + react-test-renderer 16</li>
                      <li>cv-app-editor: Jest ^25.1.0 + Enzyme ^3.11.0 + @testing-library/react ^10.0.4 + react-test-renderer 18.2.0</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>Jest 23.6 (Antiguo) + Enzyme:</h5>
                    <ul>
                      <li>cv-app-crm: Jest 23.6 + Enzyme ^3.11.0</li>
                      <li>rj-app-crm: Jest 23.6 + Enzyme ^3.11.0</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>Jest 22.x (Muy Antiguo) + Enzyme/Mocha:</h5>
                    <ul>
                      <li>cv-app-payment-amazonpay-3ds: Jest ^22.4.4 + Enzyme 3.11.0 + react-test-renderer ^16.12</li>
                      <li>cv-app-payment-paddle: Jest ^22.4.4 + Mocha ^3.3.0 + Enzyme 3.11.0 + react-test-renderer ^18.2</li>
                      <li>cv-app-payment-ingenico: Jest ^22.4.3 + Mocha ^3.3.0 + Enzyme 3.2.0 + react-test-renderer 16.8.0</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>Solo Testing Library (Sin Framework):</h5>
                    <ul>
                      <li>cv-app-backoffice-balancer: @testing-library/react ^11.2.7</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>⚠️ Sin Configuración de Tests:</h5>
                    <ul>
                      <li>cv-app-backoffice-login</li>
                      <li>cv-app-payment-macropay</li>
                      <li>cv-app-payment-nmi</li>
                      <li>cv-app-payment-worldpay</li>
                      <li>cv-app-share</li>
                      <li>cv-app-thankyou</li>
                      <li>cv-app-user</li>
                      <li>cv-lib-app-bundlejs</li>
                    </ul>
                  </div>

                  <p className={styles.summary}>
                    <strong>📊 Resumen:</strong> Hay una migración progresiva desde Jest antiguo + Enzyme hacia Jest moderno + Testing Library, con cv-ui-kit liderando con Vitest. Algunos proyectos tienen configuraciones mixtas (Jest + Mocha) y 8 apps carecen de tests configurados.
                  </p>
                </div>
              )}
            </div>
          </li>
          <li>
            <div className={styles.nodeVersions}>
              <span 
                className={styles.nodeVersionsToggle}
                onClick={() => setIsReactVersionsExpanded(!isReactVersionsExpanded)}
              >
                React: 4 versiones mayores (16, 17, 18.2, 18.3)
                <span className={`${styles.chevron} ${isReactVersionsExpanded ? styles.expanded : ''}`}>
                  ▼
                </span>
              </span>
              {isReactVersionsExpanded && (
                <div className={styles.nodeVersionsContent}>
                  <div className={styles.versionGroup}>
                    <h5>React 18.3.1 (Latest):</h5>
                    <ul>
                      <li>cv-app-editor: ^18.3.1</li>
                      <li>cv-app-user: 18.3.1</li>
                      <li>cv-ui-kit: 18.3.1</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>React 18.2.0:</h5>
                    <ul>
                      <li>cv-app-payment: ^18.2.0</li>
                      <li>cv-app-payment-macropay: 18.2.0</li>
                      <li>cv-app-payment-worldpay: 18.2.0</li>
                      <li>cv-app-share: ^18.2.0</li>
                      <li>cv-app-shop: ^18.2.0</li>
                      <li>cv-app-thankyou: 18.2.0</li>
                      <li>cv-lib-app-components: ^18.2.0</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>React 17.0.2:</h5>
                    <ul>
                      <li>cv-app-backoffice-balancer: ^17.0.2</li>
                      <li>cv-app-backoffice-login: ^17.0.2</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>React 16.x (Legacy):</h5>
                    <ul>
                      <li>cv-app-login: 16</li>
                      <li>cv-app-crm: 16.8.6</li>
                      <li>cv-app-payment-amazonpay-3ds: ^16.12</li>
                      <li>cv-app-payment-ingenico: 16.8.0</li>
                      <li>cv-app-payment-nmi: 16.8.0</li>
                      <li>cv-app-payment-paddle: ^16.8.0</li>
                      <li>rj-app-crm: 16.8.6</li>
                    </ul>
                  </div>

                  <p className={styles.summary}>
                    <strong>📊 Resumen:</strong> El proyecto muestra una migración progresiva hacia React 18.x en las apps más modernas, mientras que las apps legacy siguen en React 16.x.
                  </p>
                </div>
              )}
            </div>
          </li>
          <li>
            <div className={styles.nodeVersions}>
              <span 
                className={styles.nodeVersionsToggle}
                onClick={() => setIsNodeVersionsExpanded(!isNodeVersionsExpanded)}
              >
                Node.js: 4 versiones diferentes (v10, v14, v20, v22)
                <span className={`${styles.chevron} ${isNodeVersionsExpanded ? styles.expanded : ''}`}>
                  ▼
                </span>
              </span>
              {isNodeVersionsExpanded && (
                <div className={styles.nodeVersionsContent}>
                  <p><strong>Raíz del proyecto:</strong> v10.19.0</p>
                  
                  <div className={styles.versionGroup}>
                    <h5>Node v22.x:</h5>
                    <ul>
                      <li>cv-ui-kit: v22.14.0</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>Node v20.x:</h5>
                    <ul>
                      <li>cv-app-user: v20.19.5</li>
                      <li>cv-app-share: 20.19.5</li>
                      <li>cv-app-thankyou: v20.19.5</li>
                      <li>cv-lib-app-components: v20.19.5</li>
                      <li>cv-app-payment: v20.19.5</li>
                      <li>cv-app-shop: v20.19.5</li>
                      <li>cv-app-backoffice-login: v20.19.5</li>
                      <li>cv-app-login: v20.10</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>Node v14.x:</h5>
                    <ul>
                      <li>cv-app-editor: v14.19.0</li>
                      <li>cv-app-payment-worldpay: v14.19.0</li>
                      <li>cv-app-payment-macropay: v14.19.0</li>
                      <li>cv-app-payment-nmi: 14.19.0</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>Node v10.x (Legacy):</h5>
                    <ul>
                      <li>rj-app-crm: v10.17.0</li>
                      <li>cv-app-crm: v10.17.0</li>
                      <li>cv-app-payment-ingenico: v10.17.0</li>
                      <li>cv-app-backoffice-balancer: v10.17.0</li>
                      <li>cv-app-payment-amazonpay-3ds: v10.19.0</li>
                    </ul>
                  </div>

                  <p className={styles.summary}>
                    <strong>📊 Resumen:</strong> La mayoría de apps modernas usan v20.19.5 y las apps legacy usan v10.x o v14.x.
                  </p>
                </div>
              )}
            </div>
          </li>
          <li>Comunicación entre apps vía cookies y session storage</li>
          <li>
            <div className={styles.nodeVersions}>
              <span 
                className={styles.nodeVersionsToggle}
                onClick={() => setIsDeploymentExpanded(!isDeploymentExpanded)}
              >
                Despliegues acoplados y lentos
                <span className={`${styles.chevron} ${isDeploymentExpanded ? styles.expanded : ''}`}>
                  ▼
                </span>
              </span>
              {isDeploymentExpanded && (
                <div className={styles.nodeVersionsContent}>
                  <div className={styles.versionGroup}>
                    <h5>🔗 Acoplamiento (Coupling):</h5>
                    <p>Las 20+ aplicaciones están <strong>interconectadas</strong> y <strong>dependen unas de otras</strong>. Comparten estado vía cookies y session storage sin fronteras claras de despliegue.</p>
                    <ul>
                      <li><strong>❌ Efecto dominó:</strong> Un cambio en una app puede romper otras</li>
                      <li><strong>❌ Deploy monolítico:</strong> Hay que desplegar TODO el sistema junto</li>
                      <li><strong>❌ Testing exhaustivo:</strong> Cada deploy requiere probar TODAS las apps</li>
                      <li><strong>❌ Bloqueos entre equipos:</strong> Si alguien rompe algo, bloquea a todos</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>🐌 Lentitud del Proceso:</h5>
                    <ul>
                      <li><strong>Build monolítico:</strong> 15-30 minutos para compilar todas las apps aunque solo cambies una</li>
                      <li><strong>Testing completo:</strong> Testing de regresión en TODAS las apps por cada cambio</li>
                      <li><strong>Coordinación compleja:</strong> Múltiples equipos deben sincronizar sus cambios</li>
                      <li><strong>Rollback difícil:</strong> Si algo falla, hay que revertir TODO el sistema</li>
                    </ul>
                  </div>

                  <div className={styles.versionGroup}>
                    <h5>📊 Ejemplo Real:</h5>
                    <p><strong>Escenario:</strong> Actualizar el formulario de login</p>
                    <div style={{ marginLeft: '16px', marginTop: '8px' }}>
                      <p style={{ marginBottom: '8px' }}><strong>Sistema Legacy (Acoplado):</strong></p>
                      <ol style={{ paddingLeft: '20px', margin: '4px 0' }}>
                        <li>Cambiar código en cv-app-login</li>
                        <li>Build de TODAS las 20+ apps → <strong>20-30 min</strong></li>
                        <li>Testing de regresión COMPLETO</li>
                        <li>Deploy de TODO el sistema</li>
                        <li>Si falla → Rollback de TODO</li>
                      </ol>
                      <p style={{ marginTop: '8px', color: '#dc2626', fontWeight: 600 }}>⏱️ Tiempo total: 2-4 horas</p>
                    </div>
                  </div>

                  <p className={styles.summary}>
                    <strong>✅ Solución CV-Hibrid:</strong> Con microservicios, cada app se despliega <strong>independientemente</strong> en 15-30 minutos, sin afectar a otras. Rollback específico y sin bloqueos entre equipos.
                  </p>
                </div>
              )}
            </div>
          </li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="Proyecto Nuevo" 
        duration="Modern Stack"
        icon="🚀"
        status="in-progress"
      >
        <h4>CV-Hibrid (Proyecto Nuevo):</h4>
        <ul>
          <li>Arquitectura de microservicios con Module Federation</li>
          <li>Vite 6+ como build tool</li>
          <li>React 18.3+</li>
          <li>TypeScript 5+</li>
          <li>pnpm workspaces</li>
          <li>Zustand para estado local/global</li>
          <li>TanStack Query (React Query) para datos asíncronos y cache</li>
          <li>Actualmente: <code>shell</code> (host), <code>product</code>, <code>login</code> (migrados), <code>user</code> (en progreso)</li>
          <li>UI Kit propio en <code>packages/ui</code> (reemplazando MUI)</li>
        </ul>
      </PhaseCard>

      <PhaseCard 
        title="Objetivo Final" 
        duration="12 meses"
        icon="🎯"
      >
        <p>
          Migrar progresivamente todas las aplicaciones legacy a microservicios independientes, 
          desacoplados y modernos, desplegables de forma autónoma.
        </p>
        <h4>Beneficios Esperados:</h4>
        <ul>
          <li><strong>Despliegues Independientes:</strong> Cada microfrontend puede desplegarse sin afectar a otros</li>
          <li><strong>Escalabilidad:</strong> Equipos pueden trabajar en paralelo en diferentes microfrontends</li>
          <li><strong>Mejor Performance:</strong> Code splitting automático, lazy loading, bundle size optimizado</li>
          <li><strong>Tecnología Moderna:</strong> Stack actualizado permite usar últimas features de React y TypeScript</li>
          <li><strong>Mejor DX:</strong> Desarrollo más rápido con Vite HMR, mejor tooling, TypeScript</li>
          <li><strong>Mantenibilidad:</strong> Código más limpio, testeado y documentado</li>
        </ul>
      </PhaseCard>

      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>📱</span>
          <span className={styles.statValue}>20+</span>
          <span className={styles.statLabel}>Apps a Migrar</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>📅</span>
          <span className={styles.statValue}>12</span>
          <span className={styles.statLabel}>Meses Estimados</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>👥</span>
          <span className={styles.statValue}>2</span>
          <span className={styles.statLabel}>Developers</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>🎯</span>
          <span className={styles.statValue}>3</span>
          <span className={styles.statLabel}>Fases Principales</span>
        </div>
      </div>
    </div>
  );
};

export default ContextoGeneral;

