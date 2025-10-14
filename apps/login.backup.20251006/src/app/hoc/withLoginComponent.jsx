import React, { Component } from 'react';
import { amplitude, analyticsClient } from '@npm_leadtech/cv-lib-app-analytics';
import { SignUpModule } from '@npm_leadtech/cv-lib-social';
import StoragePackage from '@npm_leadtech/cv-storage-js';

import { API_EDITOR_URL, API_URL, APP_CONFIG } from '../config/appConfig';

const components = {
    googleButton: undefined,
    linkedinButton: undefined,
    signUpEmail: undefined,
    signUpPassword: undefined,
    signUpButton: undefined,
    signInEmail: undefined,
    signInPassword: undefined,
    signInButton: undefined,
};

const assets = APP_CONFIG.assets;
const preSelectedTemplate = StoragePackage.StorageManager().getCookie('preSelectedTemplate');

export const withLoginComponent = WrappedComponent => {

    class WithLoginComponent extends Component {

        constructor(props) {
            super(props);
            this.googleProvider = null;
        }

        setRenderedComponent = ({ name, node }) => {
            if (components[name] !== node) {
                components[name] = node;
                switch (name) {
                    case 'linkedinButton':
                        this.isLinkedinRendered();
                        break;
                    case 'googleButton':
                        this.isGoogleRendered();
                        break;
                    case 'signUpEmail':
                    case 'signUpPassword':
                    case 'signUpButton':
                        if (APP_CONFIG.cognitoLoginConfig && this.props.onSignInErrorHandler) {
                            this.isSignUpRendered();
                        }
                        break;
                    case 'signInEmail':
                    case 'signInPassword':
                    case 'signInButton':
                        if (APP_CONFIG.cognitoLoginConfig && this.props.onSignInErrorHandler) {
                            this.isSignInRendered();
                        }
                        break;
                    default:
                        break;
                }
            }
        };

        isLinkedinRendered() {
            if (!components.linkedinButton) return;

            const LINKEDIN_CONFIG = {
                clientId: APP_CONFIG.linkedInLoginConfig.clientId,
                destinationNode: components.linkedinButton,
                onSignInErrorHandler: this.props.onSignInErrorHandler,
                scope: 'r_liteprofile%20r_emailaddress'
            };

            new SignUpModule({
                assets,
                onSignInErrorHandler: this.props.onSignInErrorHandler,
                apiPrefix: API_URL,
                apiEditorPrefix: API_EDITOR_URL,
                cookieEndpoint: `${API_URL}/visitor?amplitudeDeviceId=${amplitude.getDeviceId()}`,
                linkedin: LINKEDIN_CONFIG,
                loaderWillBeDisplayed: true,
                preSelectedTemplate,
                analyticsProvider: analyticsClient,
            });
        }

        isGoogleRendered() {
            if (!components.googleButton) return;

            const GOOGLE_CONFIG = {
                autoLoad: false,
                clientId: APP_CONFIG.googleLoginConfig.clientId,
                destinationNode: components.googleButton,
                onSignInErrorHandler: this.props.onSignInErrorHandler,
                scope: 'profile email'
            };

            this.googleProvider = new SignUpModule({
                assets,
                onSignInErrorHandler: this.props.onSignInErrorHandler,
                apiPrefix: API_URL,
                apiEditorPrefix: API_EDITOR_URL,
                cookieEndpoint: `${API_URL}/visitor?amplitudeDeviceId=${amplitude.getDeviceId()}`,
                google: GOOGLE_CONFIG,
                loaderWillBeDisplayed: true,
                preSelectedTemplate,
                analyticsProvider: analyticsClient,
            }).getGoogleProvider();
        }

        isSignUpRendered() {
            if (!components.signUpEmail || !components.signUpButton || !components.signUpPassword) return;

            const COGNITO_CONFIG = {
                onSignInErrorHandler: this.props.onSignInErrorHandler,
                email: components.signUpEmail,
                password: components.signUpPassword,
                submitBtn: components.signUpButton,
                type: 'signup',
                clientId: this.props.clientId,
                cognitoLoginConfig: APP_CONFIG.cognitoLoginConfig
            };

            new SignUpModule({
                assets,
                onSignInErrorHandler: this.props.onSignInErrorHandler,
                apiPrefix: API_URL,
                apiEditorPrefix: API_EDITOR_URL,
                cookieEndpoint: `${API_URL}/visitor?amplitudeDeviceId=${amplitude.getDeviceId()}`,
                cognito: COGNITO_CONFIG,
                loaderWillBeDisplayed: true,
                preSelectedTemplate,
                analyticsProvider: analyticsClient,
            });
        }

        isSignInRendered() {
            if (!components.signInEmail || !components.signInButton || !components.signInPassword) return;

            const COGNITO_CONFIG = {
                onSignInErrorHandler: this.props.onSignInErrorHandler,
                email: components.signInEmail,
                password: components.signInPassword,
                submitBtn: components.signInButton,
                type: 'login',
                clientId: this.props.clientId,
                cognitoLoginConfig: APP_CONFIG.cognitoLoginConfig
            };

            new SignUpModule({
                assets,
                onSignInErrorHandler: this.props.onSignInErrorHandler,
                apiPrefix: API_URL,
                apiEditorPrefix: API_EDITOR_URL,
                cookieEndpoint: `${API_URL}/visitor?amplitudeDeviceId=${amplitude.getDeviceId()}`,
                cognito: COGNITO_CONFIG,
                loaderWillBeDisplayed: true,
                preSelectedTemplate,
                analyticsProvider: analyticsClient,
            });
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    setRenderedComponent={this.setRenderedComponent}
                    googleProvider={this.googleProvider}
                />
            );
        }

    }

    return WithLoginComponent;
};