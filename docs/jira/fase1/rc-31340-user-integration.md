# 🧑 Integración de cv-app-user en Module Federation - Tech Story

## 📋 Información de la Tarea

**Key**: [RC-31340](https://leadtech.atlassian.net/browse/RC-31340)  
**Tipo**: Tech Story (Historia Técnica)  
**Epic**: [RC-31191] Fase 1: Desbloqueo del Stack Tecnológico  
**Sprint**: 2026 Q1 S2 - Team Migration (26 Ene - 6 Feb)  
**Story Points**: 8 SP  
**Labels**: `frontend`, `migration`, `module-federation`, `react`, `typescript`, `user-app`, `vite`, `tech-story`, `Team1`  
**Estado**: ⏳ Pendiente  
**Fecha Creación**: 2 Febrero 2026

---

## 🎯 Hipótesis

**Como equipo CV**, necesitamos integrar la aplicación User real del legacy (`cv-app-user`) en el nuevo monorepo `cv-micro`, **para poder**:

- ✅ Validar la arquitectura Module Federation con una app real (no mock)
- ✅ Probar el flujo completo de autenticación + navegación
- ✅ Establecer el patrón de migración para las siguientes apps (Shop, Payment, Editor)
- ✅ Demostrar a stakeholders que la nueva arquitectura funciona end-to-end

### 💡 Hipótesis Central

> Migrar User (app mediana, ~15K LOC) **antes que Editor** (app grande, 100K+ LOC) nos permitirá detectar el 70% de los problemas arquitecturales con solo el 15% del esfuerzo, validando la estrategia de migración antes de invertir en la app más crítica.

### 🤔 Problema a Resolver

La app User del legacy (`cv-app-user`) está en su propio repositorio de Bitbucket con stack antiguo (Webpack, Material-UI, Redux). Necesitamos:

**Gap identificado**:
- ❌ App User legacy no es compatible con Module Federation
- ❌ Stack desactualizado (Webpack 4, React 17, Redux)
- ❌ Material-UI dificulta el re-theming con Design Tokens
- ❌ Sin forma de validar la integración Shell ↔ User autenticada

---

## 📋 Descripción de la Implementación

Migrar la aplicación `cv-app-user` desde su repositorio legacy de Bitbucket al nuevo monorepo `cv-micro`, adaptándola para funcionar como microfrontend en la arquitectura Module Federation.

**Contexto**:
- App origen: `https://bitbucket.org/grupoblidoo/cv-app-user/src/master/`
- Destino: `cv-micro/apps/user/`
- Port asignado: `5004`
- LOC estimadas: ~15,000 líneas

**Incluye**:
- Migrar código completo de cv-app-user
- Refactorizar a Vite 6 + Module Federation
- Actualizar dependencias: React 18.3+, TypeScript 5+
- Migrar Redux → Zustand (state management)
- Migrar llamadas API → TanStack Query hooks
- Adaptar Material-UI → UI Kit propio (`packages/ui`)
- Configurar exports de Module Federation
- Integración con Shell (rutas, navegación, auth)

---

## ✅ Acceptance Criteria

### AC1: Código Migrado y Estructurado
- [ ] Todo el código de cv-app-user en `cv-micro/apps/user/`
- [ ] Estructura adaptada a monorepo (`src/`, `public/`, `tests/`)
- [ ] `package.json` configurado correctamente
- [ ] Dependencies actualizadas (React 18.3+, TypeScript 5+)

### AC2: Refactorización de Stack
- [ ] Migración JS → TypeScript (mínimo 80% tipado)
- [ ] Redux → Zustand implementado
- [ ] API calls → TanStack Query hooks
- [ ] Material-UI → UI Kit propio (componentes críticos refactorizados)
- [ ] Vite 6 configurado con Module Federation

### AC3: Module Federation Configurado
- [ ] `vite.config.ts` con plugin `@originjs/vite-plugin-federation`
- [ ] Exports: UserProfile, UserRoutes, useUserStore
- [ ] Remote configurado en Shell app
- [ ] Port 5004 funcionando

### AC4: Funcionalidad Core Preservada
- [ ] Perfil de usuario se visualiza correctamente
- [ ] Edición de perfil funciona
- [ ] Navegación interna de la app User funciona
- [ ] Integración con API legacy funcionando

### AC5: Integración con Shell y Login
- [ ] User accesible desde Shell en `/user`
- [ ] Auth state compartido (Zustand)
- [ ] Protected routes verifican autenticación
- [ ] Redirect a Login si no autenticado

### AC6: Testing Completo
- [ ] Tests unitarios de componentes críticos (Vitest)
- [ ] Tests de integración con Shell
- [ ] E2E: Login → Shell → User → navegación
- [ ] Coverage > 50%

### AC7: Build y Deploy
- [ ] Build producción sin warnings
- [ ] Bundle size optimizado (< 500KB inicial)
- [ ] Docker staging environment funciona
- [ ] `https://local.resumecoach.com/user` accesible

---

## 🧪 Testing

### Tests Manuales

#### 1. Desarrollo Local
```bash
cd cv-micro
pnpm install
pnpm dev  # Levanta todos los microfrontends
# User debe estar en http://localhost:5004
```

#### 2. Navegación desde Shell
```bash
# Abrir http://localhost:5000 (Shell)
# Login → Click en "User Profile" → Debe cargar User app dinámicamente
```

#### 3. Auth Flow Completo
```bash
# 1. Acceder a http://localhost:5000/user (sin login)
#    → Debe redirigir a /login
# 2. Login con credenciales
# 3. Redirect automático a /user
# 4. Perfil de usuario visible
```

#### 4. Edición de Perfil
```bash
# Cambiar nombre, email, foto
# Guardar → Verificar persistencia
```

### Tests E2E (Playwright)

```typescript
test('Flujo completo User App', async ({ page }) => {
  // Login
  await page.goto('https://local.resumecoach.com/login');
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="login-button"]');
  
  // Navegar a User
  await page.goto('https://local.resumecoach.com/user');
  await expect(page.locator('[data-testid="user-profile"]')).toBeVisible();
  
  // Editar perfil
  await page.click('[data-testid="edit-profile-button"]');
  await page.fill('[data-testid="name-input"]', 'John Doe Updated');
  await page.click('[data-testid="save-button"]');
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

### Casos Edge

| Caso Edge | Comportamiento Esperado |
|-----------|-------------------------|
| Acceder a /user sin login | Redirect a /login con returnUrl=/user |
| Token expirado durante uso | Refresh automático o redirect a login |
| Network error en API call | Error handling + retry con TanStack Query |
| Module Federation falla | Fallback a error boundary |

### Checklist de Validación

- [ ] User mock eliminado de cv-micro
- [ ] Código legacy migrado a `apps/user/`
- [ ] TypeScript > 80%
- [ ] Zustand reemplazó Redux
- [ ] TanStack Query implementado
- [ ] UI Kit reemplazó Material-UI (componentes críticos)
- [ ] Module Federation configurado
- [ ] Shell carga User dinámicamente
- [ ] Auth flow funcionando
- [ ] Tests > 50% coverage
- [ ] Build producción sin warnings

---

## 📈 Conclusiones y Aprendizajes

### ✅ Resultados Esperados

1. **✅ Primera app real migrada**: Valida arquitectura completa
2. **✅ Patrón de migración establecido**: Replicable para Shop/Payment/Editor
3. **✅ Integración Shell ↔ User funcionando**: Demuestra viabilidad
4. **✅ Performance validada**: Bundle size y tiempos de carga

### 🎓 Aprendizajes Técnicos Proyectados

#### 1. Redux → Zustand
```typescript
// ❌ Redux (legacy)
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = { updateUser };
connect(mapStateToProps, mapDispatchToProps)(UserProfile);

// ✅ Zustand (nuevo)
const useUserStore = create((set) => ({
  user: null,
  updateUser: (user) => set({ user }),
}));

function UserProfile() {
  const { user, updateUser } = useUserStore();
}
```

#### 2. API Calls → TanStack Query
```typescript
// ❌ useEffect + fetch (legacy)
useEffect(() => {
  fetch('/api/user').then(res => res.json()).then(setUser);
}, []);

// ✅ TanStack Query (nuevo)
const { data: user, isLoading } = useQuery({
  queryKey: ['user'],
  queryFn: () => apiClient.get('/api/user'),
});
```

#### 3. Material-UI → UI Kit
```typescript
// ❌ Material-UI (legacy)
import { Button } from '@mui/material';

// ✅ UI Kit (nuevo)
import { Button } from '@cv/ui';
```

### 🔧 Decisiones de Diseño

| Decisión | Justificación |
|----------|---------------|
| **User antes que Editor** | App mediana, menos riesgo, valida arquitectura |
| **80% TypeScript mínimo** | Balance migración rápida vs type safety |
| **Zustand sobre Redux** | Menos boilerplate, mejor DX |
| **TanStack Query** | Caching, retry, optimistic updates out-of-the-box |
| **UI Kit progresivo** | No bloquear migración, refactorizar componentes críticos primero |

---

## 🔄 Mejoras Futuras

### Prioridad Alta 🔴
- [ ] Completar TypeScript al 100%
- [ ] Refactorizar todos los componentes a UI Kit
- [ ] E2E tests completos (coverage > 80%)

### Prioridad Media 🟡
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Accessibility audit (axe DevTools)
- [ ] Storybook para componentes User

---

## 🔗 Referencias

### Documentación Interna
- 📝 [Plan de Migración](../../../plan_migracion.md)
- 📖 [Docker Staging Guide](../../../docs/docker-staging-guide.md)
- 🎯 **Epic**: [RC-31191 - Fase 1](https://leadtech.atlassian.net/browse/RC-31191)

### Documentación Externa
- 🔧 [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- 🔧 [Zustand](https://github.com/pmndrs/zustand)
- 🔧 [TanStack Query](https://tanstack.com/query/latest)

### Repos
- **Legacy**: https://bitbucket.org/grupoblidoo/cv-app-user/src/master/
- **Nuevo**: `cv-micro/apps/user/` (post RC-31339)

---

## ⏱️ Story Points: 8 SP

### Justificación (Northstar Framework)
- **Complejidad**: Alta (refactorización completa de app legacy)
- **Incertidumbre**: Media-Alta (posibles dependencias ocultas en legacy)
- **Esfuerzo**: ~6-8 horas
- **Riesgo**: Alto (primera app real migrada)

### Desglose de Esfuerzo

| Tarea | Story Points | Tiempo Estimado |
|-------|--------------|-----------------|
| Migrar código + estructurar | 1 SP | ~1 hora |
| Refactorización TypeScript | 2 SP | ~2 horas |
| Redux → Zustand | 1.5 SP | ~1.5 horas |
| API → TanStack Query | 1.5 SP | ~1.5 horas |
| Module Federation config | 1 SP | ~1 hora |
| Testing + fixes | 1 SP | ~1 hora |
| **TOTAL** | **8 SP** | **~6-8 horas** |

---

## 🔄 Dependencias

### Depende de
- **RC-31339**: Migración repo debe estar completada
- **RC-31342**: Login Real (para testing completo de auth)

### Bloquea
- **RC-31341**: Figma Tokens (necesita User migrada para validar tokens)

### Puede ejecutarse en paralelo con
- RC-31342 (Login) si hay recursos suficientes

---

## 🎉 Estado Final

| Aspecto | Estado |
|---------|--------|
| **Código Migrado** | ⏳ Pendiente |
| **Refactorización Stack** | ⏳ Pendiente |
| **Module Federation** | ⏳ Pendiente |
| **Funcionalidad Core** | ⏳ Pendiente |
| **Integración Shell/Login** | ⏳ Pendiente |
| **Testing** | ⏳ Pendiente |
| **Build & Deploy** | ⏳ Pendiente |

---

**Creado por**: Cursor AI + Alex Mallen  
**Fecha**: 2 Febrero 2026  
**Sprint**: 2026 Q1 S2 - Team Migration  
**Epic**: RC-31191 - Fase 1: Desbloqueo Stack

**🔗 Jira**: https://leadtech.atlassian.net/browse/RC-31340
