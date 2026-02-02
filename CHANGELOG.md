# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - Tech Stories Documentation (Fase 1)

#### Documentación Jira - Sprint Q1 S2

- 📋 **RC-31339**: Migración Repositorio GitHub → Bitbucket (cv-micro) - 3 SP
- 🧑 **RC-31340**: Integración cv-app-user en Module Federation - 8 SP
- 🎨 **RC-31341**: Validación Figma Design Tokens en User App - 5 SP
- 🔐 **RC-31342**: Migración y Refactorización cv-app-login Real - 8 SP

#### Archivos Creados

- `docs/jira/fase1/rc-31339-repo-migration.md`
- `docs/jira/fase1/rc-31340-user-integration.md`
- `docs/jira/fase1/rc-31341-figma-tokens.md`
- `docs/jira/fase1/rc-31342-login-real.md`

#### Estructura de Documentación

Cada tech story incluye:

- Hipótesis y problema a resolver
- Descripción completa de implementación
- Acceptance Criteria detallados
- Testing (manual, E2E, edge cases)
- Conclusiones y aprendizajes técnicos proyectados
- Mejoras futuras priorizadas
- Referencias internas y externas
- Desglose de Story Points (Northstar Framework)
- Dependencias y bloqueos

**Total Fase 1**: 24 SP pendientes (RC-31339, RC-31340, RC-31341, RC-31342)

**Referencia**: Epic RC-31191 - Fase 1: Desbloqueo del Stack Tecnológico

### Fixed - Docker Staging Configuration

#### Bugfixes Post-Implementación RC-31268/RC-31269

- 🔧 **docker-compose.staging.yml**: Corregida estructura YAML (volumes al final)
- 🔧 **Puertos**: HTTP en 8080 para evitar conflicto con puerto 80 del sistema
- 🔧 **DNS**: Limpiada entrada duplicada en `/etc/hosts` (172.16.1.14 → 127.0.0.1)
- ✅ **Verificado**: `https://local.resumecoach.com` funcionando correctamente

**Referencia**: Ajustes post-deployment RC-31268 + RC-31269

### Added - SSL Setup Custom Domain Docker Staging (RC-31268)

#### Implementación SSL (Part 1/2)

- ✅ **Certificados SSL**: Script `generate-certs.sh` para certificados locales con mkcert
- ✅ **DNS Local**: Script `setup-hosts.sh` para configurar `/etc/hosts`
- ✅ **Nginx SSL**: Configurado TLS 1.2/1.3 + HSTS + security headers
- ✅ **Docker Compose**: Puertos 80/443 expuestos, volumen certificados SSL
- ✅ **HTTP Redirect**: Server block automático HTTP → HTTPS
- ✅ **Documentación**: Tech stories RC-31268 y RC-31269 + propuesta técnica

#### URLs Actualizadas

- ✅ **Dominio custom**: `https://local.resumecoach.com` (con SSL válido)
- ✅ **Alternativa**: `http://localhost:8080` (sin SSL, legacy)

#### Archivos Creados/Modificados

- **Scripts**: `scripts/generate-certs.sh`, `scripts/setup-hosts.sh`
- **Nginx**: `nginx/nginx.conf` (SSL config + HTTP/HTTPS servers)
- **Docker**: `docker-compose.staging.yml` (puertos, volumen certs)
- **Git**: `.gitignore` (excluir certificados), `nginx/certs/.gitkeep`
- **Docs**: `docs/propuesta-custom-domain-docker-staging.md`, `docs/jira/fase1/rc-31268-ssl-setup-part1.md`, `docs/jira/fase1/rc-31269-automation-docs-part2.md`

#### Próximos Pasos (RC-31269)

- ⏳ Automatización completa con Makefile
- ⏳ Scripts de verificación automática
- ⏳ Documentación exhaustiva y troubleshooting guide

**Tech Story**: [RC-31268](https://leadtech.atlassian.net/browse/RC-31268)  
**Epic**: [RC-31191](https://leadtech.atlassian.net/browse/RC-31191) - Fase 1: Desbloqueo Stack

### Added - Docker Staging Environment para Testing/Producción Local

#### Infraestructura Docker

- ✅ **docker-compose.staging.yml**: Configuración completa de servicios Docker
  - Nginx como reverse proxy en puerto 8080
  - Todos los microfrontends (shell, login, product, user, ui)
  - Health checks y restart policies
  - Networking optimizado
- ✅ **nginx/nginx.conf**: Configuración profesional de Nginx
  - CORS configurado para Module Federation
  - Cache control optimizado (no-cache para remoteEntry, inmutable para assets)
  - Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
  - Gzip compression
  - Error pages customizadas
  - Soporte para i18n (archivos JSON)
  - Health check endpoint (`/health`)

#### Scripts de Automatización

- ✅ **scripts/docker-staging.sh**: Script principal con comandos
  - `setup`: Build + start automático
  - `build`: Build de todas las apps
  - `start/stop/restart`: Control de servicios
  - `rebuild`: Rebuild + restart
  - `logs`: Ver logs (todos o por servicio)
  - `status`: Estado de contenedores
  - `health`: Health check completo
  - `clean`: Limpieza completa
- ✅ **scripts/verify-docker-setup.sh**: Verificación de prerequisitos
  - Verifica archivos necesarios
  - Verifica Docker y docker compose
  - Verifica estructura de apps
  - Verifica puertos disponibles
  - Health check automatizado

#### Makefile Actualizado

- ✅ Nuevos comandos Docker:
  - `make docker-setup`: Setup completo
  - `make docker-start/stop/restart`: Control de servicios
  - `make docker-logs/logs-nginx`: Visualización de logs
  - `make docker-status/health`: Monitoring
  - `make docker-rebuild/clean`: Rebuild y limpieza
- ✅ Comandos existentes mejorados
- ✅ Sistema de ayuda (`make help`)

#### Documentación Completa

- ✅ **DOCKER_STAGING_README.md**: Quick start guide
- ✅ **docs/docker-staging-guide.md**: Guía exhaustiva (2000+ líneas)
  - Casos de uso detallados
  - Troubleshooting completo
  - Arquitectura explicada
  - Workflows recomendados
  - Best practices
  - Comparación Dev vs Staging
- ✅ **DOCKER_IMPLEMENTATION_SUMMARY.md**: Resumen de implementación
- ✅ **readme.md**: Actualizado con referencias Docker
- ✅ **docs/jira/fase1/rc-31254-docker-staging.md**: Tech Story en Jira (412 líneas)
  - Hipótesis y problema a resolver
  - Implementación realizada detallada
  - Testing y validación completa
  - Conclusiones y aprendizajes técnicos
  - Métricas de impacto y mejoras futuras
  - Troubleshooting para QA
- ✅ **docs/jira/fase1/q1-s1-s2.md**: Actualizado con RC-31254 (Sprint 1)

#### Configuración de Proyecto

- ✅ **.dockerignore**: Exclusiones para Docker builds
- ✅ **.gitignore**: Actualizado con exclusiones Docker

#### Características Implementadas

- 🐳 **Entorno staging local** que simula producción
- 🌐 **URLs unificadas** en `http://localhost:8080/[app]`
- 🔄 **Module Federation** funcionando en modo build (real)
- 🔒 **CORS configurado** para permitir carga de remotes
- 📊 **Monitoring** con health checks y logs
- 🧹 **Scripts de limpieza** automáticos
- 🎯 **Testing E2E ready** para Playwright/Cypress
- 📋 **Tech Story en Jira** [RC-31254](https://leadtech.atlassian.net/browse/RC-31254)
  - Epic: RC-31191 - Fase 1: Desbloqueo del Stack
  - Story Points: 5 SP
  - Sprint: 2026 Q1 S2 - Team Migration
  - Estado: ✅ Completado

#### Arquitectura

```
Nginx (8080) → Shell + Login + Product + User + UI
├── CORS headers para Module Federation
├── Cache control optimizado
├── Security headers
└── Health checks
```

#### Casos de Uso

- ✅ Testing de builds antes de deploy
- ✅ Validación de Module Federation en modo build
- ✅ Tests E2E con Playwright
- ✅ Debugging de problemas de producción
- ✅ Demos a stakeholders
- ✅ Integración en CI/CD

#### Workflow Recomendado

1. **Desarrollo diario**: `pnpm dev` (hot reload)
2. **Pre-deploy**: `make docker-setup` (staging)
3. **Testing E2E**: `pnpm test:e2e` (contra Docker)
4. **Verificación**: `make docker-health`
5. **Deploy**: Con confianza de que funciona

#### Performance

- ⚡ Primera vez: ~2-3 minutos (build + docker up)
- ⚡ Rebuilds: ~1 minuto
- ⚡ Start/Stop: ~5-10 segundos
- 💾 Recursos: ~500MB RAM, ~500MB disco

#### Verificación

```bash
./scripts/verify-docker-setup.sh
# ✅ Todos los checks pasaron! 🎉
```

---

### Fixed - Migration Plan S3 Ready (Build sin Module Federation)

#### apps/migration-plan

**Problema resuelto:**

- Module Federation (`@module-federation/vite`) impedía que los scripts type="module" se ejecutaran correctamente, causando que React no se montara en el navegador

**Solución implementada:**

- ✅ Creada configuración alternativa `vite.config.s3.ts` SIN Module Federation
- ✅ Build optimizado específicamente para static hosting en S3
- ✅ HashRouter para navegación sin configuración de servidor
- ✅ Rutas relativas (`base: './'`) para compatibilidad con S3
- ✅ Corregidas rutas en Sidebar (sin prefijos `/plan/`)

**Cambios técnicos:**

- **vite.config.s3.ts**: Nueva configuración sin Module Federation
  - Target: `es2015` para mejor compatibilidad
  - Minify: `esbuild` (más rápido)
  - Base: `'./'` para rutas relativas
- **package.json**: Scripts actualizados para usar `vite.config.s3.ts`
  - `build`: Usa config S3 por defecto
  - `build:production`: Build optimizado para producción
  - `deploy:s3`: Bucket configurado correctamente
- **src/main.tsx**: Limpiado y restaurado a versión simple
- **Sidebar.tsx**: Rutas corregidas (sin `/plan/` prefix, usando rutas relativas)

**Optimizaciones logradas:**

- 📦 **Tamaño reducido**: ~256 KB (vs ~416 KB con MF) - 38% menor
- 📁 **Archivos**: 4 archivos (vs 14 con MF) - 71% menos
- ⚡ **Carga**: Instantánea, React se monta correctamente
- 🎯 **Complejidad**: Mucho más simple y mantenible

**Archivos generados:**

```
dist/
├── index.html (0.84 KB)
└── assets/
    ├── index-fCx2EV6F.css (13.65 KB)
    ├── index-e7zVKrY-.js (65.26 KB)
    └── react-vendor-eF0yPGjk.js (165.37 KB)
```

**Limpieza:**

- Eliminadas dependencias innecesarias: `vite-ssg`, `vite-plugin-pages`, `react-snap`
- Eliminados archivos de prueba: `test-app.html`, `dist-s3/`, archivos debug
- Código optimizado y listo para producción

**Documentación:**

- ✅ `S3_READY_FINAL.md`: Guía completa de despliegue y troubleshooting
- ✅ Tests realizados: Navegación, HashRouter, refresh, URLs directas
- ✅ Comandos documentados: `pnpm build:deploy`

**Estado:**

- ✅ **Aplicación completamente funcional en local**
- ✅ **Build generado y verificado**
- ✅ **Lista para deploy a S3**
- ✅ **Bucket configurado**: `s3://cv-migration-plan-documentation-static-website-856841852677`

---

### Fixed - Ajustes finales en Migration Plan y Shell

#### apps/migration-plan

- **Estimacion.tsx**: Eliminado módulo visual de colaboración del diagrama de Gantt
- **Estimacion.module.scss**: Añadido `display: flex`, `align-items: center`, `justify-content: center` a `.aiHighlight` para alineación horizontal
- **Hitos.tsx**: Eliminado módulo completo de grid de estadísticas (Mes 1-2, Mes 3, Mes 4-5, Mayo)

#### apps/shell

- **App.tsx**: Añadido `maxWidth: '1260px'` y `margin: '0 auto'` al componente `HomePage` para centrado y ancho máximo

#### Resultados

- ✅ Diagrama de Gantt más limpio sin fila redundante de colaboración
- ✅ Destacado de IA correctamente alineado horizontalmente
- ✅ Grid de estadísticas eliminado para simplificar vista de Hitos
- ✅ HomePage con mejor contenido centrado y legible

### Added - Migration Plan App y mejoras en Shell

#### Nueva aplicación: apps/migration-plan

- **Aplicación completa** para visualizar el plan de migración CV Legacy → CV-Hibrid
- **Navegación por fases**: Contexto General, Fases 1-3, Riesgos, Estimación, Hitos y Métricas
- **Sidebar interactivo**: Con menú de navegación persistente y diseño consistente
- **Componentes colapsables**: PhaseCard con transiciones suaves y chevron rotatorio
- **Secciones detalladas**: Node.js, React, Testing y Despliegues con información desplegable
- **Diagrama de Gantt**: Visualización de trabajo paralelo para 2 desarrolladores
- **Timeline acelerado**: Estimación de 5 meses con Cursor AI
- **Integrado en shell**: Accesible desde `/plan` con Module Federation
- **Puerto**: 5006

#### Mejoras en apps/shell

- **Estilos aislados**: Encapsulados con clase `.shell-app` para evitar interferencias
- **index.css**: Eliminados estilos globales agresivos, solo estilos específicos del shell
- **App.css**: Añadido prefijo `.shell-app` a todos los selectores
- **Navegación mejorada**:
  - Fondo azul `rgba(30, 59, 139, 1)` alineado con sidebar de migration-plan
  - Reducción de 15% en tamaño (padding, gap, font-size)
  - Alineación a la derecha con `justifyContent: 'flex-end'`
  - Tipografía blanca para mejor contraste
  - Width 100% y height 100% para ocupar todo el espacio
  - Padding ajustado: top/bottom 9px, right 20px
- **vite.config.ts**: Añadido alias `@apps/migration-plan` y remote en Module Federation

#### Correcciones en apps/migration-plan

- **App.tsx**: Export nombrado `MigrationPlanRoutes` sin BrowserRouter para evitar conflictos
- **Routing**: Rutas relativas para funcionar correctamente como nested routes bajo `/plan/*`
- **Sidebar**:
  - Rutas dinámicas que detectan contexto (shell vs standalone)
  - Fondo transparente en `.nav`
  - Color blanco explícito en `.label` para mejor visibilidad
  - Iconos alineados verticalmente con `flex-shrink: 0`

#### Resultados

- ✅ Shell no interfiere con estilos de apps remotas (login, user, migration-plan)
- ✅ Navigation visualmente coherente con el resto del sistema
- ✅ Migration Plan funciona correctamente desde shell y standalone
- ✅ Mejor mantenibilidad y escalabilidad del código

### Fixed - Correcciones críticas en login flow y traducciones

#### Problema 1: Hash routing en formulario de login

- **SigningRedirection.jsx**: Añadido `dispatchEvent(new HashChangeEvent('hashchange'))` para forzar actualización del componente
- **Controller.tsx**: Mejorado `onHashChange` con validación de rutas y logs de debug
- **Controller.tsx**: Añadido efecto de sincronización entre `route` state y `location.hash`
- **Estado**: Parcialmente resuelto (funciona en dev, requiere más investigación en build)

#### Problema 2: Login exitoso no redirigía a /user

- **Controller.tsx**: Modificado `handleCognitoLogin` para evitar doble llamada a `onSignInSuccess`
- **Solución**: `signInWithCognito` ya guarda auth state, solo se necesita redirigir después
- **Resultado**: ✅ Login con email/password ahora redirige correctamente a `/user`

#### Problema 3: Traducciones mostraban "missing translation" en build

- **api.json**: Cambiado path de `/dist/i18n/$1.json` a `/i18n/$1.json`
- **vite.config.ts**: Actualizado middleware dev de `/dist/i18n` a `/i18n`
- **vite.config.ts**: Añadida configuración `preview.cors` para permitir peticiones cross-origin desde shell
- **appConfig.js**: Mejorada lógica de `I18N_BASE_URL` para detectar correctamente localhost en dev y preview
- **Resultado**: ✅ Traducciones cargando correctamente en preview

#### Build configuration fixes

- **apps/shell**: Añadidas dependencias `@tanstack/react-query` y `zustand` como shared en Module Federation
- **apps/login**: Añadidas dependencias `@tanstack/react-query` y `zustand` como shared en Module Federation
- **Resultado**: ✅ `pnpm build:all` exitoso sin errores de dependencias

### Fixed - Problema de Hash Routing en apps/login

- **Componente `SigningRedirection.jsx`**:
  - Corregido el manejo de redirecciones que usaba `window.location.href` causando recargas de página
  - Implementada detección de hash: si la redirección empieza con `#`, usa `window.location.hash`
  - Eliminadas recargas innecesarias al cambiar entre formularios de signup/signin
  - Mantiene retrocompatibilidad con URLs no-hash

- **Controller.tsx**:
  - Mejorado el callback `onHashChange` con validación de rutas válidas
  - Añadido efecto de sincronización entre `route` state y `location.hash`
  - Implementados logs de debug para facilitar troubleshooting: `[Controller] Hash changed to: #/signin`
  - Prevención de hashes inválidos con fallback a ruta por defecto

- **Resultado**:
  - ✅ Transiciones instantáneas entre formularios sin recargas
  - ✅ Mejor experiencia de usuario (UX)
  - ✅ Mantiene el estado del componente durante navegación
  - ✅ Verificado en navegador: signup ↔ signin funciona correctamente

### Added - Stories de Storybook para componentes moleculares

- Creada story de Storybook para componente `Card` con múltiples variantes
- Creada story de Storybook para componente `ActionCard` demostrando todos los tipos de badges (NEXT STEP, RECOMMENDED, ESSENTIAL)
- Creada story de Storybook para componente `DocumentPreview` con estados editables y vacíos
- Creada story de Storybook para componente `ArticleList` con artículos de ejemplo
- Todas las stories incluyen tipos TypeScript apropiados y controles interactivos (argTypes)
- Las stories demuestran todas las props y variantes de cada componente

### Added - Rediseño del Dashboard con nuevos componentes UI

- Creado componente reutilizable Card en `packages/ui/src/molecules/Card`
- Creado componente ActionCard para tarjetas de acción con badges (NEXT STEP, RECOMMENDED, ESSENTIAL)
- Creado componente DocumentPreview para vistas previas de documentos con acciones
- Creado componente ArticleList para la sección TOP READS
- Rediseñado el Dashboard con nuevo layout según especificaciones de diseño
- Añadido mensaje de bienvenida personalizado: "Hi! [Name] get ready to land your dream job"
- Implementado layout grid responsive para tarjetas del dashboard
- Integrados nuevos componentes con datos existentes de usuario (documentos, perfil)
- Actualizados los path mappings de TypeScript para `@packages/ui` en `apps/user`

### Added - packages/auth

#### Implementación de Package Compartido de Autenticación

- **Nuevo package `@packages/auth` creado**:
  - Store de Zustand con persistencia en localStorage para estado de autenticación compartido
  - Hooks de React: `useAuth()`, `useIsAuthenticated()`, `useUser()`, `useAuthToken()`
  - Servicios de autenticación: `loginWithEmail()`, `loginWithProvider()`, `signUpWithEmail()`, `logout()`
  - Función `initializeFromLegacySession()` para migración desde cookies legacy
  - Tipos TypeScript completos: `AuthProvider`, `User`, `AuthState`
  - Función `createMockUser()` para desarrollo y testing
  - README completo con ejemplos de uso

- **Integración en apps/login**:
  - `useAuthActions` modificado para guardar estado en store compartido después del login
  - Compatibilidad mantenida con sistema legacy de cookies
  - Redirección a `/user` después de login exitoso
  - Alias de Vite configurado: `@packages/auth`

- **Integración en apps/user**:
  - `Dashboard` y `Profile` leen datos del usuario desde store compartido
  - Protección de rutas: redirección a `/login` si no está autenticado
  - Prioriza datos del store de autenticación sobre datos de API
  - Alias de Vite configurado: `@packages/auth`

- **Configuración**:
  - Dependencias añadidas en `apps/login/package.json` y `apps/user/package.json`
  - Zustand instalado en workspace root
  - TypeScript configurado correctamente

#### Resolución de Problemas de Hidratación

- **Problema resuelto**: Zustand persist no estaba leyendo correctamente los datos de localStorage
- **Solución implementada**: Fallback en `useAuth()` que lee directamente de localStorage cuando el store no está hidratado
- **Mejoras adicionales**:
  - Función `merge` añadida al store para combinar estados correctamente
  - Logging mejorado para debugging de hidratación
  - Verificación de discrepancia entre localStorage y store con actualización automática
- **Resultado**: Flujo completo login → user funcionando correctamente con datos compartidos

### Added - apps/user

#### Semana 4-5: Integración y Testing

- **Optimizaciones de Performance**:
  - Code splitting implementado: react-vendor, query-vendor, router-vendor separados
  - Lazy loading de todas las páginas (incluyendo Dashboard)
  - Memoización de componentes con React.memo
  - useMemo y useCallback para evitar recálculos innecesarios
  - Optimización de TanStack Query: refetchOnWindowFocus y refetchOnMount deshabilitados
  - CSS code splitting activado
  - Minificación con esbuild
  - Bundle size optimizado: archivos más pequeños y mejor organizados
  - Mejora significativa en tiempos de carga inicial
- **Tests E2E con Playwright implementados**:
  - `user-navigation.spec.ts`: 5 tests para navegación entre páginas
  - `user-data-loading.spec.ts`: 4 tests para carga de datos
  - `user-integration.spec.ts`: 4 tests para integración con shell
  - Total: 13 tests E2E pasando
  - Configuración de Playwright con webServer para shell y user
  - Scripts npm añadidos: `test:e2e`, `test:e2e:ui`, `test:e2e:headed`, `test:e2e:debug`
  - Cobertura completa de flujos de usuario principales
- **Tests con Vitest implementados**:
  - `uiStore.test.ts`: 7 tests para store de Zustand (modals, sidebar, loading)
  - `useUser.test.tsx`: 4 tests para hooks de user profile y settings
  - `useDocuments.test.tsx`: 4 tests para hooks de documentos (lista y detalle)
  - `useSubscription.test.tsx`: 2 tests para hooks de suscripción
  - `Layout.test.tsx`: 3 tests para componente Layout
  - Total: 20 tests pasando
  - Mocks configurados correctamente para APIs
  - Tests de éxito y error para todos los hooks
  - Cobertura de funcionalidad principal
- **Actualizaciones técnicas**:
  - Hooks actualizados para usar `@packages/query` en lugar de import directo
  - Añadida dependencia `@tanstack/react-query` como devDependency para tests
  - Configuración de Vitest optimizada para tests de componentes React

#### Semana 4-5: Integración y Testing

- **Integración con shell (Module Federation)**:
  - Añadido alias `@apps/user` en `vite.config.ts` del shell
  - Configurado remote `user` en Module Federation para producción
  - Añadido puerto 5004 a configuración CORS del shell
  - Componente `UserPage` con lazy loading y Suspense boundaries
- **Configuración de rutas en shell**:
  - Ruta `/user/*` configurada en `App.tsx` del shell
  - Navegación entre microfrontends funcionando
  - Enlace "User" añadido a la navegación principal del shell
- **Error boundaries implementados**:
  - Componente `ErrorBoundary` creado en `apps/shell/src/components/`
  - Manejo de errores con fallback UI informativo
  - Mensajes de error claros para debugging
- **Loading states consistentes**:
  - Spinner de carga con animación CSS
  - Mensajes de carga claros durante la carga del módulo
- **Soporte dual (standalone y microfrontend)**:
  - `App.tsx` de User soporta modo standalone y microfrontend
  - Rutas absolutas que funcionan en ambos contextos
  - `QueryProvider` integrado automáticamente cuando se carga desde shell
  - Sin conflictos de `BrowserRouter` (solo se usa en modo standalone)
  - Función `getRoute()` para normalizar rutas según el contexto

### Added - apps/shell

- **Componente ErrorBoundary**: Manejo de errores para microfrontends
- **Integración de User**: Configuración completa para cargar `apps/user` como microfrontend
- **Animación de spinner**: CSS keyframes para loading states

### Added - apps/user

#### Semana 3-4: Migración de Estado (Redux → Zustand + TanStack Query)

- **Store de Zustand para estado UI**: `uiStore.ts` creado
  - Estado de modals (isModalOpen, activeModal)
  - Estado de sidebar (sidebarOpen)
  - Estado de loading (isLoading)
  - Actions: openModal, closeModal, toggleSidebar, setLoading
  - DevTools integrado para debugging
- **Servicios API creados**: `userApi.ts` con funciones para datos del servidor
  - `fetchUserProfile`, `updateUserProfile` - Gestión de perfil de usuario
  - `fetchUserSettings`, `updateUserSettings` - Configuración de usuario
  - `fetchDocuments`, `fetchDocument` - Gestión de documentos
  - `fetchSubscription` - Información de suscripción
  - Implementaciones mock (listas para reemplazar con llamadas reales)
  - Tipos TypeScript definidos para todas las entidades
- **Hooks de TanStack Query implementados**:
  - `useUser.ts`: hooks para profile y settings con cache optimizado
    - `useUserProfile`, `useUpdateUserProfile`
    - `useUserSettings`, `useUpdateUserSettings`
  - `useDocuments.ts`: hooks para lista y detalle de documentos
    - `useDocuments`, `useDocument`
    - `useCreateDocument`, `useDeleteDocument` (mutations)
  - `useSubscription.ts`: hooks para información de suscripción
    - `useSubscription`, `useUpdateSubscription`
  - Estrategias de cache configuradas (staleTime, gcTime)
  - Optimistic updates implementados en mutations
  - Query keys organizados jerárquicamente
- **Componentes actualizados con datos reales**:
  - `Dashboard`: Muestra datos de user profile, documents count y subscription plan
  - `Profile`: Muestra información personal y configuración con loading/error states
  - `Documents`: Lista de documentos con estados de carga y error
  - `Subscription`: Información de suscripción con badges de estado
  - Todos los componentes usando hooks de TanStack Query
  - Estados de loading y error manejados correctamente

#### Semana 2-3: Migración de Componentes Core

- **Estructura de páginas creada**: Componentes principales migrados a TypeScript
  - `Dashboard`: Página principal con cards de navegación
  - `Profile`: Página de perfil de usuario
  - `Documents`: Página de gestión de documentos
  - `Subscription`: Página de suscripción
  - Todas las páginas con TypeScript estricto y Sass modules
- **Layout y navegación implementados**:
  - Componente `Layout` con navbar responsive
  - Navegación entre páginas con React Router v6
  - Indicador visual de página activa
  - Estilos con Sass modules (sin dependencias de MUI)
- **Routing configurado**:
  - React Router v6 con lazy loading de páginas
  - Suspense boundaries para loading states
  - Redirects y rutas catch-all configurados
  - Rutas: `/dashboard`, `/profile`, `/documents`, `/subscription`
- **Estilos modernos**:
  - Sass modules en todos los componentes
  - Diseño responsive y accesible
  - Sin dependencias de Material-UI
  - Variables CSS y mixins organizados

#### Setup inicial de microfrontend cv-app-user

- **Estructura base creada**: Microfrontend configurado con Vite + Module Federation
  - Puerto 5004 configurado
  - Module Federation exponiendo `./App`
  - TypeScript configurado con strict mode
  - Vitest configurado para testing
  - ESLint configurado
- **Integración de TanStack Query**: Configurado desde el inicio
  - `QueryProvider` integrado en `main.tsx`
  - Usa `@packages/query` compartido
  - DevTools habilitado en desarrollo
- **Dependencias modernas**:
  - React 18.3.1
  - React Router DOM 6.28.0
  - Zustand 5.0.2 (para estado UI)
  - TanStack Query vía `@packages/query`
- **Archivos creados**:
  - `package.json` con todas las dependencias necesarias
  - `vite.config.ts` con Module Federation configurado
  - `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
  - `vitest.config.ts` para testing
  - `index.html` entry point
  - `src/main.tsx` con QueryProvider
  - `src/App.tsx` componente básico con React Router
  - `src/test/setup.ts` para configuración de tests

### Changed - apps/login

#### Refactorización completa de Controller.tsx a React moderno

- **Migración de class component a functional component**: `Controller.tsx` completamente refactorizado
  - Convertido de React class component a functional component con hooks
  - Eliminado `componentDidMount` → reemplazado por `useEffect`
  - Eliminado `this.state` → reemplazado por múltiples `useState` hooks
  - Eliminado variables privadas de clase → reemplazado por `useRef` hooks
  - Eliminado métodos de clase → reemplazado por funciones con `useCallback`
  - Todas las promesas convertidas de `.then()/.catch()` a `async/await`
- **Funciones utilitarias extraídas**: Métodos estáticos convertidos a funciones puras exportables
  - `navigatePublicly`, `goUrl`, `getRoute`, `getDomain` ahora son funciones exportables
  - `buildAuthManager`, `buildStateRequest`, `getHash`, `getParams`, `getStateSessionItems` como funciones helper puras
- **Optimizaciones de rendimiento**:
  - `useCallback` para todas las funciones que se pasan como props o dependencias
  - `useMemo` para `displayLoading` y `sendAnalyticsData`
  - Dependencias correctamente especificadas en todos los hooks
- **Compatibilidad mantenida**:
  - `ControllerWrapper` mantiene la integración con TanStack Query
  - Compatibilidad con código legacy (AuthManager, SignUpModule)
  - Todos los flujos de autenticación funcionan correctamente

- **Mejoras en manejo de errores**:
  - `handleVisitor` ahora usa `async/await` con mejor manejo de errores
  - Logs mejorados para debugging
  - Fallback a traducciones incluso si HandleVisitorUseCase falla

#### Integración de TanStack Query

- **Package compartido `packages/query`**: Creado para configuración centralizada de TanStack Query
  - `QueryClient` configurado con opciones por defecto
  - `QueryProvider` reutilizable para todas las apps
  - Utilidades para manejo de errores consistentes
- **Hooks de autenticación**: Creados hooks personalizados para todos los flujos
  - `useLogin()` para login con email/password
  - `useSignUp()` para registro
  - `useGoogleAuth()` y `useLinkedInAuth()` para OAuth
  - `usePasswordRescue()` y `usePasswordReset()` para recuperación de contraseña
  - `useAuthActions()` hook consolidado que expone todas las acciones
- **Servicios API**: Abstracción de llamadas API en `authApi.ts`
  - Funciones puras que pueden ser usadas por TanStack Query
  - Wrappers de `PostAuthTokenHandler` y `AuthManager`
- **Integración en Controller**: `ControllerWrapper` usa hooks de TanStack Query
  - Props opcionales para mantener compatibilidad con código legacy
  - Fallback automático si TanStack Query no está disponible

### Changed - apps/login y apps/shell

#### Migración de botones al nuevo Button de packages/ui

- **Sustitución de botones**: Todos los botones del proyecto ahora usan el nuevo `Button` de `@packages/ui/atoms/Button`
  - `GoogleLogin.tsx`: Actualizado para usar el nuevo Button con `variant='secondary'`
  - `LinkedInLogin.tsx`: Actualizado para usar el nuevo Button con `variant='secondary'`
  - `PasswordRescue.jsx`: Actualizado para usar el nuevo Button con `variant='secondary'` y `isFullWidth`
  - `PasswordReset.jsx`: Actualizado para usar el nuevo Button con `variant='secondary'` y `isFullWidth`
  - `ButtonStyles.jsx`: Renombrado de `.js` a `.jsx` y actualizado para usar el nuevo Button
  - `SignInButton.jsx`: Actualizado para usar el nuevo Button con `variant='primary'` y `isFullWidth`
  - `SignUpButton.jsx`: Actualizado para usar el nuevo Button con `variant='primary'` y `isFullWidth`
- **Actualización de imports**: Todos los imports cambiados de `@npm_leadtech/cv-lib-app-components` a `@packages/ui/atoms/Button`
- **Actualización de props**: Cambiado `color='primary'` → `variant='primary'` y `color='secondary'` → `variant='secondary'`
- **Actualización de estilos**: Cambiado `style={{ width: '100%' }}` → `isFullWidth` prop

#### Fixes - apps/shell

- **`apps/shell/src/App.tsx`**: Corregido el import de `RemoteButton` para usar correctamente el named export `Button` con `React.lazy()`
  - Cambiado de `import('@packages/ui/atoms/Button')` a `import('@packages/ui/atoms/Button').then(module => ({ default: module.Button }))`
- **`apps/shell/vite.config.ts`**: Añadido polyfill para `process` en la configuración de `define` para resolver errores de "process is not defined"

#### Changed - apps/login

- **`apps/login/src/app/components/Signing/ButtonStyles.js`**: Renombrado a `ButtonStyles.jsx` porque contenía JSX
- **`apps/login/src/app/components/Signing/SignInButton.jsx`**: Actualizado import para usar `.jsx` explícitamente
- **`apps/login/src/app/components/Signing/SignUpButton.jsx`**: Actualizado import para usar `.jsx` explícitamente

## [Unreleased]

### Fixed - Ajustes finales en Migration Plan y Shell

#### apps/migration-plan

- **Estimacion.tsx**: Eliminado módulo visual de colaboración del diagrama de Gantt
- **Estimacion.module.scss**: Añadido `display: flex`, `align-items: center`, `justify-content: center` a `.aiHighlight` para alineación horizontal
- **Hitos.tsx**: Eliminado módulo completo de grid de estadísticas (Mes 1-2, Mes 3, Mes 4-5, Mayo)

#### apps/shell

- **App.tsx**: Añadido `maxWidth: '1260px'` y `margin: '0 auto'` al componente `HomePage` para centrado y ancho máximo

#### Resultados

- ✅ Diagrama de Gantt más limpio sin fila redundante de colaboración
- ✅ Destacado de IA correctamente alineado horizontalmente
- ✅ Grid de estadísticas eliminado para simplificar vista de Hitos
- ✅ HomePage con mejor contenido centrado y legible

### Added - Migration Plan App y mejoras en Shell

#### Nueva aplicación: apps/migration-plan

- **Aplicación completa** para visualizar el plan de migración CV Legacy → CV-Hibrid
- **Navegación por fases**: Contexto General, Fases 1-3, Riesgos, Estimación, Hitos y Métricas
- **Sidebar interactivo**: Con menú de navegación persistente y diseño consistente
- **Componentes colapsables**: PhaseCard con transiciones suaves y chevron rotatorio
- **Secciones detalladas**: Node.js, React, Testing y Despliegues con información desplegable
- **Diagrama de Gantt**: Visualización de trabajo paralelo para 2 desarrolladores
- **Timeline acelerado**: Estimación de 5 meses con Cursor AI
- **Integrado en shell**: Accesible desde `/plan` con Module Federation
- **Puerto**: 5006

#### Mejoras en apps/shell

- **Estilos aislados**: Encapsulados con clase `.shell-app` para evitar interferencias
- **index.css**: Eliminados estilos globales agresivos, solo estilos específicos del shell
- **App.css**: Añadido prefijo `.shell-app` a todos los selectores
- **Navegación mejorada**:
  - Fondo azul `rgba(30, 59, 139, 1)` alineado con sidebar de migration-plan
  - Reducción de 15% en tamaño (padding, gap, font-size)
  - Alineación a la derecha con `justifyContent: 'flex-end'`
  - Tipografía blanca para mejor contraste
  - Width 100% y height 100% para ocupar todo el espacio
  - Padding ajustado: top/bottom 9px, right 20px
- **vite.config.ts**: Añadido alias `@apps/migration-plan` y remote en Module Federation

#### Correcciones en apps/migration-plan

- **App.tsx**: Export nombrado `MigrationPlanRoutes` sin BrowserRouter para evitar conflictos
- **Routing**: Rutas relativas para funcionar correctamente como nested routes bajo `/plan/*`
- **Sidebar**:
  - Rutas dinámicas que detectan contexto (shell vs standalone)
  - Fondo transparente en `.nav`
  - Color blanco explícito en `.label` para mejor visibilidad
  - Iconos alineados verticalmente con `flex-shrink: 0`

#### Resultados

- ✅ Shell no interfiere con estilos de apps remotas (login, user, migration-plan)
- ✅ Navigation visualmente coherente con el resto del sistema
- ✅ Migration Plan funciona correctamente desde shell y standalone
- ✅ Mejor mantenibilidad y escalabilidad del código

### Fixed - apps/login

#### Solución del warning de ESLint sobre babel-eslint deprecado

- **.eslintrc.json**: Actualizado parser de ESLint
  - Reemplazado `babel-eslint` (deprecado) por `@babel/eslint-parser`
  - Configurado `requireConfigFile: true` para usar `babel.config.cjs`
  - Añadida configuración de `overrides` para usar `@typescript-eslint/parser` en archivos `.ts` y `.tsx`
  - Mantiene compatibilidad con archivos `.js` y `.jsx` usando `@babel/eslint-parser`

- **babel.config.js**: Renombrado a `babel.config.cjs`
  - Compatibilidad con proyectos ES modules (`"type": "module"` en package.json)
  - Evita errores de parsing cuando Babel intenta cargar la configuración

- **package.json**: Añadidas dependencias de Babel
  - `@babel/core`: ^7.26.0
  - `@babel/eslint-parser`: ^7.26.0
  - `@babel/preset-react`: ^7.26.0
  - `@babel/preset-env`: ^7.26.0
  - `@babel/plugin-proposal-class-properties`: ^7.18.6
  - `@babel/plugin-proposal-object-rest-spread`: ^7.20.7
  - `@babel/plugin-syntax-dynamic-import`: ^7.8.3
  - `@babel/plugin-transform-classes`: ^7.23.0
  - `@emotion/babel-plugin`: ^11.11.0
  - `@typescript-eslint/parser`: ^8.0.0
  - `@typescript-eslint/eslint-plugin`: ^8.0.0

#### Resultado

- El warning "Deprecated ESLint parser 'babel-eslint' used instead of '@babel/eslint-parser'" ha sido eliminado
- ESLint funciona correctamente con archivos JavaScript y TypeScript
- No hay errores de parsing relacionados con la configuración de Babel

#### Solución del problema de traducciones (i18n)

- **config/appConfig.js**: Añadida variable `I18N_BASE_URL`
  - Detecta automáticamente si la app se carga desde el shell (localhost:5000)
  - En desarrollo, cuando se carga desde shell, usa `http://localhost:5003` para i18n
  - Permite override vía variable de entorno `VITE_I18N_BASE_URL`
  - Resuelve el problema de que las traducciones no se cargaban cuando login se ejecutaba dentro del shell

- **services/api/GetLanguage/GetLanguageHandler.js**: Actualizado para usar `I18N_BASE_URL`
  - Reemplaza `document.location.origin` por `I18N_BASE_URL` como `apiPrefix`
  - Asegura que las peticiones de traducción se hagan al servidor correcto

- **vite.config.ts**: Mejoras en el middleware CORS del plugin `copyI18nPlugin`
  - Añadidos headers adicionales permitidos: `Expires`, `If-Modified-Since`, `Last-Modified`, `ETag`
  - Resuelve errores de CORS preflight cuando la librería `@npm_leadtech/jsr-lib-http` envía estos headers
  - Métodos HTTP permitidos: `GET, HEAD, OPTIONS, POST, PUT, DELETE`

- **services/SetupTranslations.js**: Añadidos logs de depuración
  - Logs detallados para rastrear el flujo de carga de traducciones
  - Mejora la visibilidad de errores durante el desarrollo

- **Controller.tsx**: Mejoras en el manejo de errores
  - `SetLanguage` se ejecuta incluso si `HandleVisitorUseCase` falla
  - Asegura que las traducciones se carguen independientemente del estado de la sesión
  - Logs adicionales para debugging

#### Resultado

- Las traducciones ahora se cargan correctamente cuando login se ejecuta dentro del shell
- Los textos se muestran correctamente en lugar de "missing translation"
- Las peticiones a `/dist/i18n/en-US.json` se completan exitosamente con status 200

## [1.1.0] - 2025-12-04

### Added - apps/login

#### Migración completa de Webpack a Vite + Module Federation

- **vite.config.ts**: Nueva configuración de Vite para el microfrontend de login
  - Configuración de Module Federation con `@originjs/vite-plugin-federation`
  - Puerto 5003 con CORS habilitado para todos los microfrontends
  - Plugin `fixAuthManagerPlugin` para corregir errores de sintaxis en `@npm_leadtech/cv-lib-auth`
  - Plugin `fixGlobalThisPlugin` para corregir `var _global = this` en `amazon-cognito-identity-js`
  - Plugin `copyI18nPlugin` para copiar archivos de traducción en build
  - Configuración de esbuild para procesar JSX en archivos .js/.jsx
  - Optimización de dependencias con exclusiones específicas

- **index.html**: Nuevo archivo HTML para Vite
  - Polyfills para `global` y `crypto` (requeridos por amazon-cognito-identity-js)
  - Configuración de viewport y meta tags

- **src/main.tsx**: Nuevo entry point para React 18
  - Usa `createRoot` en lugar del deprecated `ReactDOM.render`
  - Import de polyfills antes de otros módulos

- **src/app/App.tsx**: Componente principal refactorizado
  - Functional component con hooks (useEffect)
  - Inicialización de analytics, logger y traducciones
  - Import del polyfill centralizado

- **src/polyfills.ts**: Archivo centralizado de polyfills
  - Polyfill para `crypto` (getRandomValues, randomUUID)
  - Polyfill para `global` → `globalThis`

- **tsconfig.json, tsconfig.app.json, tsconfig.node.json**: Configuración TypeScript
  - Basado en la configuración de apps/product
  - Soporte para JSX automático

- **vitest.config.ts**: Configuración de testing con Vitest
  - Reemplazo de Jest
  - Mocks para objetos globales

#### Componentes migrados a TypeScript y Sass

- **Controller.tsx**: Migrado de .js a .tsx
  - Añadidos tipos TypeScript para props y state
  - Import del polyfill centralizado

- **components/Loading/CircularProgress.tsx**: Nuevo componente
  - Reemplazo del CircularProgress de MUI
  - Estilos con Sass modules (CircularProgress.module.scss)

- **components/Loading/LoadingLayer.tsx**: Migrado de .js
  - Eliminación de `withStyles` HOC de MUI
  - Estilos con Sass modules

- **components/Google/GoogleLogin.tsx**: Migrado de .js
  - Reemplazo del Button de MUI por componente de @packages/ui
  - Estilos con Sass modules (GoogleLogin.module.scss)

- **components/LinkedIn/LinkedInLogin.tsx**: Migrado de .js
  - Reemplazo del Button de MUI por componente de @packages/ui
  - Estilos con Sass modules (LinkedInLogin.module.scss)

- **components/Divider/Divider.tsx**: Migrado de .js
  - Reemplazo del Divider de MUI por elemento HTML simple
  - Estilos con Sass modules (Divider.module.scss)

- **components/SocialButtonsInline/SocialButtonsInline.tsx**: Migrado de .js
  - Eliminación de @emotion/styled
  - Estilos con Sass modules

#### Archivos renombrados de .js a .jsx

- `components/Label/LabelPassword.jsx`
- `components/Label/LowerCasedLabelForm.jsx`
- `components/Loading/LoadingInitial.jsx`
- `components/Password/PasswordRescue.jsx`
- `components/Password/PasswordReset.jsx`
- `components/Signing/HelpMessage.jsx`
- `components/Signing/SignIn.jsx`
- `components/Signing/SignUp.jsx`
- `components/Signing/SignInButton.jsx`
- `components/Signing/SignUpButton.jsx`
- `components/lib/IntroductionTop.jsx`
- `components/lib/SigningRedirection.jsx`
- `components/lib/FlashMessage.jsx`
- `hoc/withLoginComponent.jsx`

### Changed - apps/login

- **package.json**: Actualización de dependencias
  - Actualizado React de 16.x a ^18.3.1
  - Actualizado react-dom a ^18.3.1
  - Añadido Vite 6+, @vitejs/plugin-react, @originjs/vite-plugin-federation
  - Añadido TypeScript y tipos (@types/react, @types/react-dom)
  - Añadido Vitest para testing
  - Scripts actualizados: `dev: "vite dev"`, `build: "vite build"`, `test: "vitest"`

- **config/appConfig.js**: Corrección para desarrollo local
  - Detección de localhost/127.0.0.1 para usar 'local.resumecoach.com' como hostname

### Removed - apps/login

- **webpack.config.js**: Eliminado (reemplazado por vite.config.ts)
- Dependencias de Webpack (webpack, webpack-cli, babel-loader, etc.)
- Scripts de Webpack

### Added - apps/shell

- **vite.config.ts**: Plugins adicionales
  - `fixGlobalThisPlugin`: Corrige `var _global = this` en amazon-cognito-identity-js
  - Desactivación condicional de Module Federation en desarrollo
  - `optimizeDeps.include` para buffer y amazon-cognito-identity-js

- **index.html**: Polyfills para módulos remotos
  - Polyfill para `global` → `globalThis`
  - Asegurar `crypto` disponible en `global` y `globalThis`

- **src/App.tsx**: Carga de login vía path alias
  - En desarrollo: `import('@apps/login/app/App.tsx')`
  - En producción: Module Federation `import('login/App')`

### Changed - apps/shell

- **vite.config.ts**: Module Federation condicional
  - Desactivado en NODE_ENV=development para evitar conflictos con login
  - Activo en producción/preview

### Fixed - packages/ui

- **src/index.tsx**: Eliminado auto-mount
  - Removido código que montaba automáticamente la demo de UI Kit
  - Esto bloqueaba el renderizado del shell cuando se importaba

### Technical Notes

#### Plugins de Vite creados

1. **fixAuthManagerPlugin**: Transforma `const` a `let` en AuthManager.js para permitir reasignación
2. **fixGlobalThisPlugin**: Transforma `var _global = this;` a `var _global = globalThis;` para compatibilidad con ES modules
3. **copyI18nPlugin**: Copia archivos de traducción i18n en el build

#### Problemas resueltos

- Error `Cannot read properties of undefined (reading 'crypto')`: Polyfills añadidos
- Error `This assignment will throw because "errorMessage" is a constant`: Plugin fixAuthManagerPlugin
- Error `var _global = this` en strict mode: Plugin fixGlobalThisPlugin
- Error de múltiples instancias de React: Module Federation desactivado en dev
- Error `createRoot() on a container that has already been passed`: Eliminado auto-mount de UI Kit

#### Limitaciones conocidas

- Service Worker intenta registrarse en /serviceWorker.js que no existe en el shell
- Requests CORS a stage.resumecoach.com bloqueados en desarrollo local
- Algunos textos muestran duplicación (ej: "Google Google", "LinkedIn LinkedIn") - pendiente de revisión

---

## [1.0.0] - 2025-XX-XX

### Added

- Configuración inicial del monorepo con pnpm workspaces
- apps/shell: Host principal con Vite + Module Federation
- apps/product: Microfrontend de ejemplo migrado a Vite
- packages/ui: UI Kit compartido con Storybook
