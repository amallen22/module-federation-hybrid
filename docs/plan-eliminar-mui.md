# Plan: Eliminación Completa de Material-UI y Emotion

## Objetivo

Eliminar completamente todas las dependencias y usos de Material-UI (`@mui/*`) y Emotion (`@emotion/*`) del proyecto `apps/login`, reemplazándolos con componentes de `@packages/ui` o componentes nuevos con Sass modules.

## Estado Actual

### Dependencias en `package.json`

**Dependencies:**
- `@emotion/react`: ^11.14.0
- `@emotion/styled`: ^11.14.1
- `@mui/icons-material`: ^5.18.0

**DevDependencies:**
- `@emotion/babel-plugin`: ^11.11.0

### Archivos que usan `@emotion/styled`

1. **`src/app/components/Password/PasswordRescue.jsx`**
   - `ContentMessage` (styled.p)
   - `IllustrationContainer` (styled.div)

2. **`src/app/components/Password/PasswordReset.jsx`**
   - Probablemente similar a PasswordRescue

3. **`src/app/components/Signing/SignIn.jsx`**
   - `StyledWrapper` (styled.div)
   - `CheckboxWrapper` (styled.div)
   - `StyledContainer` (styled.div)

4. **`src/app/components/Signing/SignUp.jsx`**
   - `StyledWrapper` (styled.div)
   - `StyledInfoParagraph` (styled.p)

5. **`src/app/components/lib/IntroductionTop.jsx`**
   - `StyledPrincipalLabel` (styled.h1)

6. **`src/app/components/lib/SigningRedirection.jsx`**
   - `Label` (styled.div)
   - `RedirectionWrapper` (styled.div)

7. **`src/app/components/Signing/HelpMessage.jsx`**
   - `StyledDiv` (styled.div)

8. **`src/app/components/Label/styles.js`**
   - `TextFieldWrapper` (styled.div)

9. **`src/app/styles/app_vars.js`**
   - `Scroll` (styled.div)
   - `mediaQueries` (objeto con media queries)

### Archivos legacy con MUI (no se usan actualmente)

- **`src/app/index.js`** - Archivo legacy que usa:
  - `ThemeProvider` de `@mui/material/styles`
  - `StyledEngineProvider` de `@mui/system`
  - Este archivo ya no se usa (reemplazado por `main.tsx` y `App.tsx`)

### Referencias en configuración

- **`vite.config.ts`**: Tiene `@emotion/react` y `@emotion/styled` en `optimizeDeps.exclude`
- **`babel.config.cjs`**: Tiene `@emotion/babel-plugin` en plugins

## Fases de Migración

### Fase 1: Migración de Componentes con `@emotion/styled`

#### 1.1 Componentes de Signing

**`SignIn.jsx`**
- Convertir `StyledWrapper`, `CheckboxWrapper`, `StyledContainer` a Sass modules
- Crear `SignIn.module.scss`
- Convertir a functional component si es posible (actualmente es class component)

**`SignUp.jsx`**
- Convertir `StyledWrapper`, `StyledInfoParagraph` a Sass modules
- Crear `SignUp.module.scss`
- Mantener como class component si tiene lógica compleja

**`HelpMessage.jsx`**
- Convertir `StyledDiv` a Sass module
- Crear `HelpMessage.module.scss`
- Ya es functional component, solo migrar estilos

#### 1.2 Componentes de Password

**`PasswordRescue.jsx`**
- Convertir `ContentMessage`, `IllustrationContainer` a Sass modules
- Crear `PasswordRescue.module.scss`
- Mantener como class component

**`PasswordReset.jsx`**
- Similar a PasswordRescue
- Crear `PasswordReset.module.scss`

#### 1.3 Componentes de lib

**`IntroductionTop.jsx`**
- Convertir `StyledPrincipalLabel` a Sass module
- Crear `IntroductionTop.module.scss`
- Ya es functional component

**`SigningRedirection.jsx`**
- Convertir `Label`, `RedirectionWrapper` a Sass modules
- Crear `SigningRedirection.module.scss`
- Ya es functional component

#### 1.4 Componentes de Label

**`Label/styles.js`**
- Convertir `TextFieldWrapper` a Sass module
- Crear `Label/styles.module.scss` o mover a componente específico
- Verificar dónde se usa y si se puede integrar en el componente que lo consume

#### 1.5 Estilos globales

**`app_vars.js`**
- `Scroll`: Convertir a clase CSS en Sass global o crear componente `Scroll.tsx` con Sass module
- `mediaQueries`: Convertir a mixins Sass en archivo de utilidades (`_mixins.scss`)

### Fase 2: Limpieza de Archivos Legacy

#### 2.1 Eliminar o limpiar `src/app/index.js`
- **Opción A**: Eliminar completamente si no se usa
- **Opción B**: Limpiar imports de MUI y mantener como referencia temporal
- Verificar que `main.tsx` y `App.tsx` no dependan de este archivo

### Fase 3: Actualización de Configuración

#### 3.1 `package.json`
- Eliminar de `dependencies`:
  - `@emotion/react`
  - `@emotion/styled`
  - `@mui/icons-material`
- Eliminar de `devDependencies`:
  - `@emotion/babel-plugin`

#### 3.2 `vite.config.ts`
- Eliminar `@emotion/react` y `@emotion/styled` de `optimizeDeps.exclude`
- Verificar que no haya otras referencias

#### 3.3 `babel.config.cjs`
- Eliminar `@emotion/babel-plugin` de plugins
- Verificar que no haya otros plugins de Emotion

### Fase 4: Verificación y Testing

#### 4.1 Verificar que no queden imports
- Buscar todos los imports de `@mui/*` y `@emotion/*`
- Verificar que no haya referencias en comentarios o strings

#### 4.2 Testing
- Probar que todos los componentes se renderizan correctamente
- Verificar estilos visuales
- Probar en diferentes navegadores si es necesario

#### 4.3 Build
- Verificar que el build funciona sin errores
- Verificar que no hay warnings relacionados con MUI/Emotion

## Estrategia de Migración por Componente

### Patrón General

**ANTES (con Emotion):**
```jsx
import styled from '@emotion/styled';

const StyledDiv = styled.div`
    padding: 10px;
    color: #333;
`;

const Component = () => (
    <StyledDiv>Content</StyledDiv>
);
```

**DESPUÉS (con Sass modules):**
```jsx
import styles from './Component.module.scss';

const Component = () => (
    <div className={styles.container}>Content</div>
);
```

```scss
// Component.module.scss
.container {
    padding: 10px;
    color: #333;
}
```

### Casos Especiales

#### 1. Props dinámicas con Emotion
Si un styled component usa props para estilos dinámicos:
```jsx
const StyledDiv = styled.div`
    color: ${props => props.isActive ? 'blue' : 'gray'};
`;
```

Convertir a:
```jsx
import classNames from 'classnames';
import styles from './Component.module.scss';

const Component = ({ isActive }) => (
    <div className={classNames(styles.container, { [styles.active]: isActive })}>
        Content
    </div>
);
```

```scss
.container {
    color: gray;
    
    &.active {
        color: blue;
    }
}
```

#### 2. Media Queries
Convertir `mediaQueries` de `app_vars.js` a mixins Sass:
```scss
// _mixins.scss
@mixin smallAndDown {
    @media (max-width: 1024px) {
        @content;
    }
}

@mixin mediumAndDown {
    @media (max-width: 768px) {
        @content;
    }
}
```

#### 3. Variables de tema (dsmColors, dsmTypography)
Mantener el uso de variables de `@npm_leadtech/cv-lib-app-components` en Sass:
```scss
.container {
    color: var(--dsm-color-neutral-800);
    font-family: var(--dsm-typography-primary-font-family);
}
```

O importar directamente si están disponibles como variables CSS.

## Priorización

### Alta Prioridad (Componentes visibles en UI principal)
1. `SignIn.jsx` - Página principal de login
2. `SignUp.jsx` - Página de registro
3. `IntroductionTop.jsx` - Título principal
4. `SigningRedirection.jsx` - Enlaces de navegación

### Media Prioridad (Componentes de flujos secundarios)
5. `PasswordRescue.jsx` - Recuperación de contraseña
6. `PasswordReset.jsx` - Reset de contraseña
7. `HelpMessage.jsx` - Mensajes de ayuda

### Baja Prioridad (Estilos auxiliares)
8. `Label/styles.js` - Wrapper de TextField
9. `app_vars.js` - Utilidades de scroll y media queries

### Limpieza
10. `index.js` - Archivo legacy
11. Dependencias en `package.json`
12. Configuración en `vite.config.ts` y `babel.config.cjs`

## Checklist de Verificación

- [ ] Todos los componentes migrados de `@emotion/styled` a Sass modules
- [ ] Todos los archivos `.module.scss` creados
- [ ] `index.js` limpiado o eliminado
- [ ] Dependencias eliminadas de `package.json`
- [ ] `vite.config.ts` actualizado
- [ ] `babel.config.cjs` actualizado
- [ ] No quedan imports de `@mui/*` o `@emotion/*`
- [ ] Build funciona correctamente
- [ ] UI se ve correctamente en navegador
- [ ] Tests pasan (si existen)

## Notas Importantes

- **NO** crear nuevos componentes con `@emotion/styled`
- **SÍ** usar Sass modules para todos los estilos
- Mantener compatibilidad con variables de `@npm_leadtech/cv-lib-app-components`
- Seguir el diseño atómico para componentes reutilizables
- Si un componente styled es muy simple, considerar convertirlo directamente a HTML con clases CSS

## Referencias

- `.cursorrules` - Reglas del proyecto sobre Sass modules
- `packages/ui` - Componentes de referencia con Sass modules
- Componentes ya migrados: `GoogleLogin.tsx`, `LinkedInLogin.tsx`, `Divider.tsx`





