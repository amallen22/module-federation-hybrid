# 🎨 Validación de Figma Design Tokens en User App - Tech Story

## 📋 Información de la Tarea

**Key**: [RC-31341](https://leadtech.atlassian.net/browse/RC-31341)  
**Tipo**: Tech Story (Historia Técnica)  
**Epic**: [RC-31191] Fase 1: Desbloqueo del Stack Tecnológico  
**Sprint**: 2026 Q1 S2 - Team Migration (26 Ene - 6 Feb)  
**Story Points**: 5 SP  
**Labels**: `design-system`, `figma`, `frontend`, `theming`, `tokens`, `user-app`, `tech-story`, `Team1`  
**Estado**: ⏳ Pendiente  
**Fecha Creación**: 2 Febrero 2026

---

## 🎯 Hipótesis

**Como equipo CV**, necesitamos implementar y validar los Design Tokens de Figma (colores, tipografías, espaciados, etc.) en la aplicación User ya migrada a `cv-micro`, **para poder**:

- ✅ Validar la estrategia de theming antes de migrar más apps
- ✅ Garantizar consistencia visual con los diseños de Figma
- ✅ Detectar problemas de integración tokens → código early
- ✅ Establecer el proceso de sincronización Figma → código
- ✅ Demostrar a Design team que los tokens funcionan end-to-end

### 💡 Hipótesis Central

> Validar Design Tokens en User (app pequeña, ~15K LOC) **antes de escalar a Editor** (100K+ LOC) nos permitirá detectar el 90% de los problemas de integración con solo el 10% del esfuerzo, evitando re-trabajos masivos después.

### 🤔 Problema a Resolver

Actualmente, los estilos están hardcodeados en el código legacy (colores en hex, espaciados en px). No existe sincronización entre Figma y código.

**Gap identificado**:
- ❌ Estilos hardcodeados → difícil cambiar theming
- ❌ Inconsistencias visuales entre diseño (Figma) y código
- ❌ Sin proceso definido para exportar tokens de Figma
- ❌ Sin validación de que tokens cubren todos los casos de uso

---

## 📋 Descripción de la Implementación

Implementar y probar los Design Tokens de Figma (colores, tipografías, espaciados, shadows, radios, etc.) en la aplicación User ya migrada a `cv-micro`, validando la estrategia de theming para el resto de aplicaciones.

**Contexto**:
- App objetivo: `cv-micro/apps/user/` (post RC-31340)
- Source: Figma Foundations (archivo de diseño del equipo)
- Tool: Figma Tokens plugin / Style Dictionary
- Output: Integración en `@npm_leadtech/cv-ui-kit` (repositorio externo)

**Incluye**:
- Exportar tokens de Figma (colores, typography, spacing, etc.)
- Integrar tokens en cv-ui-kit existente (o proponer estructura si no tiene)
- Configurar Style Dictionary para transformaciones (si no existe)
- Validar tokens en User app usando `@npm_leadtech/cv-ui-kit`
- Validar visualmente User app con tokens aplicados
- Documentar proceso de sincronización Figma → cv-ui-kit → apps

---

## ✅ Acceptance Criteria

### AC1: Tokens Exportados de Figma
- [ ] Archivo JSON con todos los tokens (colors, typography, spacing, shadows, radii)
- [ ] Estructura semántica (primitives → semantic → component-specific)
- [ ] Tokens organizados por categorías

### AC2: Tokens Integrados en cv-ui-kit
- [ ] Tokens integrados en `@npm_leadtech/cv-ui-kit` (repositorio Bitbucket)
- [ ] `package.json` de cv-ui-kit actualizado (nueva versión)
- [ ] Style Dictionary configurado en cv-ui-kit (si no existe)
- [ ] Build genera múltiples formatos (CSS, SCSS, JS, TS) desde tokens
- [ ] `@npm_leadtech/cv-ui-kit/styles` incluye tokens CSS Variables

### AC3: User App Usa Tokens desde cv-ui-kit
- [ ] User app importa `@npm_leadtech/cv-ui-kit` (última versión con tokens)
- [ ] CSS Variables aplicadas globalmente (`:root { --color-primary: ...; }`)
- [ ] Componentes de cv-ui-kit usan tokens en lugar de valores hardcodeados
- [ ] Theming funcional (light/dark mode si aplica)

### AC4: Validación Visual Completa
- [ ] User app se ve idéntica a Figma designs
- [ ] Colores coinciden (hex exactos)
- [ ] Typography (font family, sizes, weights) coincide
- [ ] Spacing consistency verificado
- [ ] Shadows y radii aplicados correctamente

### AC5: Documentación y Proceso
- [ ] Documentación en `cv-ui-kit/README.md` actualizada (sección tokens)
- [ ] Guía: Cómo exportar tokens de Figma
- [ ] Guía: Cómo integrar tokens en cv-ui-kit
- [ ] Guía: Cómo usar tokens desde apps consumidoras
- [ ] CI/CD en cv-ui-kit: Build tokens automático
- [ ] Proceso de release: bump version cuando cambian tokens

### AC6: Testing
- [ ] Visual regression tests (Chromatic / Percy)
- [ ] Tests unitarios verifican uso correcto de tokens
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Accessibility checks (contrast ratios WCAG AA)

---

## 🧪 Testing

### Tests Manuales

#### 1. Exportar Tokens de Figma
```bash
# Usando Figma Tokens Plugin
1. Abrir Figma → Plugin → Figma Tokens
2. Select all tokens (Colors, Typography, Spacing, etc.)
3. Export → JSON
4. Guardar en packages/tokens/src/foundations.json
```

#### 2. Build Tokens (en cv-ui-kit)
```bash
cd /home/amallen/www/cv/cv-environment-local/workspace/cv-ui-kit
# Copiar tokens exportados a src/styles/tokens/ (o estructura adecuada)
# Si no existe Style Dictionary, configurarlo
pnpm install
pnpm build  # Genera dist/ con tokens integrados
```

#### 3. Integrar en User App
```typescript
// apps/user/src/main.tsx
import '@npm_leadtech/cv-ui-kit/styles'; // Ya incluye tokens

// apps/user/src/components/UserProfile.tsx
import { Card, Button } from '@npm_leadtech/cv-ui-kit';

// Los componentes de cv-ui-kit ya usan tokens internamente
const ProfileCard = () => (
  <Card>
    <Button variant="primary">Save Profile</Button>
  </Card>
);
```

**Nota**: Si User app tiene componentes custom, pueden usar las CSS Variables expuestas por cv-ui-kit:
```css
.custom-component {
  background: var(--color-background-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}
```

#### 4. Validación Visual
```bash
# Abrir User app en dev
pnpm dev
# Comparar visualmente con Figma designs
# Usar herramientas: Pixel Perfect, Chrome DevTools
```

### Tests Automatizados

#### Visual Regression (Chromatic)
```bash
pnpm chromatic --project-token=<TOKEN>
# Debe detectar cambios visuales vs baseline
```

#### Accessibility (axe DevTools)
```typescript
test('Color contrast meets WCAG AA', async ({ page }) => {
  await page.goto('https://local.resumecoach.com/user');
  const results = await injectAxe(page);
  expect(results.violations.filter(v => v.id === 'color-contrast')).toHaveLength(0);
});
```

### Casos Edge

| Caso Edge | Comportamiento Esperado |
|-----------|-------------------------|
| Tema claro → oscuro | Tokens se actualizan correctamente |
| Browser sin CSS Variables | Fallback a valores estáticos |
| Tokens faltantes | Build error en Style Dictionary |
| Token mal referenciado | TypeScript error en compilación |

### Checklist de Validación

- [ ] Tokens exportados de Figma
- [ ] Tokens integrados en `@npm_leadtech/cv-ui-kit`
- [ ] Style Dictionary configurado (si no existía)
- [ ] Build de cv-ui-kit genera CSS con tokens
- [ ] User app usa `@npm_leadtech/cv-ui-kit` (versión con tokens)
- [ ] Visual fidelity: User app === Figma
- [ ] Accessibility: WCAG AA compliance
- [ ] Documentación completa (en cv-ui-kit + guía integración)
- [ ] Nueva versión de cv-ui-kit publicada

---

## 📈 Conclusiones y Aprendizajes

### ✅ Resultados Esperados

1. **✅ Theming strategy validada**: Lista para escalar a otras apps
2. **✅ Design-Dev sync**: Proceso claro Figma → cv-ui-kit → apps
3. **✅ Consistency garantizada**: Design system funcionando con tokens
4. **✅ Accessibility baseline**: Contrast ratios correctos desde el inicio
5. **✅ cv-ui-kit versionado**: Tokens como parte de releases del UI Kit

### 🎓 Aprendizajes Técnicos Proyectados

#### 1. Token Structure: Semantic Layering
```json
{
  "color": {
    "primitive": {
      "blue": { "500": "#3B82F6" }
    },
    "semantic": {
      "primary": { "value": "{color.primitive.blue.500}" }
    },
    "component": {
      "button-bg": { "value": "{color.semantic.primary}" }
    }
  }
}
```

**Beneficio**: Cambiar `blue.500` actualiza todos los componentes que usan `primary`.

#### 2. Style Dictionary Transformations
```javascript
// config.json
{
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/css/",
      "files": [{
        "destination": "variables.css",
        "format": "css/variables"
      }]
    }
  }
}
```

#### 3. TypeScript Types para Tokens (en cv-ui-kit)
```typescript
// cv-ui-kit/src/types/tokens.ts
// Auto-generated from tokens
export type ColorToken = 
  | 'color-background-primary'
  | 'color-background-secondary'
  | 'color-text-primary';

// Usage en componentes de cv-ui-kit con type safety
import { ColorToken } from './types/tokens';

interface ButtonProps {
  bgColor?: ColorToken;
}
```

### 🔧 Decisiones de Diseño

| Decisión | Justificación |
|----------|---------------|
| **CSS Variables > Styled Props** | Mejor performance, runtime theming |
| **Style Dictionary > Manual** | Automatización, múltiples outputs |
| **Semantic layering** | Facilita cambios globales sin tocar componentes |
| **Visual regression tests** | Detectar regressions automáticamente |
| **User app como guinea pig** | Menos riesgo que probar en Editor directamente |
| **Tokens en cv-ui-kit** | Librería externa, versionada independientemente |
| **Tokens como parte del release** | Bump version de cv-ui-kit cuando cambian tokens |

---

## 🔄 Mejoras Futuras

### Prioridad Alta 🔴
- [ ] Dark mode completo
- [ ] Tokens para animaciones/transitions
- [ ] Figma → cv-ui-kit auto-sync (GitHub Actions en cv-ui-kit repo)

### Prioridad Media 🟡
- [ ] Storybook en cv-ui-kit con documentación de tokens
- [ ] A11y tokens (focus states, keyboard navigation)
- [ ] Automatic token updates: Figma webhook → cv-ui-kit PR

### Prioridad Baja 🟢
- [ ] Multi-brand theming (white-label support)
- [ ] Advanced tokens (gradients, patterns)

---

## 🔗 Referencias

### Documentación Interna
- 📝 [Plan de Migración](../../../plan_migracion.md)
- 🎯 **Epic**: [RC-31191 - Fase 1](https://leadtech.atlassian.net/browse/RC-31191)
- 📦 **Depends on**: [RC-31340 - User Integration](https://leadtech.atlassian.net/browse/RC-31340)

### Documentación Externa
- 🎨 [Figma Tokens Plugin](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens)
- 🔧 [Style Dictionary](https://amzn.github.io/style-dictionary/)
- 📘 [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)
- ♿ [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

### Herramientas
- **Figma**: Design source
- **Style Dictionary**: Token transformer (si no existe en cv-ui-kit)
- **Chromatic**: Visual regression testing
- **axe DevTools**: Accessibility testing

### Repositorios
- **cv-ui-kit**: https://bitbucket.org/grupoblidoo/cv-ui-kit/src/master/
- **User app**: `cv-micro/apps/user/` (consumidor de cv-ui-kit)

---

## ⏱️ Story Points: 5 SP

### Justificación (Northstar Framework)
- **Complejidad**: Media-Alta (setup inicial de tokens, nuevo proceso)
- **Incertidumbre**: Media (primera vez implementando Design Tokens)
- **Esfuerzo**: ~4-5 horas
- **Riesgo**: Medio (no bloquea funcionalidad, solo afecta visual)

### Desglose de Esfuerzo

| Tarea | Story Points | Tiempo Estimado |
|-------|--------------|-----------------|
| Exportar tokens de Figma | 0.5 SP | ~30 min |
| Integrar tokens en cv-ui-kit + Style Dictionary (si no existe) | 2 SP | ~2 horas |
| Build cv-ui-kit + publicar nueva versión | 0.5 SP | ~30 min |
| Actualizar User app a nueva versión cv-ui-kit | 1 SP | ~1 hora |
| Validación visual + fixes | 0.5 SP | ~30 min |
| Documentación (cv-ui-kit + proceso) | 0.5 SP | ~30 min |
| **TOTAL** | **5 SP** | **~4-5 horas** |

---

## 🔄 Dependencias

### Depende de
- **RC-31340**: User Integration (necesita User app migrada)

### Bloquea
- Ninguna (no bloqueante, pero deseable antes de migrar más apps)

### Puede ejecutarse en paralelo con
- RC-31342 (Login Real)

---

## 🎉 Estado Final

| Aspecto | Estado |
|---------|--------|
| **Tokens Exportados** | ⏳ Pendiente |
| **Integración en cv-ui-kit** | ⏳ Pendiente |
| **Nueva versión cv-ui-kit** | ⏳ Pendiente |
| **User App Actualizada** | ⏳ Pendiente |
| **Validación Visual** | ⏳ Pendiente |
| **Documentación** | ⏳ Pendiente |
| **Testing** | ⏳ Pendiente |

---

**Creado por**: Cursor AI + Alex Mallen  
**Fecha**: 2 Febrero 2026  
**Sprint**: 2026 Q1 S2 - Team Migration  
**Epic**: RC-31191 - Fase 1: Desbloqueo Stack

**🔗 Jira**: https://leadtech.atlassian.net/browse/RC-31341
