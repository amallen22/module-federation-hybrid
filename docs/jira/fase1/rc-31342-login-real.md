# 🔐 Migración y Refactorización de cv-app-login Real - Tech Story

## 📋 Información de la Tarea

**Key**: [RC-31342](https://leadtech.atlassian.net/browse/RC-31342)  
**Tipo**: Tech Story (Historia Técnica)  
**Epic**: [RC-31191] Fase 1: Desbloqueo del Stack Tecnológico  
**Sprint**: 2026 Q1 S2 - Team Migration (26 Ene - 6 Feb)  
**Story Points**: 8 SP  
**Labels**: `authentication`, `cognito`, `frontend`, `migration`, `module-federation`, `react`, `refactoring`, `typescript`, `vite`, `tech-story`, `Team1`  
**Estado**: ⏳ Pendiente  
**Fecha Creación**: 2 Febrero 2026

---

## 🎯 Hipótesis

**Como equipo CV**, necesitamos reemplazar la aplicación Login mock del proyecto `cv-hibrid` con la aplicación Login real del legacy (`/home/amallen/www/cv/cv-environment-local/workspace/cv-app-login`), **para poder**:

- ✅ Tener el flujo de autenticación completo funcionando en Module Federation
- ✅ Validar la migración de lógica crítica de negocio (Cognito, JWT, etc.)
- ✅ Desbloquear testing de apps autenticadas (User, Shop, Payment)
- ✅ Establecer patrón de refactorización completa para apps futuras

### 💡 Hipótesis Central

> Migrar Login **early** (antes que Shop/Payment) permitirá validar la arquitectura con un módulo crítico pero menos complejo que el Editor, detectando el 80% de los bloqueadores de autenticación/autorización antes de migrar apps más grandes.

### 🤔 Problema a Resolver

La app Login actual en `cv-hibrid` es un mock placeholder. Necesitamos la app Login real del legacy para:

**Gap identificado**:
- ❌ Login mock no tiene lógica de autenticación real (Cognito, JWT)
- ❌ Sin forma de testing apps autenticadas (User, Shop, etc.)
- ❌ Login es **critical path**: bloquea todas las funcionalidades del resto de apps
- ❌ Stack legacy incompatible con Module Federation

---

## 📋 Descripción de la Implementación

Eliminar la aplicación Login mock actual de `cv-micro/apps/login/` y reemplazarla con la aplicación Login real del legacy, refactorizándola para cumplir con los fundamentos del proyecto: Vite 6, Module Federation, React 18.3+, TypeScript, Zustand, TanStack Query.

**Contexto**:
- App origen: `/home/amallen/www/cv/cv-environment-local/workspace/cv-app-login` (legacy local)
- App actual: `cv-micro/apps/login/` (mock/placeholder)
- Destino final: `cv-micro/apps/login/` (app real refactorizada)
- Port asignado: `5003`
- **Critical path**: Login es la puerta de entrada, bloquea todas las apps autenticadas

**Incluye**:
- Eliminar Login mock actual
- Migrar código real desde cv-environment-local
- Refactorizar a stack moderno (TypeScript, Zustand, TanStack Query)
- Configurar Module Federation
- Integración con Shell y User apps
- Migrar lógica de autenticación (Cognito, JWT, etc.)
- Usar `@npm_leadtech/cv-ui-kit` para componentes UI

---

## ✅ Acceptance Criteria

### AC1: Login Mock Eliminado
- [ ] App login mock actual removida de `cv-micro/apps/login/`
- [ ] Historial Git preservado (squash commits si necesario)
- [ ] Referencias a login mock eliminadas de Shell

### AC2: Código Migrado y Estructurado
- [ ] Todo el código de cv-app-login legacy en `cv-micro/apps/login/`
- [ ] Estructura adaptada a monorepo (`src/`, `public/`, `tests/`)
- [ ] `package.json` configurado correctamente
- [ ] Dependencies actualizadas (React 18.3+, TypeScript 5+)

### AC3: Refactorización Completa
- [ ] Migración JS → TypeScript (100% tipado)
- [ ] Redux → Zustand (state management)
- [ ] Llamadas API → TanStack Query hooks
- [ ] Material-UI → `@npm_leadtech/cv-ui-kit` (componentes UI)
- [ ] Vite 6 configurado con Module Federation

### AC4: Module Federation Configurado
- [ ] `vite.config.ts` con plugin `@originjs/vite-plugin-federation`
- [ ] Exports: LoginForm, AuthContext, useAuth, routes
- [ ] Remote configurado en Shell app
- [ ] Port 5003 funcionando

### AC5: Funcionalidad Core Preservada
- [ ] Login con email/password funcionando
- [ ] Integración con Cognito/Auth provider
- [ ] JWT tokens manejados correctamente
- [ ] Redirects post-login a Shell
- [ ] Logout funcionando

### AC6: Integración con Shell y User
- [ ] Login accesible desde Shell en `/login`
- [ ] Auth state compartido (Zustand)
- [ ] Protected routes en User verifican autenticación
- [ ] Flujo completo: Login → Shell → User

### AC7: Testing Completo
- [ ] Tests unitarios de componentes (Vitest)
- [ ] Tests de integración auth flow
- [ ] E2E: Login → redirect → User
- [ ] Coverage > 60%

---

## 🧪 Testing

### Tests Manuales

#### 1. Login Flow Básico
```bash
# Levantar entorno local
cd cv-micro
pnpm dev

# Abrir https://local.resumecoach.com/login
# Ingresar credenciales válidas
# Verificar redirect a Shell (/)
```

#### 2. Auth State Persistente
```bash
# Login exitoso
# Cerrar pestaña
# Abrir nueva pestaña → https://local.resumecoach.com/user
# Debe estar autenticado (no redirigir a /login)
```

#### 3. Protected Routes
```bash
# Sin login, acceder a https://local.resumecoach.com/user
# Debe redirigir a /login con returnUrl=/user
# Después de login, debe volver a /user
```

#### 4. Logout
```bash
# Login → Dashboard → Click Logout
# Debe limpiar token y redirigir a /login
```

### Tests E2E (Playwright)

```typescript
test('Flujo completo de autenticación', async ({ page }) => {
  // Acceder a ruta protegida sin login
  await page.goto('https://local.resumecoach.com/user');
  await expect(page).toHaveURL(/.*login/);
  
  // Login
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="login-button"]');
  
  // Redirect a Shell
  await expect(page).toHaveURL('https://local.resumecoach.com/');
  
  // Navegar a User (autenticado)
  await page.goto('https://local.resumecoach.com/user');
  await expect(page.locator('[data-testid="user-profile"]')).toBeVisible();
  
  // Logout
  await page.click('[data-testid="logout-button"]');
  await expect(page).toHaveURL(/.*login/);
  
  // Verificar no autenticado
  await page.goto('https://local.resumecoach.com/user');
  await expect(page).toHaveURL(/.*login/);
});
```

### Casos Edge

| Caso Edge | Comportamiento Esperado |
|-----------|-------------------------|
| Login mientras ya autenticado | Redirect directo a Shell/returnUrl |
| Token expirado | Refresh automático con refresh token |
| Network error durante login | Error handling + retry con TanStack Query |
| CORS issues en Module Federation | Error boundary + fallback message |
| Credenciales inválidas | Error mensaje claro en UI |
| Refresh token expirado | Redirect a login forzando re-login |

### Checklist de Validación

- [ ] Login mock eliminado completamente
- [ ] Código legacy migrado a `apps/login/`
- [ ] TypeScript al 100%
- [ ] Zustand reemplazó Redux
- [ ] TanStack Query implementado
- [ ] Module Federation configurado
- [ ] Shell carga Login dinámicamente
- [ ] Auth flow completo funcionando
- [ ] Tests > 60% coverage
- [ ] Build producción sin warnings

---

## 📈 Conclusiones y Aprendizajes

### ✅ Resultados Esperados

1. **✅ Critical path desbloqueado**: Apps autenticadas pueden testearse
2. **✅ Auth architecture validada**: JWT + Cognito + Module Federation
3. **✅ Patrón de refactorización probado**: Listo para aplicar a otras apps
4. **✅ Security baseline**: Auth flow seguro implementado

### 🎓 Aprendizajes Técnicos Proyectados

#### 1. Cognito Integration con Module Federation

```typescript
// apps/login/src/auth/cognito.ts
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
});

export const login = async (email: string, password: string) => {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });
  
  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (session) => resolve(session),
      onFailure: (err) => reject(err),
    });
  });
};
```

#### 2. Auth State con Zustand (Compartido Shell ↔ User)

```typescript
// packages/stores/src/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const session = await cognitoLogin(email, password);
        set({
          user: session.user,
          token: session.accessToken,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);
```

#### 3. Protected Routes con Redirects

```typescript
// apps/user/src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@cv/stores';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to={`/login?returnUrl=${location.pathname}`} replace />;
  }
  
  return children;
};
```

#### 4. JWT Refresh Token Strategy

```typescript
// packages/api/src/interceptors.ts
import { useAuthStore } from '@cv/stores';

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { refreshToken } = useAuthStore.getState();
      try {
        const newToken = await refreshAccessToken(refreshToken);
        useAuthStore.setState({ token: newToken });
        // Retry original request
        return apiClient.request(error.config);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

#### 5. UI Components con cv-ui-kit

```typescript
// apps/login/src/components/LoginForm.tsx
import { Button, Textfield, Card } from '@npm_leadtech/cv-ui-kit';
import '@npm_leadtech/cv-ui-kit/styles';

export const LoginForm = () => {
  const { login } = useAuthStore();
  
  return (
    <Card>
      <Textfield placeholder="Email" type="email" />
      <Textfield placeholder="Password" type="password" />
      <Button variant="primary" onClick={handleLogin}>
        Login
      </Button>
    </Card>
  );
};
```

### 🔧 Decisiones de Diseño

| Decisión | Justificación |
|----------|---------------|
| **Login early (antes que Shop)** | Critical path, desbloquea testing de todas las apps autenticadas |
| **Zustand persistente** | Auth state sobrevive page refresh |
| **JWT + Refresh token** | Security best practice, sessions largas sin comprometer seguridad |
| **Cognito** | Ya está integrado en legacy, evita cambiar auth provider |
| **Protected routes HOC** | Patrón reusable para User, Shop, Payment, Editor |
| **cv-ui-kit para UI** | Librería externa, componentes consistentes y versionados |

---

## 🔄 Mejoras Futuras

### Prioridad Alta 🔴
- [ ] MFA (Multi-Factor Authentication) support
- [ ] Remember me functionality
- [ ] Social login (Google, Apple)

### Prioridad Media 🟡
- [ ] Password reset flow completo
- [ ] Email verification flow
- [ ] Session timeout warnings

### Prioridad Baja 🟢
- [ ] Biometric authentication (Face ID, Touch ID)
- [ ] SSO (Single Sign-On) para enterprise

---

## 🔗 Referencias

### Documentación Interna
- 📝 [Plan de Migración](../../../plan_migracion.md)
- 📖 [Docker Staging Guide](../../../docs/docker-staging-guide.md)
- 🎯 **Epic**: [RC-31191 - Fase 1](https://leadtech.atlassian.net/browse/RC-31191)

### Documentación Externa
- 🔧 [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- 🔐 [AWS Cognito SDK](https://github.com/aws-amplify/amplify-js/tree/main/packages/amazon-cognito-identity-js)
- 🔧 [Zustand Persist Middleware](https://github.com/pmndrs/zustand#persist-middleware)
- 🔐 [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

### Repos
- **Legacy**: `/home/amallen/www/cv/cv-environment-local/workspace/cv-app-login`
- **Nuevo**: `cv-micro/apps/login/` (post RC-31339)
- **UI Kit**: https://bitbucket.org/grupoblidoo/cv-ui-kit/src/master/ (librería externa)

---

## ⏱️ Story Points: 8 SP

### Justificación (Northstar Framework)
- **Complejidad**: Alta (refactorización completa + auth crítico)
- **Incertidumbre**: Media-Alta (lógica de autenticación compleja)
- **Esfuerzo**: ~6-8 horas
- **Riesgo**: Alto (Login es critical path, bloquea todo)

### Desglose de Esfuerzo

| Tarea | Story Points | Tiempo Estimado |
|-------|--------------|-----------------|
| Eliminar mock + migrar código | 1 SP | ~1 hora |
| Refactorización TypeScript + Zustand | 2.5 SP | ~2.5 horas |
| TanStack Query + API calls | 1.5 SP | ~1.5 horas |
| Module Federation config | 1 SP | ~1 hora |
| Testing + fixes auth | 2 SP | ~2 horas |
| **TOTAL** | **8 SP** | **~6-8 horas** |

---

## 🔄 Dependencias

### Depende de
- **RC-31339**: Migración repo debe estar completada
- Repo `cv-micro` disponible
- Shell app funcionando

### Bloquea
- Todas las apps que requieren autenticación (User, Shop, Payment, Editor)
- Testing E2E completo del flujo
- Deployment a staging/producción

### Puede ejecutarse en paralelo con
- **RC-31340** (User integration) - si hay recursos suficientes

---

## 🔐 Consideraciones de Seguridad

| Aspecto | Implementación |
|---------|----------------|
| **Credentials** | No hardcodear, usar `.env.local` |
| **JWT Storage** | `httpOnly` cookies > localStorage (evita XSS) |
| **Token Expiration** | Access token: 15 min, Refresh token: 7 días |
| **HTTPS** | Obligatorio en producción |
| **CORS** | Restrictivo, solo dominios permitidos |
| **XSS Protection** | Sanitizar inputs, CSP headers |
| **CSRF Protection** | CSRF tokens en formularios |

---

## 🎉 Estado Final

| Aspecto | Estado |
|---------|--------|
| **Login Mock Eliminado** | ⏳ Pendiente |
| **Código Migrado** | ⏳ Pendiente |
| **Refactorización Stack** | ⏳ Pendiente |
| **Module Federation** | ⏳ Pendiente |
| **Funcionalidad Core** | ⏳ Pendiente |
| **Integración Shell/User** | ⏳ Pendiente |
| **Testing** | ⏳ Pendiente |

---

**Creado por**: Cursor AI + Alex Mallen  
**Fecha**: 2 Febrero 2026  
**Sprint**: 2026 Q1 S2 - Team Migration  
**Epic**: RC-31191 - Fase 1: Desbloqueo Stack

**🔗 Jira**: https://leadtech.atlassian.net/browse/RC-31342
