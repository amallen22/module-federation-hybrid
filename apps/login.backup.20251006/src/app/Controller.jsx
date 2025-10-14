/* eslint-disable no-prototype-builtins */
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

import LoadingInitial from './components/Loading/LoadingInitial.jsx';
import LoadingLayer from './components/Loading/LoadingLayer.jsx';
import PasswordRescue from './components/Password/PasswordRescue.jsx';
import PasswordReset from './components/Password/PasswordReset.jsx';
import { SignIn } from './components/Signing/SignIn.jsx';
import SignOut from './components/Signing/SignOut.jsx';
import { SignUp } from './components/Signing/SignUp.jsx';
import { API_URL, APP_CONFIG } from './config/appConfig.js';
import { PostAuthTokenHandler } from './internals/ajax/PostAuthToken/handlers.js';
import { AnalyticsLayer } from './internals/analytics-layer/AnalyticsLayer.js';
import { forceLoginByCRM } from './services/forceLoginByCRM.js';
import { FrontLogService } from './services/FrontLogService.js';
import HandleErrorAuthToken from './services/HandleErrorAuthToken.js';
import { AppNavigatorService } from './services/NavigatorService/AppNavigatorService.js';
import { AppRedirectReaderService } from './services/RedirectReaderService/AppRedirectReaderService.js';
import { SetLanguage } from './services/SetupTranslations.js';
import { DeepLinkingUseCase } from './usecase/DeepLinkingUseCase.js';

function setupFavIcons () {
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
};

class Controller extends React.Component {

    constructor(props) {
        super(props);
        new AnalyticsLayer(); // Maps sessionStorage to CV.analyticsLayer

        this.state = {
            isLoading: true,
            app: 'login',
            flashType: undefined,
            flashMessage: undefined,
            initialLoading: true,
            params: {},
        };
    }

    static navigatePublicly(hash) {
        location.hash = hash;
    }

    static goUrl(url) {
        location.assign(url);
    }

    static getRoute(name) {
        return ROUTE[name];
    }

    static getDomain() {
        if (window) {
            let domainItems = window.location.hostname.split('.');
            let position = 1;

            if (domainItems.length === 2) {
                position = 0;
                return '.' + domainItems.slice(position).join('.');
            } else if (domainItems.length < 2)
                return window.location.hostname;
        }
    }

    componentDidMount() {
        generateChannelContextCookie();
        // For some reason amplitude hasn't been initialized at this point, so we need this
        // Because I can't stop the visitor call
        // * amplitude.getDeviceId() *
        setTimeout(() => {
            this.handleVisitor();
        });
    }

    executeWhenAccessTokenPresent() {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        if (token && email) {
            forceLoginByCRM(token, email);
        }
    }

    handleVisitor() {
        this.cookiesStorage = StoragePackage.StorageManager();
        const queryStringService = new QueryStringService();
        const cookieGenerator = new CookieGeneratorHandler(API_URL);

        // console.log('this.state ::::::::::::::::::::::::::: ', this.state);
        console.log('this.cookiesStorage ::::::::::::::::::::::::::: ', this.cookiesStorage);
        console.log('queryStringService ::::::::::::::::::::::::::: ', queryStringService);
        console.log('cookieGenerator ::::::::::::::::::::::::::: ', cookieGenerator);
        
        // this.setState({
        //     initialLoading: false,
        //     isLoading: false            
        // });
        
        console.log('this.state.initialLoading ::::::::::::::::::::::::::: ', this.state);

        // debugger;
        
        new HandleVisitorUseCase(queryStringService, cookieGenerator, this.cookiesStorage, 'temp-device-id')
        .invoke()
        .then (() => {
            // debugger;
            this.cvSessionStore = StoragePackage.sessionStoreCookie({
                apiTimeout: 10,
                apiEndpoint: '',
            });
            this.authManager = this.buildAuthManager();

            // console.log('SetLanguage(this.cvSessionStore.getLanguage()) ::::::::::::::::::::::::::: ', SetLanguage(this.cvSessionStore.getLanguage()) )
            SetLanguage(this.cvSessionStore.getLanguage());
        })
        .then (() => {
            // debugger;
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
        .catch(err => {
            // debugger;
            FrontLogService.logAjaxResponse({ className: 'Controller', funcName: 'HandleVisitorUseCase', err });
            // console.error('Error in HandleVisitorUseCase:', err);
            this.forceRedirectOnSession();
        });
    }

    sendAnalyticsData() {
        if (this.state.isLoading) {
            return null;
        }
        return <AnalyticsLocationChange />;
    }

    getHash() {
        const request = this.buildStateRequest();
        const requestParams = request.getParams();

        if (requestParams && requestParams.hasOwnProperty('idprovider') && requestParams.idprovider === 'linkedin') {
            return this.loadingLinkedIn;
        }

        return request.hash;
    }

    getParams() {
        return this.buildStateRequest().getParams() || {};
    }

    flashClean = () => {
        this.setState({
            flashType: undefined,
            flashMessage: undefined
        });
    }

    flashDisplayError = (error) => {
        let errorMessage;

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

    navigatePrivately(hash) {
        this.setState({ route: hash });
    }

    forceRedirectOnSession() {
        if (this.state.app === 'login' && this.state.hasAccess && this.state.route !== ROUTE.signOut) {
            const navigatorService = new AppNavigatorService(location);
            const redirectReaderService = new AppRedirectReaderService(location.href);
            const deepLinkingUseCase = new DeepLinkingUseCase(navigatorService, redirectReaderService);

            deepLinkingUseCase.invoke();
        }
    }

    attachWindowEvents() {
        window.onhashchange = () => this.onHashChange();
    }

    getStateSessionItems() {
        return {
            hasAccess: Boolean(this.cvSessionStore.get('access')),
            hasSession: Boolean(this.cvSessionStore.get('visitor'))
        };
    }

    beforeOnSuccess() {
        this.flashClean();
    }

    startLoading = () => {
        this.setState({ isLoading: true });
    };

    stopLoading = () => {
        this.setState({ isLoading: false });
    };

    onSignInSuccess = ({ provider, providerToken, callback, operation }) => {
        if (provider && providerToken) {
            this.beforeOnSuccess();

            const userPostParams = {
                provider: provider,
                providerToken: providerToken
            };

            if (!!operation) {
                userPostParams.operation = operation;
            }
            new PostAuthTokenHandler().customAction(userPostParams)
            .then(({ authToken, isNewUser, user }) => {
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
            .catch(err => {
                const handleErrorAuthToken = new HandleErrorAuthToken();
                const errorMessage = handleErrorAuthToken.extractErrorMessage(err);
                this.flashDisplayError(errorMessage.replace(/^[ A-Za-z0-9]*(: )/, ''));
            });

        } else {
            this.stopLoading();
        }
    };

    onPasswordRescueSuccess = () => {
        this.beforeOnSuccess();
        this.navigatePrivately(ROUTE.passwordReset);
        this.stopLoading();
    };

    onPasswordResetSuccess = newPassword => {
        this.beforeOnSuccess();
        const email = this.cvSessionStore.get('user');

        if (email) {
            this.authManager.signIn(
                email,
                newPassword,
                token => this.onSignInSuccess({ provider: 'cognito', providerToken: token }),
                message => {
                    this.stopLoading();
                    this.flashDisplayError(message);
                }
            );
        } else {
            Controller.navigatePublicly(ROUTE.signIn);
        }
    };

    onPasswordRescue = (email, onSuccess, onFailure) => {
        this.authManager.rescuePassword(email, onSuccess, onFailure);
    };

    onPasswordReset = (verification, newPassword, onSuccess, onFailure) => {
        this.authManager.resetPassword(
            verification,
            newPassword,
            onSuccess,
            onFailure
        );
    };

    onSignOutSuccess = () => {
        this.beforeOnSuccess();
        let sessionItems = this.getStateSessionItems();
        this.setState(sessionItems);
        this.cookiesStorage.deleteCookie('hash');
        this.cookiesStorage.deleteCookie('previewOrderId');
        this.cookiesStorage.deleteCookie('templatechange');
        this.cookiesStorage.deleteCookie('lastResumeId');
        this.cvSessionStore.destroy();

        Controller.goUrl(ROUTE.signIn);
    };

    onHashChange() {
        this.handleContent(this.getHash());
        this.flashClean();
    }

    handleContent(hash) {
        this.setState({ route: hash });
    }

    buildAuthManager() {
        // debugger;
        const { clientId, userPoolId } = APP_CONFIG.cognitoLoginConfig;
        
        console.log('buildAuthManager APP_CONFIG.cognitoLoginConfig:', APP_CONFIG.cognitoLoginConfig);
        // console.log('buildAuthManager clientId:', clientId);
        // console.log('buildAuthManager userPoolId:', userPoolId);

        if (!clientId) {
            return;
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
            this.cvSessionStore,
            poolData,
        );
    }

    buildStateRequest() {
        return StoragePackage.Request(
            window.location,
            null,
            this.cvSessionStore
        );
    }

    onSignOut = (onSuccess, onFailure) => {
        this.authManager.signOut(onSuccess, onFailure);
    };

    onSignInErrorHandler = (err, translationParams) => {
        let error;
        if(!err.request) error = err;
        else error = err.request.response;

        if(typeof error === 'string') {
            error = JSON.parse(error);
        }
        this.flashDisplayError(error.message, translationParams);
    };

    onError = (err) => {
        this.stopLoading();
        this.flashDisplayError(err);
    };

    getContentByHash(hash) {
        let content = null;
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
                        prefilledEmail={this.isLoading ? null : this.state.params.email}
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

    displayLoading() {
        console.log('Controller - displayLoading - isLoading:', this.state.isLoading);
        if (this.state.isLoading) {
            return <LoadingLayer />;
        }

        return null;
    }

    render() {
        if (this.state.initialLoading) {
            return <LoadingInitial />;
        }
        return (
            <div>
                {this.sendAnalyticsData()}
                {this.displayLoading()}
                {this.getContentByHash(this.state.route)}
            </div>
        );
    }

}

export default Controller;
