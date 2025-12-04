# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- Las traducciones (i18n) no se cargan cuando login se ejecuta dentro del shell en desarrollo
- Service Worker intenta registrarse en /serviceWorker.js que no existe en el shell
- Requests CORS a stage.resumecoach.com bloqueados en desarrollo local

---

## [1.0.0] - 2025-XX-XX

### Added
- Configuración inicial del monorepo con pnpm workspaces
- apps/shell: Host principal con Vite + Module Federation
- apps/product: Microfrontend de ejemplo migrado a Vite
- packages/ui: UI Kit compartido con Storybook

