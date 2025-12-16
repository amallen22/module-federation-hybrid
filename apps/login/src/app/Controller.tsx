/* eslint-disable no-prototype-builtins */
// Polyfills DEBEN ser el primer import (side-effect import)
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import sha1 from 'sha1';
import { amplitude, AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { FavIconInjector } from '@npm_leadtech/cv-lib-app-config';
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
import { useAuthActions } from './hooks/queries/useAuthActions';

import '../polyfills';

// ============================================================================
// SETUP INICIAL
// ============================================================================

function setupFavIcons() {
    const favIconInjector = new FavIconInjector({
        localizationDataStore: APP_CONFIG,
    });
    favIconInjector.injectFavIcons();
}

setupFavIcons();

// ============================================================================
// CONSTANTES Y UTILIDADES
// ============================================================================

const ROUTE = {
    signIn: '#/signin',
    signUp: '#/signup',
    signOut: '#/signout',
    passwordRescue: '#/passwordrescue',
    passwordReset: '__passwordreset' // not accessible by url
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
    onSignInWithProvider?: (params: { provider: string; providerToken: string; callback?: () => void; operation?: string }) => Promise<any>;
    onPasswordRescue?: (email: string) => Promise<void>;
    onPasswordReset?: (verificationCode: string, newPassword: string) => Promise<void>;
    isLoading?: boolean;
}

interface PasswordRescueHandler {
    (email: string, onSuccess: () => void, onFailure: (error: any) => void): void | Promise<void>;
}

interface PasswordResetHandler {
    (verification: string, newPassword: string, onSuccess: () => void, onFailure: (error: any) => void): void | Promise<void>;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const Controller: React.FC<ControllerProps> = ({
    onSignInWithCognito,
    onSignInWithProvider,
    onPasswordRescue: onPasswordRescueProp,
    onPasswordReset: onPasswordResetProp,
    isLoading: externalIsLoading
}) => {
    // ========================================================================
    // ESTADO
    // ========================================================================
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [app] = useState<string>('cv-app-login');
    const [flashType, setFlashType] = useState<string | undefined>(undefined);
    const [flashMessage, setFlashMessage] = useState<string | undefined>(undefined);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [params, setParams] = useState<Record<string, any>>({});
    const [route, setRoute] = useState<string | undefined>(undefined);
    const [hasAccess, setHasAccess] = useState<boolean | undefined>(undefined);
    const [hasSession, setHasSession] = useState<boolean | undefined>(undefined);

    // ========================================================================
    // REFS (variables privadas del class component)
    // ========================================================================
    const cookiesStorageRef = useRef<any>(null);
    const cvSessionStoreRef = useRef<any>(null);
    const authManagerRef = useRef<AuthManager | undefined>(undefined);
    const clientIdRef = useRef<string | undefined>(undefined);
    const loadingLinkedInRef = useRef<string>('#/signin');

    // ========================================================================
    // HELPERS DE ESTADO
    // ========================================================================
    const startLoading = useCallback((): void => {
        setIsLoading(true);
    }, []);

    const stopLoading = useCallback((): void => {
        setIsLoading(false);
    }, []);

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

    const navigatePrivately = useCallback((hash: string): void => {
        setRoute(hash);
    }, []);

    const beforeOnSuccess = useCallback((): void => {
        flashClean();
    }, [flashClean]);

    // ========================================================================
    // FUNCIONES DE NAVEGACIÓN Y ROUTING
    // ========================================================================
    const handleContent = useCallback((hash: string): void => {
        setRoute(hash);
    }, []);

    const onHashChange = useCallback((): void => {
        // Cuando se dispara hashchange, leer directamente del hash de la URL
        // en lugar de desde el sessionStore
        let urlHash = location.hash || '#/signup';
        
        // Normalizar el hash para que coincida con el formato de ROUTE (#/signin, #/signup, etc.)
        if (!urlHash.startsWith('#/')) {
            // Si el hash es #signin, convertirlo a #/signin
            urlHash = urlHash.replace(/^#([^/])/, '#/$1');
        }
        
        // Validar que el hash sea una ruta válida, si no, usar signup por defecto
        const validHashes = Object.values(ROUTE);
        if (!validHashes.includes(urlHash)) {
            urlHash = ROUTE.signUp;
        }
        
        console.log('[Controller] Hash changed to:', urlHash);
        handleContent(urlHash);
        flashClean();
    }, [handleContent, flashClean]);

    const attachWindowEvents = useCallback((): void => {
        window.onhashchange = () => onHashChange();
    }, [onHashChange]);

    const forceRedirectOnSession = useCallback((): void => {
        if (app === 'cv-app-login' && hasAccess && route !== ROUTE.signOut) {
            const navigatorService = new AppNavigatorService(location);
            const redirectReaderService = new AppRedirectReaderService(location.href);
            const deepLinkingUseCase = new DeepLinkingUseCase(navigatorService, redirectReaderService);

            deepLinkingUseCase.invoke();
        }
    }, [app, hasAccess, route]);

    const executeWhenAccessTokenPresent = useCallback((): void => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        if (token && email) {
            forceLoginByCRM(token, email);
        }
    }, []);

    // ========================================================================
    // MANEJO DE VISITOR Y SETUP INICIAL
    // ========================================================================
    const handleVisitor = useCallback(async (): Promise<void> => {
        console.log('[Controller] handleVisitor called');
        
        try {
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
            clientIdRef.current = APP_CONFIG.cognitoLoginConfig.clientId;

            const language = cvSessionStoreRef.current.getLanguage();
            console.log('[Controller] Language from sessionStore:', language);
            console.log('[Controller] Calling SetLanguage...');

            await SetLanguage(language);
            console.log('[Controller] SetLanguage completed successfully');

            const currentHash = getHash(cvSessionStoreRef.current, loadingLinkedInRef.current);
            const currentParams = getParams(cvSessionStoreRef.current);
            const sessionItems = getStateSessionItems(cvSessionStoreRef.current);

            setInitialLoading(false);
            setRoute(currentHash);
            setParams(currentParams);
            setHasAccess(sessionItems.hasAccess);
            setHasSession(sessionItems.hasSession);

            attachWindowEvents();
            executeWhenAccessTokenPresent();
            forceRedirectOnSession();
            stopLoading();
        } catch (err: any) {
            console.error('[Controller] Error in handleVisitor:', err);
            console.error('[Controller] Error message:', err?.message);
            console.error('[Controller] Error stack:', err?.stack);
            console.error('[Controller] Error details:', JSON.stringify(err, null, 2));

            // Intentar ejecutar SetLanguage incluso si HandleVisitorUseCase falla
            // para que las traducciones se carguen
            const language = cvSessionStoreRef.current?.getLanguage?.() || 'en-US';
            console.log('[Controller] Attempting to load translations despite error, language:', language);
            
            try {
                await SetLanguage(language);
            } catch (i18nErr: any) {
                console.error('[Controller] Error loading translations:', i18nErr);
            }

            FrontLogService.logAjaxResponse({ className: 'Controller', funcName: 'HandleVisitorUseCase', err });

            // Initialize cvSessionStore if not already initialized
            if (!cvSessionStoreRef.current) {
                cvSessionStoreRef.current = StoragePackage.sessionStoreCookie({
                    apiTimeout: 10,
                    apiEndpoint: '',
                });
            }

            const currentHash = getHash(cvSessionStoreRef.current, loadingLinkedInRef.current);
            const currentParams = getParams(cvSessionStoreRef.current);

            setInitialLoading(false);
            setRoute(currentHash);
            setParams(currentParams);
            setHasAccess(false);
            setHasSession(false);
            forceRedirectOnSession();
        }
    }, [attachWindowEvents, executeWhenAccessTokenPresent, forceRedirectOnSession, stopLoading]);

    // ========================================================================
    // MANEJO DE AUTENTICACIÓN
    // ========================================================================
    const onSignInSuccess = useCallback(async ({ provider, providerToken, callback, operation }: {
        provider: string;
        providerToken: string;
        callback?: () => void;
        operation?: string;
    }): Promise<void> => {
        if (!provider || !providerToken) {
            stopLoading();
            return;
        }

        beforeOnSuccess();

        try {
            // Use TanStack Query hook if available, otherwise fallback to direct API call
            if (onSignInWithProvider) {
                console.log('[Controller] Using TanStack Query for sign in with provider:', provider);
                const result: any = await onSignInWithProvider({ provider, providerToken, callback, operation });
                
                const sessionItems = getStateSessionItems(cvSessionStoreRef.current);
                setHasAccess(sessionItems.hasAccess);
                setHasSession(sessionItems.hasSession);

                if (callback && result.isNewUser) {
                    callback();
                } else {
                    // Redirect to /user after successful login
                    // The auth state is already saved in the shared store by useAuthActions
                    window.location.href = '/user';
                }
                stopLoading();
            } else {
                // Fallback to direct API call
                console.log('[Controller] Using direct API call for sign in (fallback)');
                const userPostParams: any = {
                    provider: provider,
                    providerToken: providerToken
                };

                if (operation) {
                    userPostParams.operation = operation;
                }

                const { authToken, isNewUser, user } = await postAuthToken(userPostParams);
                let sha1User = '';

                if (user) {
                    sha1User = sha1(user);
                }

                cvSessionStoreRef.current.put('provider', provider);
                cvSessionStoreRef.current.put('access', authToken);
                cvSessionStoreRef.current.put('userid', sha1User);
                cvSessionStoreRef.current.put('user', user || '');

                const sessionItems = getStateSessionItems(cvSessionStoreRef.current);
                setHasAccess(sessionItems.hasAccess);
                setHasSession(sessionItems.hasSession);

                if (callback && isNewUser) {
                    callback();
                } else {
                    // Redirect to /user after successful login
                    // The auth state is already saved in the shared store by useAuthActions
                    window.location.href = '/user';
                }
            }
        } catch (err: any) {
            const handleErrorAuthToken = new HandleErrorAuthToken();
            const errorMessage = handleErrorAuthToken.extractErrorMessage(err);
            flashDisplayError(errorMessage.replace(/^[ A-Za-z0-9]*(: )/, ''));
            stopLoading();
        }
    }, [onSignInWithProvider, beforeOnSuccess, stopLoading, flashDisplayError, forceRedirectOnSession]);

    const handleCognitoLogin = useCallback(async (email: string, password: string): Promise<void> => {
        console.log('[Controller] handleCognitoLogin called with email:', email);
        startLoading();

        try {
            if (onSignInWithCognito) {
                console.log('[Controller] Using TanStack Query for Cognito login');
                const result: any = await onSignInWithCognito(email, password);
                console.log('[Controller] Cognito login successful, result:', result);
                
                // signInWithCognito already saves to session and auth store, just redirect
                const sessionItems = getStateSessionItems(cvSessionStoreRef.current);
                setHasAccess(sessionItems.hasAccess);
                setHasSession(sessionItems.hasSession);
                
                stopLoading();
                
                // Redirect to /user after successful login
                console.log('[Controller] Redirecting to /user');
                window.location.href = '/user';
            } else {
                // Fallback to legacy AuthManager
                console.log('[Controller] Using legacy AuthManager for Cognito login (fallback)');
                authManagerRef.current?.signIn(
                    email,
                    password,
                    (token: string) => onSignInSuccess({ provider: 'cognito', providerToken: token }),
                    (message: string) => {
                        stopLoading();
                        flashDisplayError(message);
                    }
                );
            }
        } catch (error: any) {
            console.error('[Controller] Cognito login error:', error);
            flashDisplayError(error.message || error);
            stopLoading();
        }
    }, [onSignInWithCognito, startLoading, stopLoading, flashDisplayError, onSignInSuccess]);

    const onPasswordRescue: PasswordRescueHandler = useCallback(async (email: string, onSuccess: () => void, onFailure: (error: any) => void): Promise<void> => {
        try {
            if (onPasswordRescueProp) {
                await onPasswordRescueProp(email);
                onSuccess();
                stopLoading();
            } else {
                // Fallback to legacy AuthManager
                authManagerRef.current?.rescuePassword(email, onSuccess, onFailure);
            }
        } catch (error) {
            onFailure(error);
            stopLoading();
        }
    }, [onPasswordRescueProp, stopLoading]);

    const onPasswordReset: PasswordResetHandler = useCallback(async (verification: string, newPassword: string, onSuccess: () => void, onFailure: (error: any) => void): Promise<void> => {
        try {
            if (onPasswordResetProp) {
                await onPasswordResetProp(verification, newPassword);
                onSuccess();
                stopLoading();
            } else {
                // Fallback to legacy AuthManager
                authManagerRef.current?.resetPassword(
                    verification,
                    newPassword,
                    onSuccess,
                    onFailure
                );
            }
        } catch (error) {
            onFailure(error);
            stopLoading();
        }
    }, [onPasswordResetProp, stopLoading]);

    const onPasswordRescueSuccess = useCallback((): void => {
        beforeOnSuccess();
        navigatePrivately(ROUTE.passwordReset);
        stopLoading();
    }, [beforeOnSuccess, navigatePrivately, stopLoading]);

    const onPasswordResetSuccess = useCallback(async (newPassword: string): Promise<void> => {
        beforeOnSuccess();
        const email = cvSessionStoreRef.current?.get('user');

        if (email && authManagerRef.current) {
            authManagerRef.current.signIn(
                email,
                newPassword,
                (token: string) => onSignInSuccess({ provider: 'cognito', providerToken: token }),
                (message: string) => {
                    stopLoading();
                    flashDisplayError(message);
                }
            );
        } else {
            navigatePublicly(ROUTE.signIn);
        }
    }, [beforeOnSuccess, stopLoading, flashDisplayError, onSignInSuccess]);

    const onSignOutSuccess = useCallback(async (): Promise<void> => {
        beforeOnSuccess();
        const sessionItems = getStateSessionItems(cvSessionStoreRef.current);
        setHasAccess(sessionItems.hasAccess);
        setHasSession(sessionItems.hasSession);

        cookiesStorageRef.current.deleteCookie('hash');
        cookiesStorageRef.current.deleteCookie('previewOrderId');
        cookiesStorageRef.current.deleteCookie('templatechange');
        cookiesStorageRef.current.deleteCookie('lastResumeId');
        cvSessionStoreRef.current.destroy();

        await handleVisitor();
        goUrl(ROUTE.signIn);
    }, [beforeOnSuccess, handleVisitor]);

    const onSignOut = useCallback((onSuccess: () => void, onFailure: (error: any) => void): void => {
        authManagerRef.current?.signOut(onSuccess, onFailure);
    }, []);

    const onSignInErrorHandler = useCallback((err: any): void => {
        let error: any;
        if (!err.request) error = err;
        else error = err.request.response;

        if (typeof error === 'string') {
            error = JSON.parse(error);
        }
        flashDisplayError(error.message || error);
    }, [flashDisplayError]);

    const onError = useCallback((err: any): void => {
        stopLoading();
        flashDisplayError(err);
    }, [stopLoading, flashDisplayError]);

    // ========================================================================
    // RENDERIZADO DE CONTENIDO
    // ========================================================================
    const getContentByHash = useCallback((hash: string): React.ReactElement | null => {
        let content: React.ReactElement | null = null;
        const search = location.search || '';

        switch (hash) {
            case ROUTE.signUp:
                content =
                    <SignUp
                        prefilledEmail={params.email}
                        stopLoading={stopLoading}
                        onFailure={flashDisplayError}
                        flashMessage={flashMessage}
                        flashType={flashType}
                        flashClean={flashClean}
                        onSignInErrorHandler={onSignInErrorHandler}
                    />;
                break;
            case ROUTE.signIn:
                content =
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
                    />;
                break;
            case ROUTE.signOut:
                content =
                    <SignOut
                        onSignOut={onSignOut}
                        onSuccess={onSignOutSuccess}
                    />;
                break;
            case ROUTE.passwordRescue:
                content =
                    <PasswordRescue
                        startLoading={startLoading}
                        stopLoading={stopLoading}
                        prefilledEmail={isLoading ? undefined : params.email}
                        onPasswordRescue={onPasswordRescue}
                        onSuccess={onPasswordRescueSuccess}
                        onFailure={onError}
                        forceLowerCaseEmail={APP_CONFIG.forceLowerCaseEmail || false}
                        flashMessage={flashMessage}
                        flashType={flashType}
                    />;
                break;
            case ROUTE.passwordReset:
                content =
                    <PasswordReset
                        startLoading={startLoading}
                        stopLoading={stopLoading}
                        onPasswordReset={onPasswordReset}
                        onSuccess={onPasswordResetSuccess}
                        onFailure={onError}
                        flashMessage={flashMessage}
                        flashType={flashType}
                    />;
                break;
            default:
                setRoute(ROUTE.signUp);
                // Usar location.origin en lugar de construir URL manualmente
                history.pushState(null, '', `${location.origin}${location.pathname}${search}${ROUTE.signUp}`);
        }

        return content;
    }, [
        params,
        isLoading,
        flashMessage,
        flashType,
        stopLoading,
        flashDisplayError,
        flashClean,
        onSignInErrorHandler,
        startLoading,
        handleCognitoLogin,
        onSignOut,
        onSignOutSuccess,
        onPasswordRescue,
        onPasswordRescueSuccess,
        onError,
        onPasswordReset,
        onPasswordResetSuccess
    ]);

    const displayLoading = useMemo((): React.ReactElement | null => {
        const loading = externalIsLoading !== undefined ? externalIsLoading : isLoading;
        if (loading) {
            return <LoadingLayer />;
        }
        return null;
    }, [isLoading, externalIsLoading]);

    const sendAnalyticsData = useMemo((): React.ReactElement | null => {
        const loading = externalIsLoading !== undefined ? externalIsLoading : isLoading;
        if (loading) {
            return null;
        }
        return <AnalyticsLocationChange />;
    }, [isLoading, externalIsLoading]);

    // ========================================================================
    // EFFECTS
    // ========================================================================
    useEffect(() => {
        // Initialize AnalyticsLayer (equivalent to constructor)
        new AnalyticsLayer(); // Maps sessionStorage to CV.analyticsLayer
    }, []);

    useEffect(() => {
        // Equivalent to componentDidMount
        generateChannelContextCookie();
        // For some reason amplitude hasn't been initialized at this point, so we need this
        // Because I can't stop the visitor call
        // * amplitude.getDeviceId() *
        setTimeout(() => {
            handleVisitor();
        });
    }, [handleVisitor]);

    // Efecto para sincronizar el hash de la URL cuando la ruta cambia
    useEffect(() => {
        if (route && location.hash !== route) {
            console.log('[Controller] Syncing route to hash:', route);
            // Actualizar el hash sin causar recarga
            if (route.startsWith('#')) {
                window.location.hash = route;
            }
        }
    }, [route]);

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

// ============================================================================
// CONTROLLER WRAPPER (usa hooks de TanStack Query)
// ============================================================================

const ControllerWrapper: React.FC = () => {
    const { signInWithCognito, signInWithProvider, handlePasswordRescue, handlePasswordReset, isLoading } = useAuthActions();

    return (
        <Controller
            onSignInWithCognito={signInWithCognito}
            onSignInWithProvider={signInWithProvider}
            onPasswordRescue={handlePasswordRescue}
            onPasswordReset={handlePasswordReset}
            isLoading={isLoading}
        />
    );
};

export default ControllerWrapper;
