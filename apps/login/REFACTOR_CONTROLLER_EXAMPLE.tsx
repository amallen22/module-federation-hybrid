/**
 * EJEMPLO DE REFACTORIZACIÓN: Controller.tsx
 * 
 * Este es un ejemplo de cómo quedaría el Controller refactorizado a React moderno.
 * NO es el código final, solo una guía de referencia.
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import sha1 from 'sha1';
import { amplitude, AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { AuthManager } from '@npm_leadtech/cv-lib-auth';
import { generateChannelContextCookie } from '@npm_leadtech/cv-lib-cookie-channel-context';
import { CookieGeneratorHandler, HandleVisitorUseCase } from '@npm_leadtech/cv-lib-visitor';
import StoragePackage from '@npm_leadtech/cv-storage-js';
import { QueryStringService } from '@npm_leadtech/jsr-lib-http';

import LoadingInitial from './components/Loading/LoadingInitial';
import LoadingLayer from './components/Loading/LoadingLayer';
import PasswordRescue from './components/Password/PasswordRescue';
import PasswordReset from './components/Password/PasswordReset';
import { SignIn } from './components/Signing/SignIn';
import SignOut from './components/Signing/SignOut';
import { SignUp } from './components/Signing/SignUp';
import { API_URL, APP_CONFIG } from './config/appConfig';
import { postAuthToken } from './services/api/authApi';
import { AnalyticsLayer } from './internals/analytics-layer/AnalyticsLayer';
import { forceLoginByCRM } from './services/forceLoginByCRM';
import { FrontLogService } from './services/FrontLogService';
import HandleErrorAuthToken from './services/HandleErrorAuthToken';
import { AppNavigatorService } from './services/NavigatorService/AppNavigatorService';
import { AppRedirectReaderService } from './services/RedirectReaderService/AppRedirectReaderService';
import { SetLanguage } from './services/SetupTranslations';
import { DeepLinkingUseCase } from './usecase/DeepLinkingUseCase';

import '../polyfills';

// ============================================================================
// CONSTANTES Y UTILIDADES
// ============================================================================

const ROUTE = {
    signIn: '#/signin',
    signUp: '#/signup',
    signOut: '#/signout',
    passwordRescue: '#/passwordrescue',
    passwordReset: '__passwordreset'
} as const;

const queryStringService = new QueryStringService();
const cookieGenerator = new CookieGeneratorHandler(API_URL);

// Funciones utilitarias (antes métodos estáticos)
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
    if (typeof window !== 'undefined') {
        const domainItems = window.location.hostname.split('.');
        let position = 1;

        if (domainItems.length === 2) {
            position = 0;
            return '.' + domainItems.slice(position).join('.');
        } else if (domainItems.length < 2) {
            return window.location.hostname;
        }
    }
    return undefined;
};

// Funciones helper puras
const buildStateRequest = (cvSessionStore: any): any => {
    return StoragePackage.Request(
        window.location,
        null,
        cvSessionStore
    );
};

const getHash = (cvSessionStore: any, loadingLinkedIn: string): string => {
    const request = buildStateRequest(cvSessionStore);
    const requestParams = request.getParams();

    if (requestParams && requestParams.hasOwnProperty('idprovider') && requestParams.idprovider === 'linkedin') {
        return loadingLinkedIn;
    }

    return request.hash;
};

const getParams = (cvSessionStore: any): Record<string, any> => {
    return buildStateRequest(cvSessionStore).getParams() || {};
};

const buildAuthManager = (cvSessionStore: any): AuthManager | undefined => {
    const { clientId, userPoolId } = APP_CONFIG.cognitoLoginConfig;

    if (!clientId) {
        return undefined;
    }

    const poolData = {
        UserPoolId: userPoolId,
        ClientId: clientId
    };

    const AmazonCognitoIdentity = {
        CognitoUserPool,
        CognitoUserAttribute,
        CognitoUser,
        AuthenticationDetails,
    };

    return new AuthManager(
        AmazonCognitoIdentity,
        cvSessionStore,
        poolData,
    );
};

const getStateSessionItems = (cvSessionStore: any): { hasAccess: boolean; hasSession: boolean } => {
    return {
        hasAccess: Boolean(cvSessionStore?.get('access')),
        hasSession: Boolean(cvSessionStore?.get('visitor'))
    };
};

// ============================================================================
// INTERFACES
// ============================================================================

interface ControllerProps {
    onSignInWithCognito?: (email: string, password: string) => Promise<any>;
    onSignInWithProvider?: (params: { 
        provider: string; 
        providerToken: string; 
        callback?: () => void; 
        operation?: string 
    }) => Promise<any>;
    onPasswordRescue?: (email: string) => Promise<void>;
    onPasswordReset?: (verificationCode: string, newPassword: string) => Promise<void>;
    isLoading?: boolean;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const Controller: React.FC<ControllerProps> = ({
    onSignInWithCognito,
    onSignInWithProvider,
    onPasswordRescue,
    onPasswordReset,
    isLoading: externalIsLoading
}) => {
    // ========================================================================
    // ESTADO
    // ========================================================================
    const [isLoading, setIsLoading] = useState(true);
    const [flashType, setFlashType] = useState<string | undefined>(undefined);
    const [flashMessage, setFlashMessage] = useState<string | undefined>(undefined);
    const [initialLoading, setInitialLoading] = useState(true);
    const [params, setParams] = useState<Record<string, any>>({});
    const [route, setRoute] = useState<string | undefined>(undefined);
    const [hasAccess, setHasAccess] = useState<boolean | undefined>(undefined);
    const [hasSession, setHasSession] = useState<boolean | undefined>(undefined);

    const app = 'cv-app-login';

    // ========================================================================
    // REFS (Variables privadas persistentes)
    // ========================================================================
    const cookiesStorageRef = useRef<any>(null);
    const cvSessionStoreRef = useRef<any>(null);
    const authManagerRef = useRef<AuthManager | undefined>(undefined);
    const clientIdRef = useRef<string | undefined>(undefined);
    const loadingLinkedInRef = useRef<string>('#/signin');

    // ========================================================================
    // FUNCIONES HELPER
    // ========================================================================

    const flashClean = useCallback((): void => {
        setFlashType(undefined);
        setFlashMessage(undefined);
    }, []);

    const flashDisplayError = useCallback((error: string | Error | any): void => {
        let errorMessage: string;

        if (typeof error === 'string') {
            errorMessage = error;
        } else if (typeof error === 'object' && error.hasOwnProperty('message')) {
            errorMessage = error.message;
        } else {
            errorMessage = JSON.stringify(error);
        }

        setFlashType('flash-error');
        setFlashMessage(errorMessage);
    }, []);

    const startLoading = useCallback((): void => {
        setIsLoading(true);
    }, []);

    const stopLoading = useCallback((): void => {
        setIsLoading(false);
    }, []);

    const navigatePrivately = useCallback((hash: string): void => {
        setRoute(hash);
    }, []);

    const executeWhenAccessTokenPresent = useCallback((): void => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        if (token && email) {
            forceLoginByCRM(token, email);
        }
    }, []);

    const forceRedirectOnSession = useCallback((): void => {
        if (app === 'cv-app-login' && hasAccess && route !== ROUTE.signOut) {
            const navigatorService = new AppNavigatorService(location);
            const redirectReaderService = new AppRedirectReaderService(location.href);
            const deepLinkingUseCase = new DeepLinkingUseCase(navigatorService, redirectReaderService);
            deepLinkingUseCase.invoke();
        }
    }, [hasAccess, route]);

    const onHashChange = useCallback((): void => {
        if (cvSessionStoreRef.current) {
            const newHash = getHash(cvSessionStoreRef.current, loadingLinkedInRef.current);
            setRoute(newHash);
        }
        flashClean();
    }, [flashClean]);

    const attachWindowEvents = useCallback((): void => {
        window.onhashchange = onHashChange;
    }, [onHashChange]);

    // ========================================================================
    // HANDLERS DE AUTENTICACIÓN
    // ========================================================================

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
    }, [onSignInWithProvider, flashClean, flashDisplayError, forceRedirectOnSession]);

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
    }, [onSignInWithCognito, onSignInSuccess, flashDisplayError]);

    const onPasswordRescueSuccess = useCallback((): void => {
        flashClean();
        navigatePrivately(ROUTE.passwordReset);
        setIsLoading(false);
    }, [flashClean, navigatePrivately]);

    const onPasswordResetSuccess = useCallback(async (newPassword: string): Promise<void> => {
        flashClean();
        const email = cvSessionStoreRef.current?.get('user');

        if (email) {
            await new Promise<void>((resolve, reject) => {
                authManagerRef.current?.signIn(
                    email,
                    newPassword,
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
        } else {
            navigatePublicly(ROUTE.signIn);
        }
    }, [flashClean, onSignInSuccess, flashDisplayError]);

    const handlePasswordRescue = useCallback(async (
        email: string,
        onSuccess: () => void,
        onFailure: (error: any) => void
    ): Promise<void> => {
        try {
            if (onPasswordRescue) {
                await onPasswordRescue(email);
                onSuccess();
                setIsLoading(false);
            } else {
                // Fallback to legacy AuthManager
                await new Promise<void>((resolve, reject) => {
                    authManagerRef.current?.rescuePassword(
                        email,
                        () => {
                            onSuccess();
                            setIsLoading(false);
                            resolve();
                        },
                        (error: any) => {
                            onFailure(error);
                            setIsLoading(false);
                            reject(error);
                        }
                    );
                });
            }
        } catch (error: any) {
            onFailure(error);
            setIsLoading(false);
        }
    }, [onPasswordRescue]);

    const handlePasswordReset = useCallback(async (
        verification: string,
        newPassword: string,
        onSuccess: () => void,
        onFailure: (error: any) => void
    ): Promise<void> => {
        try {
            if (onPasswordReset) {
                await onPasswordReset(verification, newPassword);
                onSuccess();
                setIsLoading(false);
            } else {
                // Fallback to legacy AuthManager
                await new Promise<void>((resolve, reject) => {
                    authManagerRef.current?.resetPassword(
                        verification,
                        newPassword,
                        () => {
                            onSuccess();
                            setIsLoading(false);
                            resolve();
                        },
                        (error: any) => {
                            onFailure(error);
                            setIsLoading(false);
                            reject(error);
                        }
                    );
                });
            }
        } catch (error: any) {
            onFailure(error);
            setIsLoading(false);
        }
    }, [onPasswordReset]);

    const onSignOutSuccess = useCallback(async (): Promise<void> => {
        flashClean();
        const sessionItems = getStateSessionItems(cvSessionStoreRef.current);
        setHasAccess(sessionItems.hasAccess);
        setHasSession(sessionItems.hasSession);
        
        cookiesStorageRef.current?.deleteCookie('hash');
        cookiesStorageRef.current?.deleteCookie('previewOrderId');
        cookiesStorageRef.current?.deleteCookie('templatechange');
        cookiesStorageRef.current?.deleteCookie('lastResumeId');
        cvSessionStoreRef.current?.destroy();
        
        // Recargar visitor
        await handleVisitor();
        goUrl(ROUTE.signIn);
    }, [flashClean]);

    const onSignOut = useCallback(async (
        onSuccess: () => void,
        onFailure: (error: any) => void
    ): Promise<void> => {
        try {
            await new Promise<void>((resolve, reject) => {
                authManagerRef.current?.signOut(
                    () => {
                        onSuccess();
                        resolve();
                    },
                    (error: any) => {
                        onFailure(error);
                        reject(error);
                    }
                );
            });
        } catch (error: any) {
            onFailure(error);
        }
    }, []);

    const onSignInErrorHandler = useCallback((err: any, translationParams?: any): void => {
        let error: any;
        if (!err.request) {
            error = err;
        } else {
            error = err.request.response;
        }

        if (typeof error === 'string') {
            error = JSON.parse(error);
        }
        flashDisplayError(error.message, translationParams);
    }, [flashDisplayError]);

    const onError = useCallback((err: any): void => {
        setIsLoading(false);
        flashDisplayError(err);
    }, [flashDisplayError]);

    // ========================================================================
    // HANDLE VISITOR (Inicialización)
    // ========================================================================

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
    }, [attachWindowEvents, executeWhenAccessTokenPresent, forceRedirectOnSession]);

    // ========================================================================
    // EFFECTS
    // ========================================================================

    // Inicialización (equivalente a componentDidMount)
    useEffect(() => {
        // Inicializar AnalyticsLayer una sola vez
        new AnalyticsLayer();
        
        generateChannelContextCookie();
        
        // For some reason amplitude hasn't been initialized at this point
        setTimeout(() => {
            handleVisitor();
        });
    }, [handleVisitor]);

    // Cleanup de event listeners (equivalente a componentWillUnmount)
    useEffect(() => {
        return () => {
            window.onhashchange = null;
        };
    }, []);

    // ========================================================================
    // RENDER HELPERS
    // ========================================================================

    const getContentByHash = useCallback((hash: string): React.ReactElement | null => {
        const search = location.search || '';

        switch (hash) {
            case ROUTE.signUp:
                return (
                    <SignUp
                        prefilledEmail={params.email}
                        stopLoading={stopLoading}
                        onFailure={flashDisplayError}
                        flashMessage={flashMessage}
                        flashType={flashType}
                        flashClean={flashClean}
                        onSignInErrorHandler={onSignInErrorHandler}
                    />
                );
            case ROUTE.signIn:
                return (
                    <SignIn
                        prefilledEmail={params.email}
                        startLoading={startLoading}
                        stopLoading={stopLoading}
                        onFailure={flashDisplayError}
                        flashMessage={flashMessage}
                        flashType={flashType}
                        flashClean={flashClean}
                        clientId={clientIdRef.current}
                        onSignInErrorHandler={onSignInErrorHandler}
                        cognitoLoginConfig={APP_CONFIG.cognitoLoginConfig}
                        onCognitoLogin={handleCognitoLogin}
                    />
                );
            case ROUTE.signOut:
                return (
                    <SignOut
                        onSignOut={onSignOut}
                        onSuccess={onSignOutSuccess}
                    />
                );
            case ROUTE.passwordRescue:
                return (
                    <PasswordRescue
                        startLoading={startLoading}
                        stopLoading={stopLoading}
                        prefilledEmail={isLoading ? null : params.email}
                        onPasswordRescue={handlePasswordRescue}
                        onSuccess={onPasswordRescueSuccess}
                        onFailure={onError}
                        forceLowerCaseEmail={APP_CONFIG.forceLowerCaseEmail || false}
                        flashMessage={flashMessage}
                        flashType={flashType}
                    />
                );
            case ROUTE.passwordReset:
                return (
                    <PasswordReset
                        startLoading={startLoading}
                        stopLoading={stopLoading}
                        onPasswordReset={handlePasswordReset}
                        onSuccess={onPasswordResetSuccess}
                        onFailure={onError}
                        flashMessage={flashMessage}
                        flashType={flashType}
                    />
                );
            default:
                setRoute(ROUTE.signUp);
                history.pushState(null, null, new URL(
                    `https://${location.host}/${search}${ROUTE.signUp}`
                ));
                return null;
        }
    }, [
        params,
        flashMessage,
        flashType,
        isLoading,
        stopLoading,
        startLoading,
        flashDisplayError,
        flashClean,
        onSignInErrorHandler,
        handleCognitoLogin,
        handlePasswordRescue,
        onPasswordRescueSuccess,
        handlePasswordReset,
        onPasswordResetSuccess,
        onSignOut,
        onSignOutSuccess,
        onError
    ]);

    const displayLoading = useMemo((): React.ReactElement | null => {
        if (isLoading || externalIsLoading) {
            return <LoadingLayer />;
        }
        return null;
    }, [isLoading, externalIsLoading]);

    const sendAnalyticsData = useMemo((): React.ReactElement | null => {
        if (isLoading) {
            return null;
        }
        return <AnalyticsLocationChange />;
    }, [isLoading]);

    // ========================================================================
    // RENDER
    // ========================================================================

    if (initialLoading) {
        return <LoadingInitial />;
    }

    return (
        <div>
            {sendAnalyticsData}
            {displayLoading}
            {getContentByHash(route || ROUTE.signUp)}
        </div>
    );
};

export default Controller;

