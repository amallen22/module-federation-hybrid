# Plan de Migración: CV Legacy → CV-Hibrid
## Arquitectura de Microservicios con Vite Module Federation
# Contexto General
## Situación Actual
**Proyecto Legacy** (`/home/amallen/www/cv/cv-environment-local`):
* 20+ aplicaciones independientes en Webpack
* Dependencia crítica de Material-UI v5
* Redux/Redux Toolkit para estado global
* Jest para testing
* React 16-18 (versiones mixtas)
* Node v10.17.0 (legacy)
* Comunicación entre apps vía cookies y session storage
* Despliegues acoplados y lentos
**Proyecto Nuevo** (`/home/amallen/www/cv-apps/cv-hibrid`):
* Arquitectura de microservicios con Module Federation
* Vite 6+ como build tool
* React 18.3+
* TypeScript 5+
* pnpm workspaces
* Zustand para estado local/global
* TanStack Query (React Query) para datos asíncronos y cache
* Actualmente: `shell` (host), `product`, `login` (migrados), `user` (en progreso)
* UI Kit propio en `packages/ui` (reemplazando MUI)
## Objetivo Final
Migrar progresivamente todas las aplicaciones legacy a microservicios independientes, desacoplados y modernos, desplegables de forma autónoma.
# FASE 1: Desbloqueo del Stack Tecnológico
## Duración Estimada: 4-6 semanas (2 desarrolladores)
## 1.1 Completar UI Kit Propio (2-3 semanas)
### Contexto
* Ya existe `packages/ui` con estructura base y Storybook
* Login ya usa algunos componentes del nuevo UI Kit (Button)
* Necesitamos completar todos los componentes de MUI que se usan en el proyecto
### Análisis de Componentes MUI a Reemplazar
Revisar uso de MUI en apps legacy:
* `cv-app-login`: Button, CircularProgress, Divider (ya migrados)
* `cv-app-user`: Box, Card, Dialog, TextField, Select, Tabs, Avatar, Chip, etc.
* `cv-app-editor`: Mismo conjunto + DatePicker, Autocomplete, Stepper
* `cv-lib-app-components`: Componentes compartidos con dependencia de MUI
### Tareas
**Semana 1-2: Componentes Básicos**
* TextField/Input con validación
* Select/Dropdown
* Checkbox y Radio
* Switch/Toggle
* Dialog/Modal
* Card
* Tabs
* Avatar
* Chip/Badge
* Tooltip
**Semana 2-3: Componentes Avanzados**
* DatePicker
* Autocomplete
* Stepper
* Accordion
* Menu/Dropdown Menu
* Pagination
* Snackbar/Toast
* Skeleton loader
**Desarrollo por componente:**
* Diseñar API del componente (props, eventos)
* Implementar en TypeScript con Sass modules
* Crear stories en Storybook
* Escribir tests con Vitest
* Documentar uso y ejemplos
### Criterios de Éxito
* Todos los componentes MUI usados tienen equivalente en `packages/ui`
* 100% de componentes con Storybook stories
* Cobertura de tests > 80%
* Documentación completa de API
## 1.2 Upgrade de Dependencias Core (1 semana)
### Tareas
**Node.js y pnpm:**
* Actualizar `.nvmrc` a Node LTS (v20.x o v22.x)
* Verificar compatibilidad de todas las dependencias
* Actualizar scripts CI/CD
**React Ecosystem:**
* Asegurar React 18.3+ en todos los packages
* react-dom 18.3+
* react-router-dom v6+ (el legacy usa v5)
* Actualizar @types/react y @types/react-dom
**Build Tools:**
* Vite 6.x (latest stable)
* @originjs/vite-plugin-federation o @module-federation/vite (evaluar)
* TypeScript 5.8+
* Vitest 3.x
**Estado y Datos:**
* Zustand 5.x para estado local/global sincrónico
* TanStack Query (React Query) v5.x para datos asíncronos, cache y sincronización servidor
* Axios o Fetch API para peticiones HTTP
**Dependencias Legacy a Mantener (temporalmente):**
* `@npm_leadtech/cv-lib-*`: librerías internas (migrar posteriormente)
* `counterpart`: i18n (considerar migrar a react-i18next en futuro)
* `amazon-cognito-identity-js`: autenticación
### Criterios de Éxito
* Node v20+ funcionando en todos los entornos
* Todas las dependencias en versiones LTS
* Zero vulnerabilidades críticas en `pnpm audit`
* Builds exitosos en todos los microfrontends
## 1.3 Documentación de Arquitectura (1 semana - paralelo)
### Tareas
* Documentar patrón de Module Federation usado
* Guía de desarrollo de nuevos microfrontends
* Guía de migración de componentes legacy
* Arquitectura de comunicación entre microfrontends
* **Patrones de TanStack Query + Zustand**:
    * Cuándo usar TanStack Query vs Zustand
    * Estrategias de cache y revalidación
    * Optimistic updates patterns
    * Error handling y retry logic
    * Prefetching y suspense patterns
* Estrategia de versionado y despliegue
* Troubleshooting común
# Arquitectura de Datos: TanStack Query + Zustand
## Principios de Separación de Responsabilidades
### TanStack Query (React Query) - Server State
**Usar para:**
* Datos que vienen del servidor (APIs REST, GraphQL)
* Cache automático con invalidación inteligente
* Sincronización en background
* Optimistic updates
* Retry automático de peticiones fallidas
* Paginación e infinite scroll
* Prefetching de datos
**Ejemplos:**
* User profile, settings, subscriptions
* Documents list, document details
* Templates, fonts, recursos
* Analytics, reports
* Payment history, invoices
### Zustand - Client State
**Usar para:**
* Estado UI local (modals, sidebars, tabs activos)
* Preferencias de UI no persistidas en servidor
* Estado temporal de formularios (antes de submit)
* Drag & drop state
* Undo/redo stacks
* Theme, i18n locale (si no viene del servidor)
**Ejemplos:**
* Modal abierto/cerrado
* Sidebar expandido/colapsado
* Tab activo en un componente
* Editor: sección seleccionada, historial de cambios
* Filtros locales temporales
## Patrones y Mejores Prácticas
### 1. Estructura de Queries
```typescript
// hooks/queries/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api';
export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => userApi.getProfile(userId),
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 30, // 30 min (antes cacheTime)
    retry: 3,
  });
};
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateProfile,
    // Optimistic update
    onMutate: async (newProfile) => {
      await queryClient.cancelQueries({ queryKey: ['users', newProfile.id] });
      const previous = queryClient.getQueryData(['users', newProfile.id]);
      queryClient.setQueryData(['users', newProfile.id], newProfile);
      return { previous };
    },
    onError: (err, variables, context) => {
      // Rollback en caso de error
      if (context?.previous) {
        queryClient.setQueryData(['users', variables.id], context.previous);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users', data.id] });
    },
  });
};
```
### 2. Configuración Global de TanStack Query
```typescript
// App.tsx o main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minuto por defecto
      gcTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
      refetchOnWindowFocus: false, // Deshabilitar en desarrollo
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0, // No retry mutations por defecto
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
```
### 3. Prefetching y Lazy Loading
```typescript
// Prefetch en navegación
const queryClient = useQueryClient();
const handleNavigate = (userId: string) => {
  // Prefetch antes de navegar
  queryClient.prefetchQuery({
    queryKey: ['users', userId],
    queryFn: () => userApi.getProfile(userId),
  });
  navigate(`/users/${userId}`);
};
// Suspense boundaries
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
function UserProfile({ userId }: { userId: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ['users', userId],
    queryFn: () => userApi.getProfile(userId),
  });
  return <div>{data.name}</div>;
}
// En parent component
<Suspense fallback={<Spinner />}>
  <UserProfile userId={userId} />
</Suspense>
```
### 4. Infinite Scroll y Paginación
```typescript
export const useDocumentsList = () => {
  return useInfiniteQuery({
    queryKey: ['documents'],
    queryFn: ({ pageParam = 0 }) => documentsApi.getList({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
// En componente
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useDocumentsList();
```
# FASE 2: Desacoplamiento del Proyecto Legado
## Duración Estimada: 12-16 semanas (2 desarrolladores)
## 2.1 Migración cv-app-login (⚠️ COMPLETADO PARCIALMENTE)
### Estado
* Ya migrado según CHANGELOG.md
* Webpack → Vite ✅
* React 16 → 18 ✅
* Jest → Vitest ✅
* Componentes MUI básicos reemplazados ✅
* Module Federation configurado ✅
* Puerto: 5003 ✅
* **PENDIENTE**: Migrar a TanStack Query ⚠️
### Tareas URGENTES (1-2 semanas)
**Refactoring de Gestión de Estado:**
* Implementar TanStack Query para autenticación
* Migrar llamadas API actuales a hooks de TanStack Query:
    * `useLogin` - Login con email/password
    * `useGoogleAuth` - Autenticación Google
    * `useLinkedInAuth` - Autenticación LinkedIn
    * `usePasswordReset` - Reset de contraseña
    * `useSignUp` - Registro de usuarios
* Implementar manejo de errores con TanStack Query
* Configurar QueryClient con estrategias de cache para auth
* Añadir optimistic updates donde corresponda
**Beneficios Inmediatos:**
* Mejor UX con estados de loading/error automáticos
* Cache de sesión y tokens
* Retry automático en fallos de red
* Reducción de código boilerplate
### Tareas Post-Migración (Posteriores)
* Testing E2E en integración con shell
* Validar todos los flujos de autenticación (Google, LinkedIn, email)
* Migrar componentes restantes con MUI a UI Kit
* Performance testing y optimización de bundle
## 2.2 Migración cv-app-user (4-5 semanas)
### Análisis de Complejidad
* **Archivos**: ~231 archivos JS/TS
* **Estado**: Redux Toolkit con múltiples slices
* **Componentes**: ~50+ componentes React
* **Rutas**: React Router v6 (ya actualizado)
* **Dependencias MUI**: Uso extensivo
### Subtareas
**Semana 1: Setup y Preparación**
* Crear estructura base de microfrontend en `apps/user`
* Configurar Vite con Module Federation
* Configurar puerto 5004
* Setup de TypeScript, Vitest, ESLint
* Configurar TanStack Query Provider y configuración de cache
* Migrar configuración de i18n
**Semana 2-3: Migración de Componentes Core**
* Migrar componentes de UI críticos
* Reemplazar componentes MUI por `packages/ui`
* Convertir archivos .js a .tsx
* Añadir tipos TypeScript
* Migrar estilos a Sass modules
**Semana 3-4: Migración de Estado (Redux → Zustand + TanStack Query)**
* Analizar slices de Redux actuales:
    * User profile state (datos asíncronos → TanStack Query)
    * Settings state (datos asíncronos → TanStack Query)
    * UI state (estado local → Zustand)
* Separar estado sincrónico vs asíncrónico:
    * **Zustand**: UI state, modals, sidebar state, preferencias locales
    * **TanStack Query**: User data, settings, subscriptions, documents (todo lo que viene del servidor)
* Crear stores de Zustand para estado UI
* Crear hooks personalizados con TanStack Query para datos del servidor
* Implementar estrategias de cache y revalidación
* Actualizar componentes para usar Zustand hooks y useQuery/useMutation
* Testing exhaustivo de flujos de estado y peticiones asíncronas
**Semana 4-5: Integración y Testing**
* Integrar con shell (Module Federation)
* Configurar rutas en shell para `/user/*`
* Migrar tests de Jest a Vitest
* Testing E2E de todos los flujos
* Performance optimization
### Componentes Principales a Migrar
* Dashboard de usuario
* Profile settings
* Account management
* Subscription management
* Document list/management
### Criterios de Éxito
* cv-app-user funciona como microfrontend independiente
* Zero dependencias de Redux
* Zero dependencias de MUI
* TanStack Query maneja todas las peticiones asíncronas con cache optimizado
* Zustand maneja estado UI y local
* Todos los tests pasando en Vitest
* Integración exitosa con shell
* Performance igual o mejor que versión legacy
* Optimistic updates implementados donde corresponda
## 2.3 Actualización Shell (1 semana - paralelo)
### Tareas
* Actualizar remotes en `vite.config.ts` para incluir user
* Configurar routing para integrar login y user
* Implementar lazy loading y Suspense boundaries
* Error boundaries para cada microfrontend
* Loading states consistentes
* Navegación entre microfrontends
## 2.4 Migración cv-lib-app-components (3-4 semanas)
### Análisis
* Librería compartida de componentes usada por todas las apps
* Actualmente en Rollup con dependencia de MUI
* Necesita migrar a packages/ui o crear package separado
### Estrategia
**Opción A (Recomendada)**: Absorber en packages/ui
* Migrar componentes útiles a packages/ui
* Deprecar componentes obsoletos
* Mantener compatibilidad temporal con re-exports

### Tareas
* Inventariar componentes en cv-lib-app-components
* Clasificar: útiles vs obsoletos vs duplicados
* Migrar componentes útiles a packages/ui
* Actualizar imports en todas las apps que lo usan
* Deprecar librería legacy gradualmente
## 2.5 Plan de Migración Apps Restantes (6-8 semanas)
### Priorización Recomendada
**Prioridad Alta:**
1. **cv-app-shop** (2-3 semanas)
    * Flujo crítico de compra
    * ~150-200 archivos estimados
    * Redux → Zustand
    * Integración con payment
2. **cv-app-payment** (2 semanas)
    * Procesamiento de pagos
    * Múltiples gateways (ver apps payment-*)
    * Requerirá testing exhaustivo
**Prioridad Media:**
3. **cv-app-share** (1 semana)
    * Funcionalidad de compartir CV
    * Relativamente simple
4. **cv-app-crm** (2-3 semanas)
    * Herramientas internas
    * Menor impacto en usuarios finales
**Prioridad Baja (Post-Fase 2):**
* Backoffice apps
* Payment gateway variations
* cv-app-thankyou
### Estrategia de Ejecución
* Migrar en sprints de 2 semanas
* 1 desarrollador por app principal
* Code reviews cruzados
* Testing en staging antes de cada merge
# FASE 3: Refactoring y Mejoras del Editor
## Duración Estimada: 12-16 semanas (2 desarrolladores)
## 3.1 Análisis de cv-app-editor
### Complejidad
* **Archivos**: ~887 archivos (el más grande con diferencia)
* **Líneas de código**: ~50,000+ estimadas
* **Componentes**: ~200+ componentes React
* **Estado**: Redux con múltiples slices complejos
* **Features**: Editor WYSIWYG, drag & drop, templates, preview, export PDF
### Desafíos Específicos
* Lógica de negocio compleja (rendering de CV, templates)
* Estado global extenso (documento, UI, history/undo-redo)
* Drag & drop con @dnd-kit
* Integración con canvas/PDF generation
* Performance crítica
## 3.2 Enfoque Test-Driven Development (TDD)
### Estrategia
**Por qué TDD para Editor:**
* Código legacy sin tests suficientes
* Lógica de negocio compleja que debe preservarse
* Alto riesgo de regresiones
* Necesidad de documentar comportamiento esperado
### Metodología
1. **Red**: Escribir test que falla
2. **Green**: Implementar código mínimo para pasar test
3. **Refactor**: Mejorar código manteniendo tests verdes
### Áreas de Testing Prioritarias
**Tests Unitarios (Vitest):**
* Funciones puras de transformación de datos
* Validators y formatters
* Helpers y utilities
* Reducers/stores (Zustand)
**Tests de Integración:**
* Flujos completos de edición
* Interacciones drag & drop
* Guardar/cargar documento
* Export a PDF
**Tests E2E (Playwright/Cypress):**
* Flujo completo de creación de CV
* Cambio de templates
* Preview y export
## 3.3 Migración Jest → Vitest (2 semanas)
### Tareas
**Semana 1: Setup y Configuración**
* Instalar Vitest y dependencias
* Crear `vitest.config.ts`
* Configurar jsdom para tests de componentes
* Configurar coverage con c8/istanbul
* Migrar mocks y setup files
**Semana 2: Migración de Tests**
* Migrar tests existentes de Jest a Vitest
* Actualizar imports (jest → vitest)
* Actualizar syntax (expect, describe, it)
* Actualizar mocks (jest.fn → vi.fn)
* Verificar coverage se mantiene o mejora
### Diferencias Jest vs Vitest
```typescript
// Jest
import { jest } from '@jest/globals';
const mockFn = jest.fn();
jest.mock('./module');
// Vitest
import { vi } from 'vitest';
const mockFn = vi.fn();
vi.mock('./module');
```
## 3.4 Refactoring de Arquitectura Editor (8-10 semanas)
### Semana 1-2: Preparación y Setup
* Crear `apps/editor` en estructura de microfrontend
* Configurar Vite + Module Federation
* Setup TypeScript estricto
* Setup Vitest con coverage
* Configurar TanStack Query con DevTools
* Configurar estrategias de cache para documentos y templates
* Configurar puerto 5005
### Semana 3-5: Migración de Estado Redux → Zustand + TanStack Query
**Análisis de Redux Stores Actuales:**
* Document store (contenido del CV) → **TanStack Query + Zustand**
* Template store (plantillas disponibles) → **TanStack Query**
* UI store (estado de UI: sidebar, modals, panels) → **Zustand**
* History store (undo/redo) → **Zustand**
* Settings store (configuración de usuario) → **TanStack Query**
**Arquitectura de Datos Nueva:**
**TanStack Query** (datos del servidor con cache):
* Cargar/guardar documentos
* Fetch templates disponibles
* User settings y preferences del servidor
* Export a PDF (mutations)
**Zustand** (estado UI y temporal):
* Estado actual del editor (isDirty, modo edición)
* UI state (sidebar abierto, modal activo, panel seleccionado)
* History/undo-redo stack (estado temporal de edición)
* Drag & drop state temporal
**Diseño de Arquitectura Híbrida:**
```typescript
// TanStack Query: Datos del servidor
export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => fetchDocument(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
export const useSaveDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (doc: CVDocument) => saveDocument(doc),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['document', data.id] });
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};
export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates,
    staleTime: 1000 * 60 * 60, // 1 hora (templates cambian poco)
  });
};
// Zustand: Estado UI y temporal del editor
interface EditorUIState {
  isDirty: boolean;
  selectedSection: string | null;
  sidebarOpen: boolean;
  activeModal: string | null;
  historyStack: DocumentSnapshot[];
  historyIndex: number;
  setDirty: (dirty: boolean) => void;
  selectSection: (id: string | null) => void;
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  pushHistory: (snapshot: DocumentSnapshot) => void;
  undo: () => void;
  redo: () => void;
}
export const useEditorUIStore = create<EditorUIState>()(
  devtools(
    (set, get) => ({
      isDirty: false,
      selectedSection: null,
      sidebarOpen: true,
      activeModal: null,
      historyStack: [],
      historyIndex: -1,
      setDirty: (dirty) => set({ isDirty: dirty }),
      selectSection: (id) => set({ selectedSection: id }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      openModal: (modalId) => set({ activeModal: modalId }),
      closeModal: () => set({ activeModal: null }),
      pushHistory: (snapshot) => set((state) => ({
        historyStack: [...state.historyStack.slice(0, state.historyIndex + 1), snapshot],
        historyIndex: state.historyIndex + 1,
      })),
      undo: () => set((state) => ({
        historyIndex: Math.max(0, state.historyIndex - 1),
      })),
      redo: () => set((state) => ({
        historyIndex: Math.min(state.historyStack.length - 1, state.historyIndex + 1),
      })),
    }),
    { name: 'editor-ui' }
  )
);
```
**Estrategia de Migración:**
* Identificar qué datos vienen del servidor (TanStack Query) vs estado local (Zustand)
* Migrar peticiones API a TanStack Query hooks
* Migrar estado UI a Zustand
* Implementar optimistic updates para mejor UX
* Configurar estrategias de cache y revalidación
* Mantener coexistencia temporal Redux + nueva arquitectura
* Testing exhaustivo después de cada migración
* Eliminar Redux cuando todo esté migrado
### Semana 6-8: Migración de Componentes con TDD
**Proceso por Componente:**
1. Escribir tests para comportamiento actual (caracterización)
2. Migrar componente a TypeScript
3. Reemplazar MUI por packages/ui
4. Refactorizar a functional components + hooks
5. Migrar estilos a Sass modules
6. Verificar tests pasan
7. Refactorizar y optimizar
**Componentes Críticos (priorizar):**
* EditorCanvas (área de edición principal)
* Sidebar (navegación de secciones)
* TemplateSelector
* PreviewPanel
* ExportModal
* SectionEditors (experiencia, educación, skills, etc.)
### Semana 9-10: Integración y Optimización
* Integrar editor con shell
* Lazy loading de secciones pesadas
* Code splitting agresivo
* Optimización de bundle size
* Performance profiling y optimización
* Testing E2E completo
* Documentation
## 3.5 Mejoras de Calidad de Código
### Métricas Objetivo
* **Test Coverage**: > 80% (actualmente < 50% estimado)
* **TypeScript Coverage**: 100% (strict mode)
* **Bundle Size**: Reducir 30-40% vs legacy
* **Performance**: FCP < 1.5s, TTI < 3s
* **Accessibility**: WCAG 2.1 AA compliance
### Tooling
* ESLint con reglas estrictas
* Prettier para formateo
* Husky para pre-commit hooks
* TypeScript strict mode
* Bundle analyzer
* Lighthouse CI
# Estrategia de Despliegue
## Despliegue Gradual (Blue-Green / Canary)
### Fase de Coexistencia
* Legacy y nuevo sistema corriendo en paralelo
* Feature flags para habilitar microfrontends gradualmente
* Monitoreo intensivo de errores y performance
* Rollback inmediato si hay problemas críticos
### Por Microfrontend
1. Deploy a staging
2. Testing QA exhaustivo
3. Deploy a producción con feature flag disabled
4. Habilitar para % pequeño de usuarios (5-10%)
5. Monitorear métricas (errores, performance, conversión)
6. Incrementar % gradualmente (25%, 50%, 100%)
7. Deprecar versión legacy
### Rollback Strategy
* Feature flags para revertir a legacy instantáneamente
* Backups de estado/datos
* Plan de comunicación a usuarios
# Riesgos y Mitigaciones
## Riesgos Técnicos
**1. Breaking Changes en APIs Internas**
* **Mitigación**: Mantener contratos de API estables, versionado
**2. Performance de Module Federation**
* **Mitigación**: Testing de performance, code splitting, lazy loading
**3. Complejidad de Estado Compartido**
* **Mitigación**: Event bus o state management centralizado en shell
**4. Dependencias Legacy Incompatibles**
* **Mitigación**: Polyfills, wrappers, o reescribir funcionalidad
## Riesgos de Negocio
**1. Regresiones Funcionales**
* **Mitigación**: TDD, E2E testing, QA exhaustivo, canary deploys
**2. Downtime en Producción**
* **Mitigación**: Blue-green deployments, feature flags, rollback plan
**3. Retraso en Roadmap de Features**
* **Mitigación**: Priorización clara, migración incremental
# Estimación de Tiempos Consolidada
## Con 2 Desarrolladores Frontend
### Fase 1: Desbloqueo del Stack (5-7 semanas)
* Completar UI Kit: 2-3 semanas
* Upgrade dependencias: 1 semana
* **Implementación TanStack Query en login**: 1-2 semanas (NUEVA - PRIORITARIA)
* Documentación: 1 semana (paralelo)
* **Buffer**: +1 semana
* **Total**: 6-7 semanas
### Fase 2: Desacoplamiento Legacy (12-16 semanas)
* cv-app-login: ⚠️ Migración base completada, TanStack Query en progreso
* cv-app-user: 4-5 semanas (ya incluye TanStack Query desde el inicio)
* cv-lib-app-components: 3-4 semanas (paralelo con user)
* cv-app-shop: 2-3 semanas (con TanStack Query para productos, carrito, checkout)
* cv-app-payment: 2 semanas (con TanStack Query para payment gateways y transacciones)
* cv-app-share: 1 semana (con TanStack Query para sharing y analytics)
* Shell updates: 1 semana (distribuido) + QueryClient global
* **Buffer**: +2 semanas
* **Total**: 14-16 semanas
### Fase 3: Editor Refactoring (12-16 semanas)
* Jest → Vitest: 2 semanas
* Setup y preparación: 2 semanas
* Migración Redux → Zustand: 3-4 semanas
* Migración componentes con TDD: 6-8 semanas
* Integración y optimización: 2 semanas
* **Buffer**: +2 semanas
* **Total**: 15-18 semanas
## Timeline Total (Actualizado con TanStack Query desde inicio)
**Optimista**: 33 semanas (~8 meses)
**Realista**: 40 semanas (~10 meses)
**Pesimista**: 48 semanas (~12 meses)
### Distribución Paralela (2 devs)
* Dev 1 se enfoca en Fase 1 → Fase 2 (user, shop, payment)
* Dev 2 se enfoca en Fase 1 → Fase 2 (components) → Fase 3 (editor)
* Colaboración en code reviews y pair programming en áreas complejas
**Timeline Paralelo Optimizado**: ~8-10 meses
# Hitos Clave (Milestones)
## Q1 2026 (Enero 2026 - Marzo 2026)
* ✅ cv-app-login: Migración base (Webpack → Vite)
* ✅ UI Kit base creado
* 🎯 **TanStack Query implementado en login** (PRIORITARIO)
* 🎯 UI Kit completado
* 🎯 cv-app-user migrado (con TanStack Query desde día 1)
## Q2 2026
* 🎯 cv-app-shop migrado
* 🎯 cv-app-payment migrado
* 🎯 cv-lib-app-components deprecado
* 🎯 Deploy en producción de login + user + shop (canary)
## Q3 2026
* 🎯 cv-app-editor: Jest → Vitest completado
* 🎯 cv-app-editor: 50% de componentes migrados
* 🎯 cv-app-editor: Redux → Zustand en progreso
## Q4 2026
* 🎯 cv-app-editor: Migración completa
* 🎯 Deploy en producción de editor (canary)
* 🎯 Deprecación completa de apps legacy
* 🎯 Documentación final y knowledge transfer
# Métricas de Éxito
## Técnicas
* ✅ Zero dependencias de Material-UI
* ✅ Zero dependencias de Redux
* ✅ Zero dependencias de Webpack
* ✅ Zero dependencias de Jest
* ✅ Test coverage > 80%
* ✅ Bundle size reducido 30-40%
* ✅ Build time < 30s por microfrontend
* ✅ TypeScript strict mode habilitado
## Negocio
* ✅ Zero downtime en deploys
* ✅ Time to deploy < 10 minutos por microfrontend
* ✅ Velocity de desarrollo aumentada 30-50%
* ✅ Bug rate reducido 40%
* ✅ Performance igual o mejor (Core Web Vitals)
* ✅ User satisfaction mantenida o mejorada
