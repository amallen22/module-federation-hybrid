# Plan de Migración: CV Legacy → CV-Hibrid
## Arquitectura de Microservicios con Vite Module Federation

---

## 📊 Resumen Ejecutivo de Estimaciones

### 👨‍💻 Desarrollo Tradicional (Sin IA)

| Fase | Duración | Tareas Principales | Estado |
|------|----------|-------------------|--------|
| **Fase 1: Desbloqueo del Stack** | **6-8 semanas** | UI Kit (3-4 sem), TanStack Query en Login (1-2 sem), Upgrade deps (1 sem) | 🔄 En Progreso |
| **Fase 2: Desacoplamiento Legacy** | **16-20 semanas** | User (5-6 sem), Shop (3-4 sem), Payment (2-3 sem), Components (3-4 sem) | ⏳ Pendiente |
| **Fase 3: Editor Refactoring** | **16-20 semanas** | Setup (2 sem), Redux→Zustand (4 sem), Componentes TDD (6 sem), Optimización (2 sem) | ⏳ Pendiente |
| **Total Proyecto** | **38-48 semanas** | **~9-12 meses** | 🔄 20% Completado |

### 🤖 Desarrollo con Cursor + IA (RECOMENDADO ⭐)

| Fase | Duración | Reducción | Tareas Principales | Estado |
|------|----------|-----------|-------------------|--------|
| **Fase 1: Desbloqueo del Stack** | **3-4 semanas** | **-50%** | UI Kit (1.5-2 sem), TanStack Query (0.5-1 sem), Upgrade deps (0.5 sem) | 🔄 En Progreso |
| **Fase 2: Desacoplamiento Legacy** | **8-10 semanas** | **-50%** | User (2.5-3 sem), Shop (1.5-2 sem), Payment (1-1.5 sem), Components (1.5-2 sem) | ⏳ Pendiente |
| **Fase 3: Editor Refactoring** | **8-10 semanas** | **-50%** | Setup (1 sem), Redux→Zustand (2 sem), Componentes TDD (3 sem), Optimización (1 sem) | ⏳ Pendiente |
| **Total Proyecto** | **19-24 semanas** | **-50%** | **~4.5-6 meses** ⚡ | 🔄 20% Completado |

**✨ Aceleración con IA**: Reducción del 40-50% del tiempo gracias a:
- Generación automatizada de código boilerplate
- Refactoring asistido por IA
- Conversión JS→TypeScript automática
- Generación de tests y Storybook stories
- Detección y fix de bugs más rápido
- Pair programming con AI 24/7

### 🎯 Líneas de Tiempo Comparadas

#### Sin IA (Tradicional)
* **Inicio**: Diciembre 2024
* **Fase 1 Completada**: Q2 2025 (Abril-Junio)
* **Fase 2 Completada**: Q4 2025 (Octubre-Diciembre)
* **Fase 3 Completada**: Q2 2026 (Abril-Junio)
* **Proyecto Completo**: **Mayo-Junio 2026** (12 meses)

#### Con Cursor + IA ⚡ (RECOMENDADO)
* **Inicio**: Diciembre 2024
* **Fase 1 Completada**: Enero-Febrero 2025
* **Fase 2 Completada**: Abril-Mayo 2025
* **Fase 3 Completada**: Julio-Agosto 2025
* **Proyecto Completo**: **Julio-Agosto 2025** (6 meses) 🎉

### 👥 Equipo: 2 Desarrolladores Frontend + Cursor AI

### 📝 Justificación de Estimaciones (Actualizado)

**¿Por qué se actualizaron los tiempos?**

1. **UI Kit (2-3 sem → 3-4 sem)**:
   - ~18-20 componentes complejos (DatePicker, Autocomplete, Stepper)
   - Cada uno requiere: TypeScript + Sass + Storybook + Tests + Documentación
   - Necesidad de cubrir múltiples variantes y casos edge

2. **cv-app-user (4-5 sem → 5-6 sem)**:
   - 231 archivos (alto volumen)
   - 50+ componentes a migrar
   - Redux con múltiples slices complejos
   - Migración completa a TypeScript

3. **cv-app-shop (2-3 sem → 3-4 sem)**:
   - Flujo de compra crítico con alta complejidad de negocio
   - Testing exhaustivo requerido (QA riguroso)
   - Integración con payment

4. **cv-app-editor (12-16 sem → 16-20 sem)**:
   - 887 archivos, ~50,000 líneas de código
   - ~200 componentes React
   - Componente más complejo del proyecto
   - TDD añade tiempo inicial pero reduce bugs futuros

**Principio de estimación**: Buffer realista para imprevistos, bugs inesperados, y refinamiento de calidad.

### ⚡ Estrategias para Acelerar (Si Necesario)

**Si se requiere reducir timeline:**

1. **Priorización Agresiva**:
   - Completar solo componentes UI críticos en Fase 1
   - Migrar componentes avanzados (DatePicker, Autocomplete) bajo demanda
   
2. **Simplificación de Scope**:
   - Posponer apps de baja prioridad (cv-app-crm, cv-app-share) a post-lanzamiento
   - Editor: Migrar lo crítico primero, componentes secundarios después
   
3. **Incremento de Equipo**:
   - +1 desarrollador senior → reducción 20-30% timeline
   - Ideal para paralelizar Fase 2 y 3
   
4. **Reducción de Cobertura Inicial**:
   - Coverage mínimo 60% inicialmente (vs 80% target)
   - Aumentar coverage post-migración

**Trade-offs a considerar**:
- Deuda técnica: Migración rápida puede generar deuda
- Calidad: Tests insuficientes aumentan bugs
- Team burnout: Presión excesiva afecta moral y calidad

**Recomendación**: Mantener timeline realista de 10-12 meses para asegurar calidad y sostenibilidad.

---

## 🤖 Capacidades de Cursor AI en el Proyecto

### ¿Cómo Cursor AI Acelera el Desarrollo?

#### 1. Generación de Componentes UI (60% más rápido)
**Sin IA**:
```
Dev escribe TypeScript interface → 15 min
Dev crea componente funcional → 30 min
Dev escribe Sass modules → 20 min
Dev crea Storybook story → 20 min
Dev escribe tests Vitest → 25 min
Total: ~110 minutos por componente
```

**Con Cursor AI**:
```
Dev describe componente en prompt → 2 min
AI genera TypeScript + Sass + Story + Tests → 5 min
Dev revisa, refina y valida → 30 min
Total: ~37 minutos por componente (66% reducción)
```

#### 2. Migración JS → TypeScript (70% más rápido)
**Cursor AI puede**:
- Convertir automáticamente archivos .js → .tsx
- Inferir tipos de PropTypes existentes
- Generar interfaces TypeScript
- Detectar y sugerir tipos faltantes
- Refactorizar imports y exports

**Ejemplo**: 231 archivos en cv-app-user
- Sin IA: ~5-6 semanas (manual, propenso a errores)
- Con IA: ~2.5-3 semanas (automatizado, dev valida)

#### 3. Refactoring Redux → Zustand + TanStack Query (60% más rápido)
**Cursor AI puede**:
- Analizar Redux slices y generar Zustand stores equivalentes
- Identificar llamadas API y convertir a TanStack Query hooks
- Actualizar componentes que usan Redux a usar nuevos hooks
- Mantener consistencia en toda la codebase

**Ejemplo**: Editor con múltiples Redux stores
- Sin IA: 4 semanas de refactoring manual
- Con IA: 2 semanas (IA genera, dev refina lógica)

#### 4. Reemplazo MUI → UI Kit Custom (50% más rápido)
**Cursor AI puede**:
- Encontrar todos los usos de componentes MUI
- Sugerir reemplazos por componentes custom equivalentes
- Actualizar imports automáticamente
- Migrar props similares
- Detectar casos edge que requieren atención manual

**Ejemplo**: cv-app-user con uso extensivo de MUI
- Sin IA: 2 semanas manualmente
- Con IA: 1 semana (búsqueda y reemplazo inteligente)

#### 5. Generación de Tests (80% más rápido)
**Cursor AI puede**:
- Generar tests de caracterización para código legacy
- Crear tests unitarios con casos comunes y edge cases
- Generar mocks de dependencias
- Sugerir test coverage adicional
- Convertir tests de Jest a Vitest

**Ejemplo**: Tests para ~200 componentes de editor
- Sin IA: 3 semanas escribir tests manualmente
- Con IA: 1 semana (IA genera, dev añade casos específicos)

#### 6. Documentación y Storybook (70% más rápido)
**Cursor AI puede**:
- Generar Storybook stories con variantes comunes
- Crear JSDoc comments
- Generar README.md de componentes
- Documentar APIs y interfaces
- Crear ejemplos de uso

#### 7. Detección y Fix de Bugs (40% más rápido)
**Cursor AI puede**:
- Detectar errores de tipos en tiempo real
- Sugerir fixes para linter errors
- Identificar patrones de código problemáticos
- Sugerir optimizaciones de performance
- Encontrar dependencias no utilizadas

### 📊 Impacto Cuantificable por Fase

| Fase | Tarea | Sin IA | Con IA | Reducción |
|------|-------|--------|--------|-----------|
| **Fase 1** | UI Kit (20 componentes) | 3-4 sem | 1.5-2 sem | **50%** |
| **Fase 2** | User (231 archivos) | 5-6 sem | 2.5-3 sem | **50%** |
| **Fase 2** | Shop (flujo compra) | 3-4 sem | 1.5-2 sem | **50%** |
| **Fase 3** | Editor (200 componentes) | 16-20 sem | 8-10 sem | **50%** |
| **Total** | Proyecto completo | 46 sem | 23 sem | **50%** |

### 🎯 Mejores Prácticas con Cursor AI

**DO's (✅)**:
- Usar Cursor para generar código boilerplate
- Validar siempre código generado por IA
- Usar IA para tests y documentación
- Aprovechar IA para refactorings masivos
- Usar IA como pair programmer 24/7

**DON'Ts (❌)**:
- No confiar ciegamente en código de IA sin revisar
- No usar IA para lógica de negocio crítica sin validación exhaustiva
- No saltarse code reviews por usar IA
- No asumir que IA entiende contexto de negocio complejo
- No eliminar tests manuales críticos

### 🔒 Consideraciones de Calidad con IA

**Ventajas**:
- ✅ Código más consistente (mismo estilo)
- ✅ Menos typos y errores sintácticos
- ✅ Documentación más completa
- ✅ Tests más comprehensivos
- ✅ Mejor coverage inicial

**Riesgos (y mitigaciones)**:
- ⚠️ Código genérico → **Mitigation**: Dev refina y adapta
- ⚠️ Lógica incorrecta → **Mitigation**: Testing exhaustivo
- ⚠️ Dependencia de IA → **Mitigation**: Dev mantiene expertise
- ⚠️ Over-engineering → **Mitigation**: Code reviews estrictos

---

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
## Duración Estimada: 6-8 semanas (2 desarrolladores)
## 1.1 Completar UI Kit Propio (3-4 semanas)
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
* Tooltip
**Semana 2-3: Componentes Intermedios**
* Tabs
* Avatar
* Chip/Badge
* Menu/Dropdown Menu
* Pagination
* Skeleton loader
**Semana 3-4: Componentes Avanzados**
* DatePicker
* Autocomplete
* Stepper
* Accordion
* Snackbar/Toast
* Refinamiento y polish de todos los componentes
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
## Duración Estimada: 14-18 semanas (2 desarrolladores)
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
## 2.2 Migración cv-app-user (5-6 semanas)
### Análisis de Complejidad
* **Archivos**: ~231 archivos JS/TS (alta complejidad)
* **Estado**: Redux Toolkit con múltiples slices complejos
* **Componentes**: ~50+ componentes React
* **Rutas**: React Router v6 (ya actualizado)
* **Dependencias MUI**: Uso extensivo en casi todos los componentes
### Subtareas
**Semana 1: Setup y Preparación**
* Crear estructura base de microfrontend en `apps/user`
* Configurar Vite con Module Federation
* Configurar puerto 5004
* Setup de TypeScript, Vitest, ESLint
* Configurar TanStack Query Provider y configuración de cache
* Migrar configuración de i18n
**Semana 2-3: Migración de Componentes Core**
* Migrar componentes de UI críticos (50+ componentes)
* Reemplazar componentes MUI por `packages/ui`
* Convertir archivos .js a .tsx (231 archivos)
* Añadir tipos TypeScript
* Migrar estilos a Sass modules
**Semana 4-5: Migración de Estado (Redux → Zustand + TanStack Query)**
* Analizar slices de Redux actuales:
    * User profile state (datos asíncronos → TanStack Query)
    * Settings state (datos asíncronos → TanStack Query)
    * Subscriptions state (datos asíncronos → TanStack Query)
    * Documents state (datos asíncronos → TanStack Query)
    * UI state (estado local → Zustand)
* Separar estado sincrónico vs asíncrónico:
    * **Zustand**: UI state, modals, sidebar state, preferencias locales
    * **TanStack Query**: User data, settings, subscriptions, documents (todo lo que viene del servidor)
* Crear stores de Zustand para estado UI
* Crear hooks personalizados con TanStack Query para datos del servidor
* Implementar estrategias de cache y revalidación
* Actualizar componentes para usar Zustand hooks y useQuery/useMutation
* Testing exhaustivo de flujos de estado y peticiones asíncronas
**Semana 5-6: Integración y Testing**
* Integrar con shell (Module Federation)
* Configurar rutas en shell para `/user/*`
* Migrar tests de Jest a Vitest (si existen)
* Testing E2E de todos los flujos (dashboard, profile, settings, documents)
* Performance optimization y bundle analysis
* Bug fixes y refinamiento
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
## 2.5 Plan de Migración Apps Restantes (7-10 semanas)
### Priorización Recomendada
**Prioridad Alta:**
1. **cv-app-shop** (3-4 semanas)
    * Flujo crítico de compra (alta complejidad de negocio)
    * ~150-200 archivos estimados
    * Redux → Zustand + TanStack Query (productos, carrito, checkout)
    * Integración con payment
    * Testing exhaustivo de flujo de compra
2. **cv-app-payment** (2-3 semanas)
    * Procesamiento de pagos (crítico para el negocio)
    * Múltiples gateways (ver apps payment-*)
    * Requerirá testing exhaustivo y QA riguroso
    * TanStack Query para transacciones y estados de pago
**Prioridad Media:**
3. **cv-app-share** (1-2 semanas)
    * Funcionalidad de compartir CV
    * Relativamente simple pero requiere integración social
4. **cv-app-crm** (2-3 semanas)
    * Herramientas internas
    * Menor impacto en usuarios finales pero mucha lógica
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
## Duración Estimada: 16-20 semanas (2 desarrolladores)
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
## 3.4 Refactoring de Arquitectura Editor (10-14 semanas)
### Semana 1-2: Preparación y Setup
* Crear `apps/editor` en estructura de microfrontend
* Configurar Vite + Module Federation
* Setup TypeScript estricto
* Setup Vitest con coverage
* Configurar TanStack Query con DevTools
* Configurar estrategias de cache para documentos y templates
* Configurar puerto 5005
* Análisis detallado de arquitectura legacy y planificación de migración
### Semana 3-6: Migración de Estado Redux → Zustand + TanStack Query (4 semanas)
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
### Semana 7-12: Migración de Componentes con TDD (6 semanas)
**Proceso por Componente:**
1. Escribir tests para comportamiento actual (caracterización)
2. Migrar componente a TypeScript
3. Reemplazar MUI por packages/ui
4. Refactorizar a functional components + hooks
5. Migrar estilos a Sass modules
6. Verificar tests pasan
7. Refactorizar y optimizar
**Componentes Críticos (priorizar):**
* EditorCanvas (área de edición principal) - 2 semanas
* Sidebar (navegación de secciones) - 1 semana
* TemplateSelector - 1 semana
* PreviewPanel - 1 semana
* ExportModal (con generación PDF) - 1 semana
* SectionEditors (experiencia, educación, skills, contacto, etc.) - 2 semanas distribuidas
* Drag & Drop handlers - 1 semana
**Nota**: Dado que son ~200+ componentes, se priorizan los críticos. Los componentes menores se migran en paralelo.
### Semana 13-14: Integración y Optimización (2 semanas)
* Integrar editor con shell
* Lazy loading de secciones pesadas
* Code splitting agresivo
* Optimización de bundle size (target: reducción 30-40%)
* Performance profiling y optimización (FCP < 1.5s)
* Testing E2E completo de todos los flujos
* Bug fixes y refinamiento
* Documentation técnica y de usuario
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

## 📋 Opción A: Desarrollo Tradicional (Sin IA)
### Con 2 Desarrolladores Frontend

### Fase 1: Desbloqueo del Stack (6-8 semanas)
* Completar UI Kit: 3-4 semanas (~18-20 componentes con Storybook + tests)
* Upgrade dependencias: 1 semana
* **Implementación TanStack Query en login**: 1-2 semanas (NUEVA - PRIORITARIA)
* Documentación: 1 semana (paralelo)
* **Buffer**: +1 semana
* **Total**: 6-8 semanas

### Fase 2: Desacoplamiento Legacy (16-20 semanas)
* cv-app-login: ⚠️ Migración base completada, TanStack Query en progreso (1-2 semanas)
* cv-app-user: 5-6 semanas (231 archivos, ya incluye TanStack Query desde el inicio)
* cv-lib-app-components: 3-4 semanas (paralelo con user)
* cv-app-shop: 3-4 semanas (flujo crítico de compra, con TanStack Query)
* cv-app-payment: 2-3 semanas (testing exhaustivo requerido)
* cv-app-share: 1-2 semanas (con TanStack Query para sharing y analytics)
* Shell updates: 1 semana (distribuido) + QueryClient global
* **Buffer**: +2 semanas
* **Total**: 16-20 semanas

### Fase 3: Editor Refactoring (16-20 semanas)
* Jest → Vitest: 2 semanas
* Setup y preparación: 2 semanas
* Migración Redux → Zustand + TanStack Query: 4 semanas (arquitectura compleja)
* Migración componentes con TDD: 6 semanas (~200 componentes, priorizando críticos)
* Integración y optimización: 2 semanas
* **Buffer**: +2 semanas (dado que es el componente más complejo)
* **Total**: 16-20 semanas

### Timeline Total (Sin IA)
**Optimista**: 38 semanas (~9 meses)
**Realista**: 46 semanas (~11 meses)
**Pesimista**: 56 semanas (~13-14 meses)

---

## 🤖 Opción B: Desarrollo con Cursor + IA (⭐ RECOMENDADO)
### Con 2 Desarrolladores Frontend + Cursor AI

**✨ Factor de Aceleración**: 40-50% de reducción en tiempo

### Fase 1: Desbloqueo del Stack (3-4 semanas) ⚡
* **Completar UI Kit**: 1.5-2 semanas
  - IA genera componentes base (TypeScript + Sass)
  - IA genera Storybook stories automáticamente
  - IA genera tests unitarios con Vitest
  - Dev revisa, refina y valida
* **Upgrade dependencias**: 0.5 semanas
  - IA identifica conflictos y sugiere fixes
  - Automatización de cambios de breaking changes
* **Implementación TanStack Query en login**: 0.5-1 semana
  - IA convierte código existente a TanStack Query hooks
  - Generación automática de tipos
* **Documentación**: 0.5 semanas (paralelo)
  - IA genera documentación base
  - Dev valida y extiende
* **Buffer**: +0.5 semana
* **Total**: 3-4 semanas (vs 6-8 sin IA)

### Fase 2: Desacoplamiento Legacy (8-10 semanas) ⚡
* **cv-app-login**: TanStack Query (0.5-1 semana)
  - IA refactoriza código API calls
* **cv-app-user**: 2.5-3 semanas (vs 5-6 sin IA)
  - IA convierte 231 archivos .js → .tsx
  - IA migra Redux → Zustand + TanStack Query
  - IA reemplaza MUI por componentes custom
  - Dev revisa y refina lógica de negocio
* **cv-lib-app-components**: 1.5-2 semanas (vs 3-4)
  - IA migra componentes a packages/ui
  - IA actualiza imports automáticamente
* **cv-app-shop**: 1.5-2 semanas (vs 3-4)
  - IA migra lógica de carrito y checkout
  - Dev se enfoca en testing exhaustivo
* **cv-app-payment**: 1-1.5 semanas (vs 2-3)
  - IA migra integraciones de gateways
  - Dev se enfoca 100% en testing crítico
* **cv-app-share**: 0.5-1 semana (vs 1-2)
  - IA migra rápidamente (app simple)
* **Shell updates**: 0.5 semanas
* **Buffer**: +1 semana
* **Total**: 8-10 semanas (vs 16-20 sin IA)

### Fase 3: Editor Refactoring (8-10 semanas) ⚡
* **Jest → Vitest**: 1 semana (vs 2)
  - IA convierte sintaxis automáticamente
  - Dev valida y fix edge cases
* **Setup y preparación**: 1 semana (vs 2)
  - IA acelera configuración inicial
* **Migración Redux → Zustand + TanStack Query**: 2 semanas (vs 4)
  - IA analiza Redux stores y genera Zustand equivalente
  - IA identifica qué va a TanStack Query vs Zustand
  - Dev refina arquitectura y valida lógica
* **Migración componentes con TDD**: 3 semanas (vs 6)
  - IA genera tests de caracterización
  - IA convierte componentes a TypeScript
  - IA reemplaza MUI por componentes custom
  - Dev hace TDD en componentes críticos
  - IA genera tests adicionales
* **Integración y optimización**: 1 semana (vs 2)
  - IA identifica optimizaciones de bundle
  - IA sugiere code splitting
* **Buffer**: +1 semana
* **Total**: 8-10 semanas (vs 16-20 sin IA)

### Timeline Total (Con Cursor + IA) ⚡
**Optimista**: 19 semanas (~4.5 meses) 🚀
**Realista**: 23 semanas (~5.5 meses) ⭐
**Pesimista**: 28 semanas (~7 meses) 

**Reducción de tiempo**: **50% más rápido** que desarrollo tradicional
### Distribución Paralela (2 devs)

#### Sin IA (Tradicional)
* **Dev 1**: Fase 1 (UI Kit) → Fase 2 (user, shop, payment) → Soporte en Fase 3
* **Dev 2**: Fase 1 (UI Kit) → Fase 2 (components, share) → Fase 3 (editor - líder)
* Colaboración intensiva en code reviews y pair programming
* **Timeline Paralelo**: ~10-12 meses

#### Con Cursor + IA ⚡ (RECOMENDADO)
* **Dev 1 + AI**: Fase 1 (UI Kit acelerado) → Fase 2 (user, shop, payment con IA) → Soporte en Fase 3
* **Dev 2 + AI**: Fase 1 (UI Kit acelerado) → Fase 2 (components, share con IA) → Fase 3 (editor con IA)
* **Cursor AI actúa como tercer desarrollador**:
  - Generación de código boilerplate 24/7
  - Refactoring automático
  - Generación de tests y documentación
  - Code reviews y sugerencias
* **Timeline Paralelo Optimizado**: **~5-6 meses** 🚀

**Notas sobre Paralelización con IA**:
* Fase 1 más rápida permite iniciar Fase 2 antes
* IA permite paralelizar más tareas simultáneamente
* Fase 3 puede iniciar 2 meses antes vs desarrollo tradicional
* Buffer reducido gracias a detección temprana de bugs con IA
# Hitos Clave (Milestones)

## Escenario A: Desarrollo Tradicional (Sin IA)

### Q1 2025 (Diciembre 2024 - Marzo 2025)
* ✅ cv-app-login: Migración base (Webpack → Vite) - COMPLETADO
* ✅ UI Kit base creado - COMPLETADO
* ✅ Arquitectura de microfrontends establecida - COMPLETADO

### Q2 2025 (Abril - Junio 2025)
* 🎯 **FASE 1 COMPLETA**:
  * UI Kit completado (3-4 semanas)
  * TanStack Query implementado en login (1-2 semanas)
  * Upgrade de dependencias core (1 semana)
  * Documentación de arquitectura (paralelo)
* 🎯 **INICIO FASE 2**:
  * cv-app-user: Inicio de migración

### Q3 2025 (Julio - Septiembre 2025)
* 🎯 **FASE 2 EN PROGRESO**:
  * cv-app-user migrado completamente (5-6 semanas)
  * cv-lib-app-components migrado/deprecado (3-4 semanas)
  * cv-app-shop migrado (3-4 semanas)
  * cv-app-payment en progreso

### Q4 2025 (Octubre - Diciembre 2025)
* 🎯 **FASE 2 COMPLETADA**:
  * cv-app-payment migrado (2-3 semanas)
  * cv-app-share y otras apps secundarias migradas
  * Deploy en producción de login + user + shop + payment (canary)
* 🎯 **INICIO FASE 3**:
  * cv-app-editor: Setup y preparación
  * Jest → Vitest migration iniciada

### Q1 2026 (Enero - Marzo 2026)
* 🎯 **FASE 3 EN PROGRESO**:
  * cv-app-editor: Jest → Vitest completado
  * cv-app-editor: Redux → Zustand + TanStack Query en progreso
  * cv-app-editor: 30-40% de componentes migrados

### Q2 2026 (Abril - Junio 2026)
* 🎯 **FASE 3 AVANZADA**:
  * cv-app-editor: 70-80% de componentes migrados con TDD
  * Testing E2E intensivo del editor
  * Performance optimization del editor
* 🎯 **CIERRE DEL PROYECTO**:
  * cv-app-editor: Migración completa
  * Deploy en producción de editor (canary → 100%)
  * Deprecación completa de apps legacy
  * Documentación final y knowledge transfer
  * Post-mortem y lecciones aprendidas
* **Finalización**: **Mayo-Junio 2026** (~12 meses)

---

## Escenario B: Desarrollo con Cursor + IA ⚡ (RECOMENDADO)

### Q1 2025 (Diciembre 2024 - Marzo 2025)
* ✅ cv-app-login: Migración base (Webpack → Vite) - COMPLETADO
* ✅ UI Kit base creado - COMPLETADO
* ✅ Arquitectura de microfrontends establecida - COMPLETADO
* 🤖 **ENERO 2025 - FASE 1 COMPLETA CON IA**:
  * ✨ UI Kit completado en 1.5-2 semanas (vs 3-4 sin IA)
  * ✨ TanStack Query en login en 0.5-1 semana (vs 1-2 sin IA)
  * ✨ Upgrade dependencias en 0.5 semana (vs 1 sin IA)
  * Cursor AI genera 20 componentes con Storybook + tests
* 🤖 **FEBRERO-MARZO 2025 - FASE 2 INICIADA**:
  * ✨ cv-app-user: Migración acelerada (2.5-3 semanas con IA)
  * Cursor AI convierte 231 archivos JS → TypeScript
  * Cursor AI migra Redux → Zustand + TanStack Query

### Q2 2025 (Abril - Junio 2025)
* 🤖 **FASE 2 ACELERADA CON IA**:
  * ✅ cv-app-user: COMPLETADO (finales Marzo)
  * ✨ cv-lib-app-components migrado (1.5-2 semanas con IA)
  * ✨ cv-app-shop migrado (1.5-2 semanas con IA)
  * ✨ cv-app-payment migrado (1-1.5 semanas con IA)
  * ✨ cv-app-share migrado (0.5-1 semana con IA)
* 🎯 **MAYO 2025 - FASE 2 COMPLETADA** 🎉
  * Deploy en producción de todas las apps (canary)
  * 3 meses antes vs desarrollo tradicional
* 🤖 **JUNIO 2025 - INICIO FASE 3**:
  * cv-app-editor: Setup y preparación (1 semana con IA)
  * Jest → Vitest con Cursor AI (1 semana vs 2 sin IA)

### Q3 2025 (Julio - Septiembre 2025)
* 🤖 **FASE 3 ACELERADA CON IA**:
  * ✨ Redux → Zustand + TanStack Query (2 semanas con IA vs 4 sin IA)
    - Cursor AI analiza y convierte stores automáticamente
    - Dev valida lógica de negocio compleja
  * ✨ Migración componentes con TDD (3 semanas con IA vs 6 sin IA)
    - Cursor AI genera tests de caracterización
    - Cursor AI convierte ~200 componentes
    - Dev hace TDD en componentes críticos
  * ✨ Integración y optimización (1 semana con IA)
    - Cursor AI identifica optimizaciones
* 🎯 **AGOSTO 2025 - FASE 3 COMPLETADA** 🎉

### Q4 2025 (Octubre en adelante)
* 🎯 **PROYECTO COMPLETADO** ✅
  * Deploy final del editor en producción
  * Deprecación completa de apps legacy
  * Documentación y knowledge transfer
  * Monitoring y stabilización
* **Finalización**: **Julio-Agosto 2025** (~6 meses) ⚡
* **Ahorro de tiempo**: **6 meses** vs desarrollo tradicional

---

## 📊 Comparación de Hitos

| Hito | Sin IA | Con Cursor AI ⚡ | Diferencia |
|------|--------|-----------------|-----------|
| **Fase 1 Completa** | Junio 2025 | Enero 2025 | **-5 meses** |
| **Fase 2 Completa** | Diciembre 2025 | Mayo 2025 | **-7 meses** |
| **Fase 3 Completa** | Junio 2026 | Agosto 2025 | **-10 meses** |
| **Proyecto Completo** | Mayo-Junio 2026 | Julio-Agosto 2025 | **-10 meses** |
| **Duración Total** | ~12 meses | ~6 meses | **50% más rápido** |
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
