# 🚀 Guía de Inicio: Cursor AI para CV-Hibrid
## Plan de Acción Inmediato

**Fecha**: 17 de Diciembre de 2025  
**Objetivo**: Maximizar productividad con Cursor AI en las primeras semanas

---

## 📋 Checklist Pre-Inicio

### Semana 0: Preparación (Antes de Empezar)

- [ ] **Adquirir Licencias**
  - Cursor AI Pro: $20/mes por desarrollador
  - 2 licencias para Dev 1 y Dev 2
  - Total: $40/mes

- [ ] **Instalación y Setup**
  - Instalar Cursor IDE para ambos devs
  - Configurar workspace de CV-Hibrid
  - Importar configuración de ESLint y Prettier
  - Configurar integración con Git

- [ ] **Configuración del Proyecto**
  - Añadir `.cursorrules` en la raíz del proyecto
  - Configurar contexto específico del proyecto
  - Definir reglas de código y estándares

- [ ] **Training del Equipo**
  - Sesión de onboarding (2 horas)
  - Práctica con ejemplos simples (1 día)
  - Review de best practices (30 min)

---

## 🎓 Training Básico de Cursor AI

### Sesión 1: Fundamentos (2 horas)

#### 1.1 Conceptos Básicos
- ¿Qué es Cursor AI?
- ¿Cómo funciona el modelo de lenguaje?
- Contexto y entendimiento del código

#### 1.2 Features Principales
- **Cmd/Ctrl + K**: Editar código con IA
- **Cmd/Ctrl + L**: Chat con IA sobre el código
- **Tab**: Autocompletado inteligente
- **@-mentions**: Referenciar archivos en prompts

#### 1.3 Ejercicio Práctico
```typescript
// Ejercicio: Pedir a Cursor AI que cree un componente Button
// Prompt sugerido:
"Crea un componente Button en TypeScript con las siguientes características:
- Props: label, onClick, variant (primary/secondary), disabled
- Estilos con Sass modules
- Storybook story con 4 variantes
- Tests unitarios con Vitest
- Sigue los estándares del proyecto en .cursorrules"
```

### Sesión 2: Casos de Uso Avanzados (1 hora)

#### 2.1 Refactoring Masivo
```typescript
// Prompt para migrar Redux a Zustand:
"Analiza este Redux slice y genera un Zustand store equivalente.
Mantén la misma lógica pero usa la sintaxis de Zustand.
Incluye TypeScript types y devtools middleware.

@userSlice.ts"
```

#### 2.2 Generación de Tests
```typescript
// Prompt para tests:
"Genera tests completos con Vitest para este componente.
Incluye:
- Test de renderizado
- Tests de interacciones (clicks, inputs)
- Tests de casos edge
- Mocks de dependencias si es necesario

@Button.tsx"
```

#### 2.3 Conversión JS → TypeScript
```typescript
// Prompt para conversión:
"Convierte este archivo JavaScript a TypeScript.
- Añade tipos para todas las funciones
- Crea interfaces para objetos complejos
- Usa tipos estrictos (no any)
- Infiere tipos de PropTypes si existen

@LegacyComponent.js"
```

---

## 💡 Best Practices para CV-Hibrid

### 1. Prompts Efectivos

#### ✅ BUENOS Prompts (Específicos y con Contexto)

**Ejemplo 1: Crear Componente UI**
```
Crea un componente TextField en packages/ui/src/molecules/:

- TypeScript con props: label, value, onChange, error, placeholder
- Sass module con diseño atómico
- Validación integrada
- Storybook story con 5 variantes (normal, con error, disabled, con placeholder, long text)
- Tests con Vitest cubriendo todos los casos
- Seguir estándares de @.cursorrules
```

**Ejemplo 2: Migrar Código Legacy**
```
Migra este componente legacy de Material-UI a nuestro UI Kit:

1. Reemplaza componentes MUI por equivalentes de packages/ui
2. Convierte class component a functional component con hooks
3. Convierte PropTypes a TypeScript interfaces
4. Migra estilos inline a Sass modules
5. Actualiza tests de Jest a Vitest

@UserProfile.jsx
@packages/ui/src/index.tsx
```

**Ejemplo 3: Refactoring Estado**
```
Refactoriza este código de Redux a Zustand + TanStack Query:

- Estado UI (modals, sidebar) → Zustand
- Datos del servidor (user, settings) → TanStack Query
- Mantén la misma lógica de negocio
- Añade optimistic updates donde sea apropiado
- Actualiza componentes que usan estos datos

@userSlice.ts
@UserProfile.tsx
```

#### ❌ MALOS Prompts (Vagos o sin Contexto)

```
❌ "Haz un botón"
❌ "Arregla esto"
❌ "Migra a TypeScript"
❌ "Hazlo mejor"
```

### 2. Uso de @-Mentions

Cursor AI puede referenciar archivos específicos con `@`:

```
"Analiza la arquitectura de estos archivos y explica cómo se relacionan:

@apps/shell/vite.config.ts
@apps/user/vite.config.ts
@packages/ui/src/index.tsx

Luego sugiere mejoras para la configuración de Module Federation."
```

### 3. Iteración y Refinamiento

```
Flujo recomendado:
1. Prompt inicial (general)
2. Cursor AI genera código
3. Dev revisa y pide ajustes específicos
4. Cursor AI refina
5. Dev valida y hace tweaks manuales finales
```

**Ejemplo**:
```
Prompt 1: "Crea un componente Card básico"
[Cursor genera]
Prompt 2: "Añade soporte para header, footer y actions"
[Cursor refina]
Prompt 3: "Añade animación de hover y mejor responsive"
[Cursor mejora]
Dev: [Ajusta spacing y colores manualmente]
```

---

## 🎯 Plan de Trabajo Semana a Semana

### Semana 1: Adaptación y Primeros Componentes

**Objetivos**:
- Familiarizarse con Cursor AI
- Generar primeros 5 componentes UI Kit con IA
- Establecer workflow de equipo

**Tareas**:
- [ ] **Dev 1**: Crear Button, Icon, Checkbox con Cursor AI
- [ ] **Dev 2**: Crear Input, Select, Radio con Cursor AI
- [ ] **Ambos**: Code review cruzado del código generado
- [ ] **Ambos**: Retrospectiva diaria (15 min)

**Métricas a trackear**:
- Tiempo por componente: Target <40 min vs ~110 sin IA
- Calidad del código generado: 1-5 estrellas
- Número de iteraciones necesarias: Target <3

### Semana 2: Escala y Componentes Avanzados

**Objetivos**:
- Acelerar generación de componentes
- Componentes más complejos (DatePicker, Autocomplete)
- Optimizar prompts

**Tareas**:
- [ ] **Dev 1**: Dialog, Card, Tabs con Cursor AI
- [ ] **Dev 2**: DatePicker, Autocomplete con Cursor AI
- [ ] **Ambos**: Documentar mejores prompts en wiki interna
- [ ] **Ambos**: Medir reducción de tiempo vs semana 1

**Métricas**:
- Velocidad: Target 50% más rápido que semana 1
- Componentes completados: Target 8-10 componentes
- Cobertura de tests: >85%

### Semana 3-4: Completar UI Kit y Preparar Fase 2

**Objetivos**:
- Completar todos los componentes UI Kit necesarios
- Documentación completa en Storybook
- Preparar workflow para Fase 2 (migración apps)

**Tareas**:
- [ ] Completar componentes restantes con IA
- [ ] Review exhaustivo de todos los componentes
- [ ] Storybook stories para todos
- [ ] Tests coverage >85%
- [ ] Documentación de API de componentes

---

## 🔧 Configuración Recomendada

### .cursorrules (Archivo en Raíz del Proyecto)

Crear archivo `.cursorrules` con reglas específicas del proyecto:

```markdown
# Reglas de Cursor AI para CV-Hibrid

## Contexto del Proyecto
Este es un proyecto de migración de arquitectura legacy a microservicios con Module Federation.

## Stack Tecnológico
- React 18.3+
- TypeScript 5+ (strict mode)
- Vite 6+ con Module Federation
- Sass modules (NO CSS-in-JS, NO styled-components)
- Zustand para estado UI
- TanStack Query para datos asíncronos
- Vitest para testing
- Storybook para documentación

## Prohibiciones Estrictas
- NUNCA usar Material-UI (@mui/*)
- NUNCA usar styled-components o @emotion/styled
- NUNCA usar Redux o Redux Toolkit
- NUNCA usar class components
- NUNCA usar PropTypes (usar TypeScript)
- NUNCA usar Jest (usar Vitest)

## Estándares de Código

### Componentes React
- Functional components con hooks
- TypeScript con tipado estricto
- Props interface claramente definida
- Sass modules para estilos
- Export nombrado (no default export)

Ejemplo:
```typescript
import { FC } from 'react';
import styles from './Component.module.scss';

interface ComponentProps {
  label: string;
  onClick: () => void;
}

export const Component: FC<ComponentProps> = ({ label, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};
```

### Estructura de Archivos
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.scss
├── ComponentName.stories.tsx
├── ComponentName.test.tsx
└── index.ts
```

### Tests (Vitest)
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
```

### Diseño Atómico
Organizar componentes en:
- atoms/: Componentes básicos (Button, Icon, Input)
- molecules/: Combinaciones simples (TextField = Label + Input + Error)
- organisms/: Componentes complejos (Card, Dialog, Tabs)

## Generación de Código
Cuando generes código:
1. Siempre incluir TypeScript types
2. Siempre crear Storybook story
3. Siempre escribir tests con Vitest
4. Seguir naming conventions del proyecto
5. Usar Sass modules, nunca inline styles
6. Documentar con JSDoc
```

### Shortcuts Personalizados (Opcional)

Configurar en Settings de Cursor:

```json
{
  "cursor.shortcuts": {
    "generateComponent": {
      "keybinding": "Cmd+Shift+C",
      "prompt": "Genera un componente React siguiendo los estándares de .cursorrules"
    },
    "generateTests": {
      "keybinding": "Cmd+Shift+T",
      "prompt": "Genera tests con Vitest para el archivo actual siguiendo .cursorrules"
    },
    "refactorToTS": {
      "keybinding": "Cmd+Shift+R",
      "prompt": "Convierte este archivo a TypeScript siguiendo estándares de .cursorrules"
    }
  }
}
```

---

## 📊 Métricas y Tracking

### Dashboard de Progreso (Actualizar Semanalmente)

| Semana | Componentes Generados | Tiempo Promedio/Componente | Tests Coverage | Bugs Encontrados | Satisfacción Equipo |
|--------|----------------------|----------------------------|----------------|------------------|---------------------|
| 1      | 5                    | 45 min                     | 82%            | 3                | 8/10                |
| 2      | 8                    | 35 min                     | 87%            | 2                | 9/10                |
| 3      | 10                   | 30 min                     | 90%            | 1                | 9/10                |
| 4      | 12                   | 25 min                     | 92%            | 0                | 10/10               |

### KPIs Objetivo (Fin de Mes 1)

- ✅ Velocidad: <30 min por componente
- ✅ Coverage: >85%
- ✅ Bugs: <2 por semana
- ✅ Satisfacción: >8/10
- ✅ Componentes UI Kit: 20/20 completos

---

## 🚨 Troubleshooting Común

### Problema 1: Cursor AI genera código que no sigue estándares

**Solución**:
- Verificar que `.cursorrules` está en la raíz
- Referenciar `.cursorrules` explícitamente en prompts:
  ```
  "Genera componente siguiendo @.cursorrules"
  ```
- Iterar con Cursor: "Este código no sigue nuestros estándares de Sass modules. Por favor refactoriza."

### Problema 2: Código generado tiene errores TypeScript

**Solución**:
- Pedir a Cursor que corrija:
  ```
  "Hay errores de TypeScript en este código. Por favor arregla todos los errores y usa tipos estrictos."
  ```
- Verificar que `tsconfig.json` está configurado correctamente

### Problema 3: Tests generados no son suficientes

**Solución**:
- Ser más específico en el prompt:
  ```
  "Genera tests exhaustivos con Vitest incluyendo:
  - Tests de renderizado
  - Tests de todas las interacciones posibles
  - Tests de casos edge (valores vacíos, null, undefined)
  - Tests de estados de error
  - Mocks de todas las dependencias"
  ```

### Problema 4: Cursor AI no entiende el contexto del proyecto

**Solución**:
- Usar @-mentions para dar más contexto:
  ```
  "Basándote en estos archivos:
  @packages/ui/src/atoms/Button/Button.tsx
  @.cursorrules
  
  Genera un componente similar pero para Input"
  ```

---

## 🎓 Recursos Adicionales

### Documentación Oficial
- [Cursor AI Docs](https://cursor.sh/docs)
- [Cursor AI Best Practices](https://cursor.sh/docs/best-practices)

### Comunidad
- Discord de Cursor AI
- Reddit: r/cursor
- Twitter: @cursor_ai

### Videos Tutoriales Recomendados
- "Getting Started with Cursor AI" (15 min)
- "Advanced Cursor AI Techniques" (30 min)
- "Cursor AI for React Development" (25 min)

---

## ✅ Checklist de Éxito Semana 1

Al final de la primera semana, deberías haber:

- [x] Instalado y configurado Cursor AI
- [x] Creado archivo `.cursorrules`
- [x] Completado training básico
- [x] Generado al menos 5 componentes con IA
- [x] Cada componente tiene: TypeScript + Sass + Story + Tests
- [x] Code review de todo el código generado
- [x] Documentado mejores prompts en wiki
- [x] Medido tiempo promedio por componente
- [x] Identificado áreas de mejora para semana 2

**Si todos los checks están completados**: ¡Estás listo para escalar! 🚀

---

## 📞 Soporte

**Dudas o Problemas**:
1. Consultar este documento
2. Revisar `.cursorrules`
3. Buscar en Cursor AI Docs
4. Preguntar en el canal de Slack del equipo
5. Abrir issue en el repo interno

---

**Documento creado por**: AI Assistant  
**Fecha**: 17 de Diciembre de 2025  
**Versión**: 1.0  
**Última actualización**: Diciembre 2025



