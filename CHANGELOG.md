# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - apps/user

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

