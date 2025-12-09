/* eslint-disable no-prototype-builtins */
// Polyfills DEBEN ser el primer import (side-effect import)
import React from 'react';
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

function setupFavIcons() {
    const favIconInjector = new FavIconInjector({
        localizationDataStore: APP_CONFIG,
    });
    favIconInjector.injectFavIcons();
}

setupFavIcons();

const ROUTE = {
    signIn: '#/signin',
    signUp: '#/signup',
    signOut: '#/signout',
    passwordRescue: '#/passwordrescue',
    passwordReset: '__passwordreset' // not accessible by url
} as const;

const queryStringService = new QueryStringService();
const cookieGenerator = new CookieGeneratorHandler(API_URL);

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

interface ControllerProps {
    onSignInWithCognito?: (email: string, password: string) => Promise<any>;
    onSignInWithProvider?: (params: { provider: string; providerToken: string; callback?: () => void; operation?: string }) => Promise<any>;
    onPasswordRescue?: (email: string) => Promise<void>;
    onPasswordReset?: (verificationCode: string, newPassword: string) => Promise<void>;
    isLoading?: boolean;
}

class Controller extends React.Component<ControllerProps, ControllerState> {
    private cookiesStorage: any;
    private cvSessionStore: any;
    private authManager: AuthManager | undefined;
    private clientId: string | undefined;
    private loadingLinkedIn: string = '#/signin';

    constructor(props: ControllerProps) {
        super(props);
        new AnalyticsLayer(); // Maps sessionStorage to CV.analyticsLayer

        this.state = {
            isLoading: true,
            app: 'cv-app-login',
            flashType: undefined,
            flashMessage: undefined,
            initialLoading: true,
            params: {},
        };
    }

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
        if (typeof window !== 'undefined') {
            let domainItems = window.location.hostname.split('.');
            let position = 1;

            if (domainItems.length === 2) {
                position = 0;
                return '.' + domainItems.slice(position).join('.');
            } else if (domainItems.length < 2) {
                return window.location.hostname;
            }
        }
        return undefined;
    }

    componentDidMount(): void {
        generateChannelContextCookie();
        // For some reason amplitude hasn't been initialized at this point, so we need this
        // Because I can't stop the visitor call
        // * amplitude.getDeviceId() *
        setTimeout(() => {
            this.handleVisitor();
        });
    }

    executeWhenAccessTokenPresent(): void {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        if (token && email) {
            forceLoginByCRM(token, email);
        }
    }

    handleVisitor(): void {
        console.log('[Controller] handleVisitor called');
        this.cookiesStorage = StoragePackage.StorageManager();

        new HandleVisitorUseCase(queryStringService, cookieGenerator, this.cookiesStorage, amplitude.getDeviceId())
        .invoke()
        .then(() => {
            console.log('[Controller] HandleVisitorUseCase completed');
            this.cvSessionStore = StoragePackage.sessionStoreCookie({
                apiTimeout: 10,
                apiEndpoint: '',
            });
            this.authManager = this.buildAuthManager();

            const language = this.cvSessionStore.getLanguage();
            console.log('[Controller] Language from sessionStore:', language);
            console.log('[Controller] Calling SetLanguage...');
            return SetLanguage(language);
        })
        .then(() => {
            console.log('[Controller] SetLanguage completed successfully');
            this.setState({
                initialLoading: false,
                route: this.getHash(),
                params: this.getParams(),
                hasAccess: !!this.cvSessionStore.get('access'),
                hasSession: !!this.cvSessionStore.get('visitor')
            });

            this.attachWindowEvents();
            this.executeWhenAccessTokenPresent();
            this.forceRedirectOnSession();
            this.stopLoading();
        })
        .catch((err: any) => {
            console.error('[Controller] Error in handleVisitor:', err);
            console.error('[Controller] Error message:', err?.message);
            console.error('[Controller] Error stack:', err?.stack);
            console.error('[Controller] Error details:', JSON.stringify(err, null, 2));
                
            // Intentar ejecutar SetLanguage incluso si HandleVisitorUseCase falla
            // para que las traducciones se carguen
            const language = this.cvSessionStore?.getLanguage?.() || 'en-US';
            console.log('[Controller] Attempting to load translations despite error, language:', language);
            SetLanguage(language).catch((i18nErr: any) => {
                console.error('[Controller] Error loading translations:', i18nErr);
            });
                
            FrontLogService.logAjaxResponse({ className: 'Controller', funcName: 'HandleVisitorUseCase', err });
            
            // Initialize cvSessionStore if not already initialized
            if (!this.cvSessionStore) {
                this.cvSessionStore = StoragePackage.sessionStoreCookie({
                    apiTimeout: 10,
                    apiEndpoint: '',
                });
            }
            
            this.setState({ 
                initialLoading: false,
                route: this.getHash(),
                params: this.getParams(),
                hasAccess: false,
                hasSession: false
            });
            this.forceRedirectOnSession();
        });
    }

    sendAnalyticsData(): React.ReactElement | null {
        if (this.state.isLoading) {
            return null;
        }
        return <AnalyticsLocationChange />;
    }

    getHash(): string {
        const request = this.buildStateRequest();
        const requestParams = request.getParams();

        if (requestParams && requestParams.hasOwnProperty('idprovider') && requestParams.idprovider === 'linkedin') {
            return this.loadingLinkedIn;
        }

        return request.hash;
    }

    getParams(): Record<string, any> {
        return this.buildStateRequest().getParams() || {};
    }

    flashClean = (): void => {
        this.setState({
            flashType: undefined,
            flashMessage: undefined
        });
    };

    flashDisplayError = (error: string | Error | any): void => {
        let errorMessage: string;

        if (typeof error === 'string') {
            errorMessage = error;
        } else if (typeof error === 'object' && error.hasOwnProperty('message')) {
            errorMessage = error.message;
        } else {
            errorMessage = JSON.stringify(error);
        }

        this.setState({
            flashType: 'flash-error',
            flashMessage: errorMessage
        });
    };

    navigatePrivately(hash: string): void {
        this.setState({ route: hash });
    }

    forceRedirectOnSession(): void {
        if (this.state.app === 'cv-app-login' && this.state.hasAccess && this.state.route !== ROUTE.signOut) {
            const navigatorService = new AppNavigatorService(location);
            const redirectReaderService = new AppRedirectReaderService(location.href);
            const deepLinkingUseCase = new DeepLinkingUseCase(navigatorService, redirectReaderService);

            deepLinkingUseCase.invoke();
        }
    }

    attachWindowEvents(): void {
        window.onhashchange = () => this.onHashChange();
    }

    getStateSessionItems(): { hasAccess: boolean; hasSession: boolean } {
        return {
            hasAccess: Boolean(this.cvSessionStore.get('access')),
            hasSession: Boolean(this.cvSessionStore.get('visitor'))
        };
    }

    beforeOnSuccess(): void {
        this.flashClean();
    }

    startLoading = (): void => {
        this.setState({ isLoading: true });
    };

    stopLoading = (): void => {
        this.setState({ isLoading: false });
    };

    onSignInSuccess = ({ provider, providerToken, callback, operation }: {
        provider: string;
        providerToken: string;
        callback?: () => void;
        operation?: string;
    }): void => {
        if (provider && providerToken) {
            this.beforeOnSuccess();

            // Use TanStack Query hook if available, otherwise fallback to direct API call
            if (this.props.onSignInWithProvider) {
                console.log('[Controller] Using TanStack Query for sign in with provider:', provider);
                this.props.onSignInWithProvider({ provider, providerToken, callback, operation })
                    .then((result: any) => {
                        const sessionItems = this.getStateSessionItems();
                        this.setState(sessionItems);
                        if (!!callback && !!result.isNewUser) {
                            callback();
                        } else {
                            this.forceRedirectOnSession();
                        }
                        this.stopLoading();
                    })
                    .catch((err: any) => {
                        const handleErrorAuthToken = new HandleErrorAuthToken();
                        const errorMessage = handleErrorAuthToken.extractErrorMessage(err);
                        this.flashDisplayError(errorMessage.replace(/^[ A-Za-z0-9]*(: )/, ''));
                        this.stopLoading();
                    });
            } else {
                // Fallback to direct API call
                console.log('[Controller] Using direct API call for sign in (fallback)');
                const userPostParams: any = {
                    provider: provider,
                    providerToken: providerToken
                };

                if (!!operation) {
                    userPostParams.operation = operation;
                }
                
                postAuthToken(userPostParams)
                .then(({ authToken, isNewUser, user }: { authToken: string; isNewUser: boolean; user?: string }) => {
                    let sha1User = '';

                    if (user) {
                        sha1User = sha1(user);
                    }
                    this.cvSessionStore.put('provider', provider);
                    this.cvSessionStore.put('access', authToken);
                    this.cvSessionStore.put('userid', sha1User);
                    this.cvSessionStore.put('user', user || '');
                    const sessionItems = this.getStateSessionItems();

                    this.setState(sessionItems);

                    if (!!callback && !!isNewUser) {
                        callback();
                    }
                    else {
                        this.forceRedirectOnSession();
                    }

                })
                .catch((err: any) => {
                    const handleErrorAuthToken = new HandleErrorAuthToken();
                    const errorMessage = handleErrorAuthToken.extractErrorMessage(err);
                    this.flashDisplayError(errorMessage.replace(/^[ A-Za-z0-9]*(: )/, ''));
                });
            }

        } else {
            this.stopLoading();
        }
    };

    onPasswordRescueSuccess = (): void => {
        this.beforeOnSuccess();
        this.navigatePrivately(ROUTE.passwordReset);
        this.stopLoading();
    };

    onPasswordResetSuccess = (newPassword: string): void => {
        this.beforeOnSuccess();
        const email = this.cvSessionStore.get('user');

        if (email) {
            this.authManager?.signIn(
                email,
                newPassword,
                (token: string) => this.onSignInSuccess({ provider: 'cognito', providerToken: token }),
                (message: string) => {
                    this.stopLoading();
                    this.flashDisplayError(message);
                }
            );
        } else {
            Controller.navigatePublicly(ROUTE.signIn);
        }
    };

    onPasswordRescue = (email: string, onSuccess: () => void, onFailure: (error: any) => void): void => {
        if (this.props.onPasswordRescue) {
            this.props.onPasswordRescue(email)
                .then(() => {
                    onSuccess();
                    this.stopLoading();
                })
                .catch((error) => {
                    onFailure(error);
                    this.stopLoading();
                });
        } else {
            // Fallback to legacy AuthManager
            this.authManager?.rescuePassword(email, onSuccess, onFailure);
        }
    };

    onPasswordReset = (verification: string, newPassword: string, onSuccess: () => void, onFailure: (error: any) => void): void => {
        if (this.props.onPasswordReset) {
            this.props.onPasswordReset(verification, newPassword)
                .then(() => {
                    onSuccess();
                    this.stopLoading();
                })
                .catch((error) => {
                    onFailure(error);
                    this.stopLoading();
                });
        } else {
            // Fallback to legacy AuthManager
            this.authManager?.resetPassword(
                verification,
                newPassword,
                onSuccess,
                onFailure
            );
        }
    };

    onSignOutSuccess = (): void => {
        this.beforeOnSuccess();
        let sessionItems = this.getStateSessionItems();
        this.setState(sessionItems);
        this.cookiesStorage.deleteCookie('hash');
        this.cookiesStorage.deleteCookie('previewOrderId');
        this.cookiesStorage.deleteCookie('templatechange');
        this.cookiesStorage.deleteCookie('lastResumeId');
        this.cvSessionStore.destroy();
        this.handleVisitor();

        Controller.goUrl(ROUTE.signIn);
    };

    // Method to handle Cognito login directly (for use with TanStack Query)
    handleCognitoLogin = (email: string, password: string): void => {
        console.log('[Controller] handleCognitoLogin called with email:', email);
        this.startLoading();
        if (this.props.onSignInWithCognito) {
            console.log('[Controller] Using TanStack Query for Cognito login');
            this.props.onSignInWithCognito(email, password)
                .then((result: any) => {
                    console.log('[Controller] Cognito login successful, calling onSignInSuccess');
                    // After successful login, call onSignInSuccess with the token
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

    onHashChange(): void {
        this.handleContent(this.getHash());
        this.flashClean();
    }

    handleContent(hash: string): void {
        this.setState({ route: hash });
    }

    buildAuthManager(): AuthManager | undefined {
        const { clientId, userPoolId } = APP_CONFIG.cognitoLoginConfig;

        if (!clientId) {
            return undefined;
        }

        this.clientId = clientId;

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
            this.cvSessionStore,
            poolData,
        );
    }

    buildStateRequest(): any {
        return StoragePackage.Request(
            window.location,
            null,
            this.cvSessionStore
        );
    }

    onSignOut = (onSuccess: () => void, onFailure: (error: any) => void): void => {
        this.authManager?.signOut(onSuccess, onFailure);
    };

    onSignInErrorHandler = (err: any, translationParams?: any): void => {
        let error: any;
        if (!err.request) error = err;
        else error = err.request.response;

        if (typeof error === 'string') {
            error = JSON.parse(error);
        }
        this.flashDisplayError(error.message, translationParams);
    };

    onError = (err: any): void => {
        this.stopLoading();
        this.flashDisplayError(err);
    };

    getContentByHash(hash: string): React.ReactElement | null {
        let content: React.ReactElement | null = null;
        const search = location.search || '';

        switch (hash) {
            case ROUTE.signUp:
                content =
                    <SignUp
                        prefilledEmail={this.state.params.email}
                        stopLoading={this.stopLoading}
                        onFailure={this.flashDisplayError}
                        flashMessage={this.state.flashMessage}
                        flashType={this.state.flashType}
                        flashClean={this.flashClean}
                        onSignInErrorHandler={this.onSignInErrorHandler}
                    />;
                break;
            case ROUTE.signIn:
                content =
                    <SignIn
                        prefilledEmail={this.state.params.email}
                        startLoading={this.startLoading}
                        stopLoading={this.stopLoading}
                        onFailure={this.flashDisplayError}
                        flashMessage={this.state.flashMessage}
                        flashType={this.state.flashType}
                        flashClean={this.flashClean}
                        clientId={this.clientId}
                        onSignInErrorHandler={this.onSignInErrorHandler}
                        cognitoLoginConfig={APP_CONFIG.cognitoLoginConfig}
                        onCognitoLogin={this.handleCognitoLogin}
                    />;
                break;
            case ROUTE.signOut:
                content =
                    <SignOut
                        onSignOut={this.onSignOut}
                        onSuccess={this.onSignOutSuccess}
                    />;
                break;
            case ROUTE.passwordRescue:
                content =
                    <PasswordRescue
                        startLoading={this.startLoading}
                        stopLoading={this.stopLoading}
                        prefilledEmail={this.state.isLoading ? null : this.state.params.email}
                        onPasswordRescue={this.onPasswordRescue}
                        onSuccess={this.onPasswordRescueSuccess}
                        onFailure={this.onError}
                        forceLowerCaseEmail={APP_CONFIG.forceLowerCaseEmail || false}
                        flashMessage={this.state.flashMessage}
                        flashType={this.state.flashType}
                    />;
                break;
            case ROUTE.passwordReset:
                content =
                    <PasswordReset
                        startLoading={this.startLoading}
                        stopLoading={this.stopLoading}
                        onPasswordReset={this.onPasswordReset}
                        onSuccess={this.onPasswordResetSuccess}
                        onFailure={this.onError}
                        flashMessage={this.state.flashMessage}
                        flashType={this.state.flashType}
                    />;
                break;
            default:
                this.setState({ route: ROUTE.signUp });
                history.pushState(null, null, new URL(
                    `https://${location.host}/${search}${ROUTE.signUp}`
                ));
        }

        return content;
    }

    displayLoading(): React.ReactElement | null {
        if (this.state.isLoading) {
            return <LoadingLayer />;
        }

        return null;
    }

    render(): React.ReactElement {
        if (this.state.initialLoading) {
            return <LoadingInitial />;
        }
        return (
            <div>
                {this.sendAnalyticsData()}
                {this.displayLoading()}
                {this.getContentByHash(this.state.route || ROUTE.signUp)}
            </div>
        );
    }
}

// ControllerWrapper: Functional component that uses hooks and passes them to Controller
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

