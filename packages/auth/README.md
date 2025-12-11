# @packages/auth

Package compartido para gestión de autenticación en el monorepo CV-Hibrid.

## Características

- ✅ **Zustand con persist**: Estado de autenticación persistido en localStorage
- ✅ **Compartido entre apps**: Funciona en todos los microfrontends
- ✅ **TypeScript**: Tipado completo
- ✅ **Modular**: Fácil de extender y reutilizar
- ✅ **Mock data**: Soporte para datos ficticios durante desarrollo

## Instalación

El package ya está configurado en el workspace. Para usarlo en una app:

```json
{
  "dependencies": {
    "@packages/auth": "workspace:*"
  }
}
```

## Uso Básico

### En apps/login (después del login exitoso)

```tsx
import { useAuth, loginWithEmail } from '@packages/auth';

function LoginComponent() {
  const { setAuth, setLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user, token } = await loginWithEmail(email, password);
      setAuth({
        user,
        token,
        provider: 'cognito',
      });
      
      // Redirigir a user app
      window.location.href = '/user';
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return <button onClick={() => handleLogin('user@example.com', 'password')}>Login</button>;
}
```

### En apps/user (leer datos de autenticación)

```tsx
import { useAuth } from '@packages/auth';

function UserDashboard() {
  const { user, isAuthenticated, token } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <p>Token: {token}</p>
    </div>
  );
}
```

## API

### Hooks

- `useAuth()` - Hook principal con todo el estado y acciones
- `useIsAuthenticated()` - Solo verifica si está autenticado
- `useUser()` - Solo obtiene el usuario actual
- `useAuthToken()` - Solo obtiene el token

### Servicios

- `loginWithEmail(email, password)` - Login con email/password
- `loginWithProvider(provider, token)` - Login con Google/LinkedIn
- `signUpWithEmail(email, password)` - Registro
- `logout()` - Cerrar sesión
- `initializeFromLegacySession(data)` - Migrar desde cookies legacy

### Store

- `useAuthStore()` - Acceso directo al store de Zustand

## Persistencia

El estado se guarda automáticamente en `localStorage` con la clave `cv-auth-storage`.

**Datos persistidos:**
- `isAuthenticated`
- `user`
- `token`
- `provider`
- `userId`

**No se persiste:**
- `isLoading` (estado temporal)

## Migración desde Cookies Legacy

Si necesitas migrar desde el sistema de cookies actual:

```tsx
import { initializeFromLegacySession } from '@packages/auth';
import StoragePackage from '@npm_leadtech/cv-storage-js';

// En el componente de login
useEffect(() => {
  const cvSessionStore = StoragePackage.sessionStoreCookie({
    apiTimeout: 10,
    apiEndpoint: '',
  });
  
  initializeFromLegacySession({
    access: cvSessionStore.get('access'),
    user: cvSessionStore.get('user'),
    userid: cvSessionStore.get('userid'),
    provider: cvSessionStore.get('provider'),
  });
}, []);
```

## Mock Data

Para desarrollo, el package incluye funciones para crear usuarios ficticios:

```tsx
import { createMockUser } from '@packages/auth';

const mockUser = createMockUser('user@example.com', {
  firstName: 'John',
  lastName: 'Doe',
});
```

## Estructura

```
packages/auth/
├── src/
│   ├── stores/
│   │   └── authStore.ts        # Zustand store con persist
│   ├── hooks/
│   │   └── useAuth.ts          # Hooks de React
│   ├── services/
│   │   └── authService.ts      # Servicios de autenticación
│   ├── types/
│   │   └── auth.types.ts       # Tipos TypeScript
│   └── index.ts                 # Exports principales
└── package.json
```

## Próximos Pasos

Cuando el backend esté listo, reemplazar las funciones mock en `authService.ts` con llamadas reales a la API.

