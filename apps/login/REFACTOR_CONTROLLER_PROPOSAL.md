# Propuesta de Refactorización: Controller.tsx a React Moderno

## 📋 Resumen

Refactorizar `Controller.tsx` de un class component a un functional component moderno usando:
- ✅ Functional components con hooks
- ✅ `useState` para estado
- ✅ `useRef` para variables privadas persistentes
- ✅ `useEffect` para efectos secundarios
- ✅ `useCallback` para funciones memoizadas
- ✅ `async/await` en lugar de `.then()/.catch()`
- ✅ TypeScript estricto

## 🎯 Objetivos

1. **Modernizar el código**: Eliminar class components y usar hooks
2. **Mejorar legibilidad**: async/await es más claro que promesas encadenadas
3. **Mantener compatibilidad**: No romper funcionalidad existente
4. **Mejorar mantenibilidad**: Código más fácil de entender y modificar

## 📐 Estructura Propuesta

### 1. Estado del Componente

**ANTES (Class Component):**
```typescript
interface ControllerState {
    isLoading: boolean;
    app: string;
    flashType?: string;
    flashMessage?: string;
    initialLoading: boolean;
    params: Record<string, any>;
    route?: string;
    hasAccess?: boolean;
    hasSession?: boolean;
}
```

**DESPUÉS (Functional Component con useState):**
```typescript
// Estado principal
const [isLoading, setIsLoading] = useState(true);
const [flashType, setFlashType] = useState<string | undefined>(undefined);
const [flashMessage, setFlashMessage] = useState<string | undefined>(undefined);
const [initialLoading, setInitialLoading] = useState(true);
const [params, setParams] = useState<Record<string, any>>({});
const [route, setRoute] = useState<string | undefined>(undefined);
const [hasAccess, setHasAccess] = useState<boolean | undefined>(undefined);
const [hasSession, setHasSession] = useState<boolean | undefined>(undefined);

// Constante
const app = 'cv-app-login';
```

### 2. Variables Privadas (useRef)

**ANTES:**
```typescript
private cookiesStorage: any;
private cvSessionStore: any;
private authManager: AuthManager | undefined;
private clientId: string | undefined;
private loadingLinkedIn: string = '#/signin';
```

**DESPUÉS:**
```typescript
const cookiesStorageRef = useRef<any>(null);
const cvSessionStoreRef = useRef<any>(null);
const authManagerRef = useRef<AuthManager | undefined>(undefined);
const clientIdRef = useRef<string | undefined>(undefined);
const loadingLinkedInRef = useRef<string>('#/signin');
```

### 3. Métodos Estáticos → Funciones Utilitarias

**ANTES:**
```typescript
static navigatePublicly(hash: string): void {
    location.hash = hash;
}

static goUrl(url: string): void {
    location.assign(url);
}

static getRoute(name: keyof typeof ROUTE): string {
    return ROUTE[name];
}

static getDomain(): string | undefined {
    // ...
}
```

**DESPUÉS:**
```typescript
// Funciones utilitarias exportadas (mantener compatibilidad)
export const navigatePublicly = (hash: string): void => {
    location.hash = hash;
};

export const goUrl = (url: string): void => {
    location.assign(url);
};

export const getRoute = (name: keyof typeof ROUTE): string => {
    return ROUTE[name];
};

export const getDomain = (): string | undefined => {
    // ...
};
```

### 4. componentDidMount → useEffect

**ANTES:**
```typescript
componentDidMount(): void {
    generateChannelContextCookie();
    setTimeout(() => {
        this.handleVisitor();
    });
}
```

**DESPUÉS:**
```typescript
useEffect(() => {
    // Inicializar AnalyticsLayer una sola vez
    new AnalyticsLayer();
    
    generateChannelContextCookie();
    
    // For some reason amplitude hasn't been initialized at this point
    setTimeout(() => {
        handleVisitor();
    });
}, []); // Solo ejecutar al montar
```

### 5. Promesas → async/await

**ANTES:**
```typescript
handleVisitor(): void {
    this.cookiesStorage = StoragePackage.StorageManager();
    
    new HandleVisitorUseCase(...)
    .invoke()
    .then(() => {
        this.cvSessionStore = StoragePackage.sessionStoreCookie({...});
        this.authManager = this.buildAuthManager();
        const language = this.cvSessionStore.getLanguage();
        return SetLanguage(language);
    })
    .then(() => {
        this.setState({...});
        this.attachWindowEvents();
        // ...
    })
    .catch((err: any) => {
        // manejo de errores
    });
}
```

**DESPUÉS:**
```typescript
const handleVisitor = useCallback(async (): Promise<void> => {
    try {
        console.log('[Controller] handleVisitor called');
        cookiesStorageRef.current = StoragePackage.StorageManager();
        
        await new HandleVisitorUseCase(
            queryStringService,
            cookieGenerator,
            cookiesStorageRef.current,
            amplitude.getDeviceId()
        ).invoke();
        
        console.log('[Controller] HandleVisitorUseCase completed');
        cvSessionStoreRef.current = StoragePackage.sessionStoreCookie({
            apiTimeout: 10,
            apiEndpoint: '',
        });
        authManagerRef.current = buildAuthManager(cvSessionStoreRef.current);
        
        const language = cvSessionStoreRef.current.getLanguage();
        console.log('[Controller] Language from sessionStore:', language);
        console.log('[Controller] Calling SetLanguage...');
        
        await SetLanguage(language);
        console.log('[Controller] SetLanguage completed successfully');
        
        setInitialLoading(false);
        setRoute(getHash(cvSessionStoreRef.current, loadingLinkedInRef.current));
        setParams(getParams(cvSessionStoreRef.current));
        setHasAccess(!!cvSessionStoreRef.current.get('access'));
        setHasSession(!!cvSessionStoreRef.current.get('visitor'));
        
        attachWindowEvents();
        executeWhenAccessTokenPresent();
        forceRedirectOnSession();
        setIsLoading(false);
    } catch (err: any) {
        console.error('[Controller] Error in handleVisitor:', err);
        console.error('[Controller] Error message:', err?.message);
        console.error('[Controller] Error stack:', err?.stack);
        console.error('[Controller] Error details:', JSON.stringify(err, null, 2));
        
        // Intentar ejecutar SetLanguage incluso si HandleVisitorUseCase falla
        const language = cvSessionStoreRef.current?.getLanguage?.() || 'en-US';
        console.log('[Controller] Attempting to load translations despite error, language:', language);
        
        try {
            await SetLanguage(language);
        } catch (i18nErr: any) {
            console.error('[Controller] Error loading translations:', i18nErr);
        }
        
        FrontLogService.logAjaxResponse({ 
            className: 'Controller', 
            funcName: 'HandleVisitorUseCase', 
            err 
        });
        
        // Initialize cvSessionStore if not already initialized
        if (!cvSessionStoreRef.current) {
            cvSessionStoreRef.current = StoragePackage.sessionStoreCookie({
                apiTimeout: 10,
                apiEndpoint: '',
            });
        }
        
        setInitialLoading(false);
        setRoute(getHash(cvSessionStoreRef.current, loadingLinkedInRef.current));
        setParams(getParams(cvSessionStoreRef.current));
        setHasAccess(false);
        setHasSession(false);
        forceRedirectOnSession();
    }
}, []);
```

### 6. Métodos de Instancia → Funciones con useCallback

**ANTES:**
```typescript
onSignInSuccess = ({ provider, providerToken, callback, operation }: {...}): void => {
    if (provider && providerToken) {
        this.beforeOnSuccess();
        if (this.props.onSignInWithProvider) {
            this.props.onSignInWithProvider({...})
                .then((result: any) => {
                    // ...
                })
                .catch((err: any) => {
                    // ...
                });
        } else {
            postAuthToken(userPostParams)
                .then(({ authToken, isNewUser, user }) => {
                    // ...
                })
                .catch((err: any) => {
                    // ...
                });
        }
    }
};
```

**DESPUÉS:**
```typescript
const onSignInSuccess = useCallback(async ({
    provider,
    providerToken,
    callback,
    operation
}: {
    provider: string;
    providerToken: string;
    callback?: () => void;
    operation?: string;
}): Promise<void> => {
    if (!provider || !providerToken) {
        setIsLoading(false);
        return;
    }
    
    flashClean();
    
    try {
        if (onSignInWithProvider) {
            console.log('[Controller] Using TanStack Query for sign in with provider:', provider);
            const result = await onSignInWithProvider({ provider, providerToken, callback, operation });
            
            const sessionItems = getStateSessionItems(cvSessionStoreRef.current);
            setHasAccess(sessionItems.hasAccess);
            setHasSession(sessionItems.hasSession);
            
            if (callback && result.isNewUser) {
                callback();
            } else {
                forceRedirectOnSession();
            }
            setIsLoading(false);
        } else {
            // Fallback to direct API call
            console.log('[Controller] Using direct API call for sign in (fallback)');
            const userPostParams: any = {
                provider,
                providerToken
            };
            
            if (operation) {
                userPostParams.operation = operation;
            }
            
            const { authToken, isNewUser, user } = await postAuthToken(userPostParams);
            
            let sha1User = '';
            if (user) {
                sha1User = sha1(user);
            }
            
            cvSessionStoreRef.current?.put('provider', provider);
            cvSessionStoreRef.current?.put('access', authToken);
            cvSessionStoreRef.current?.put('userid', sha1User);
            cvSessionStoreRef.current?.put('user', user || '');
            
            const sessionItems = getStateSessionItems(cvSessionStoreRef.current);
            setHasAccess(sessionItems.hasAccess);
            setHasSession(sessionItems.hasSession);
            
            if (callback && isNewUser) {
                callback();
            } else {
                forceRedirectOnSession();
            }
        }
    } catch (err: any) {
        const handleErrorAuthToken = new HandleErrorAuthToken();
        const errorMessage = handleErrorAuthToken.extractErrorMessage(err);
        flashDisplayError(errorMessage.replace(/^[ A-Za-z0-9]*(: )/, ''));
        setIsLoading(false);
    }
}, [onSignInWithProvider]);
```

## 🔄 Plan de Migración

### Fase 1: Preparación (30 min)
1. Crear funciones utilitarias (navigatePublicly, goUrl, getRoute, getDomain)
2. Extraer funciones helper puras (getHash, getParams, buildAuthManager, buildStateRequest)
3. Crear tipos e interfaces compartidas

### Fase 2: Conversión del Componente (2-3 horas)
1. Convertir estado a useState
2. Convertir variables privadas a useRef
3. Convertir componentDidMount a useEffect
4. Convertir métodos a funciones con useCallback
5. Convertir todas las promesas a async/await

### Fase 3: Testing y Validación (1 hora)
1. Probar todos los flujos de autenticación
2. Verificar que no hay regresiones
3. Verificar que TanStack Query sigue funcionando

## 📝 Ejemplo Completo de Método Convertido

### ANTES:
```typescript
handleCognitoLogin = (email: string, password: string): void => {
    console.log('[Controller] handleCognitoLogin called with email:', email);
    this.startLoading();
    if (this.props.onSignInWithCognito) {
        console.log('[Controller] Using TanStack Query for Cognito login');
        this.props.onSignInWithCognito(email, password)
            .then((result: any) => {
                console.log('[Controller] Cognito login successful, calling onSignInSuccess');
                this.onSignInSuccess({ 
                    provider: 'cognito', 
                    providerToken: result.token 
                });
            })
            .catch((error: any) => {
                console.error('[Controller] Cognito login error:', error);
                this.flashDisplayError(error);
                this.stopLoading();
            });
    } else {
        // Fallback to legacy AuthManager
        console.log('[Controller] Using legacy AuthManager for Cognito login (fallback)');
        this.authManager?.signIn(
            email,
            password,
            (token: string) => this.onSignInSuccess({ provider: 'cognito', providerToken: token }),
            (message: string) => {
                this.stopLoading();
                this.flashDisplayError(message);
            }
        );
    }
};
```

### DESPUÉS:
```typescript
const handleCognitoLogin = useCallback(async (email: string, password: string): Promise<void> => {
    console.log('[Controller] handleCognitoLogin called with email:', email);
    setIsLoading(true);
    
    try {
        if (onSignInWithCognito) {
            console.log('[Controller] Using TanStack Query for Cognito login');
            const result = await onSignInWithCognito(email, password);
            console.log('[Controller] Cognito login successful, calling onSignInSuccess');
            await onSignInSuccess({ 
                provider: 'cognito', 
                providerToken: result.token 
            });
        } else {
            // Fallback to legacy AuthManager
            console.log('[Controller] Using legacy AuthManager for Cognito login (fallback)');
            await new Promise<void>((resolve, reject) => {
                authManagerRef.current?.signIn(
                    email,
                    password,
                    (token: string) => {
                        onSignInSuccess({ provider: 'cognito', providerToken: token })
                            .then(() => resolve())
                            .catch(reject);
                    },
                    (message: string) => {
                        setIsLoading(false);
                        flashDisplayError(message);
                        reject(new Error(message));
                    }
                );
            });
        }
    } catch (error: any) {
        console.error('[Controller] Cognito login error:', error);
        flashDisplayError(error);
        setIsLoading(false);
    }
}, [onSignInWithCognito, onSignInSuccess]);
```

## ⚠️ Consideraciones Importantes

1. **Compatibilidad hacia atrás**: Los métodos estáticos se mantienen como funciones exportadas
2. **Referencias a `this`**: Todas se convierten a refs o closures
3. **setState**: Se reemplaza por setters individuales de useState
4. **Lifecycle methods**: componentDidMount → useEffect, componentWillUnmount → cleanup en useEffect
5. **Event listeners**: Se limpian en el cleanup de useEffect

## 🎯 Beneficios

1. ✅ **Código más moderno**: Sigue las mejores prácticas de React 18+
2. ✅ **Mejor legibilidad**: async/await es más claro que promesas encadenadas
3. ✅ **Mejor rendimiento**: useCallback previene re-renders innecesarios
4. ✅ **Más fácil de testear**: Funciones puras y hooks son más fáciles de testear
5. ✅ **Mejor TypeScript**: Tipado más estricto y mejor inferencia

## 📦 Archivos a Modificar

- `apps/login/src/app/Controller.tsx` - Refactorización completa
- Posiblemente algunos tests si existen

## ✅ Checklist de Validación

- [ ] Todos los flujos de autenticación funcionan
- [ ] TanStack Query sigue funcionando correctamente
- [ ] No hay regresiones en funcionalidad
- [ ] El código compila sin errores TypeScript
- [ ] No hay warnings de React
- [ ] Los métodos estáticos siguen siendo accesibles

