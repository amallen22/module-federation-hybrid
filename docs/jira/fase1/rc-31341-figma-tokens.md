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
- Output: `packages/tokens/` con JSON/CSS/TS

**Incluye**:
- Exportar tokens de Figma (colores, typography, spacing, etc.)
- Crear package `@cv/tokens` en el monorepo
- Configurar Style Dictionary para transformaciones
- Integrar tokens en User app (CSS Variables / Styled Components)
- Validar visualmente User app con tokens aplicados
- Documentar proceso de sincronización Figma → código

---

## ✅ Acceptance Criteria

### AC1: Tokens Exportados de Figma
- [ ] Archivo JSON con todos los tokens (colors, typography, spacing, shadows, radii)
- [ ] Estructura semántica (primitives → semantic → component-specific)
- [ ] Tokens organizados por categorías

### AC2: Package `@cv/tokens` Creado
- [ ] Package en `packages/tokens/` con estructura estándar
- [ ] `package.json` configurado
- [ ] Style Dictionary configurado (`config.json`)
- [ ] Build genera múltiples formatos (CSS, SCSS, JS, TS)

### AC3: Tokens Integrados en User App
- [ ] User app importa `@cv/tokens`
- [ ] CSS Variables aplicadas globalmente (`:root { --color-primary: ...; }`)
- [ ] Componentes usan tokens en lugar de valores hardcodeados
- [ ] Theming funcional (light/dark mode si aplica)

### AC4: Validación Visual Completa
- [ ] User app se ve idéntica a Figma designs
- [ ] Colores coinciden (hex exactos)
- [ ] Typography (font family, sizes, weights) coincide
- [ ] Spacing consistency verificado
- [ ] Shadows y radii aplicados correctamente

### AC5: Documentación y Proceso
- [ ] Documentación en `packages/tokens/README.md`
- [ ] Guía: Cómo exportar tokens de Figma
- [ ] Guía: Cómo usar tokens en código
- [ ] CI/CD: Build tokens automático
- [ ] Storybook: Documentación de tokens (opcional)

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

#### 2. Build Tokens
```bash
cd packages/tokens
pnpm install
pnpm build  # Genera CSS, SCSS, JS, TS
ls -la dist/  # Verificar outputs
```

#### 3. Integrar en User App
```typescript
// apps/user/src/main.tsx
import '@cv/tokens/css/variables.css';

// apps/user/src/components/UserProfile.tsx
const ProfileCard = styled.div`
  background: var(--color-background-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
`;
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
- [ ] Package `@cv/tokens` funcional
- [ ] Style Dictionary configurado
- [ ] Build genera múltiples formatos
- [ ] User app usa tokens (0 valores hardcodeados)
- [ ] Visual fidelity: User app === Figma
- [ ] Accessibility: WCAG AA compliance
- [ ] Documentación completa
- [ ] CI/CD integrado

---

## 📈 Conclusiones y Aprendizajes

### ✅ Resultados Esperados

1. **✅ Theming strategy validada**: Lista para escalar a otras apps
2. **✅ Design-Dev sync**: Proceso claro de Figma → código
3. **✅ Consistency garantizada**: Design system funcionando
4. **✅ Accessibility baseline**: Contrast ratios correctos desde el inicio

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

#### 3. TypeScript Types para Tokens
```typescript
// Auto-generated from tokens
export type ColorToken = 
  | 'color-background-primary'
  | 'color-background-secondary'
  | 'color-text-primary';

// Usage con type safety
const Button = styled.button<{ variant: ColorToken }>`
  background: var(--${props => props.variant});
`;
```

### 🔧 Decisiones de Diseño

| Decisión | Justificación |
|----------|---------------|
| **CSS Variables > Styled Props** | Mejor performance, runtime theming |
| **Style Dictionary > Manual** | Automatización, múltiples outputs |
| **Semantic layering** | Facilita cambios globales sin tocar componentes |
| **Visual regression tests** | Detectar regressions automáticamente |
| **User app como guinea pig** | Menos riesgo que probar en Editor directamente |

---

## 🔄 Mejoras Futuras

### Prioridad Alta 🔴
- [ ] Dark mode completo
- [ ] Tokens para animaciones/transitions
- [ ] Figma → código auto-sync (GitHub Actions)

### Prioridad Media 🟡
- [ ] Storybook con documentación de tokens
- [ ] Themed components library en `@cv/ui`
- [ ] A11y tokens (focus states, keyboard navigation)

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
- **Style Dictionary**: Token transformer
- **Chromatic**: Visual regression testing
- **axe DevTools**: Accessibility testing

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
| Setup package `@cv/tokens` + Style Dictionary | 1.5 SP | ~1.5 horas |
| Integrar tokens en User app | 1.5 SP | ~1.5 horas |
| Validación visual + fixes | 1 SP | ~1 hora |
| Documentación + CI/CD | 0.5 SP | ~30 min |
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
| **Package `@cv/tokens`** | ⏳ Pendiente |
| **Integración User App** | ⏳ Pendiente |
| **Validación Visual** | ⏳ Pendiente |
| **Documentación** | ⏳ Pendiente |
| **Testing** | ⏳ Pendiente |

---

**Creado por**: Cursor AI + Alex Mallen  
**Fecha**: 2 Febrero 2026  
**Sprint**: 2026 Q1 S2 - Team Migration  
**Epic**: RC-31191 - Fase 1: Desbloqueo Stack

**🔗 Jira**: https://leadtech.atlassian.net/browse/RC-31341
