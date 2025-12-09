import React from 'react';
import styled from '@emotion/styled';
import translate from 'counterpart';
import { validate } from 'revalidator';
import { Link } from '@npm_leadtech/cv-lib-app-components';

import { APP_CONFIG } from '../../config/appConfig';
import { withLoginComponent } from '../../hoc/withLoginComponent';
import { Divider } from '../Divider/Divider';
import { LabelPassword } from '../Label/LabelPassword';
import { LowerCasedLabelForm } from '../Label/LowerCasedLabelForm';
import FlashMessage from '../lib/FlashMessage';
import IntroductionTop from '../lib/IntroductionTop';
import { SigningRedirection } from '../lib/SigningRedirection';
import SocialButtonsInline from '../SocialButtonsInline/SocialButtonsInline';
import { SignInButton } from './SignInButton';

const StyledWrapper = styled.div`
    display: flex;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
`;


const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flashMessage: this.props.flashMessage || '',
            flashType: this.props.flashType || '',
            params: {},
            token: null,
            submitButton: null
        };
    }

    componentDidMount() {
        let submitBtn = document.getElementById('sign-in');
        this.setState({ submitButton: submitBtn });
        // Only register with SignUpModule if onCognitoLogin is not available (legacy mode)
        if (!this.props.onCognitoLogin && this.props.setRenderedComponent) {
            this.props.setRenderedComponent({
                name: 'signInButton',
                node: submitBtn
            });
        }
        document.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    handleKeyPress = e => {
        if (e.charCode === 13 && e.shiftKey === false) {
            this.attemptSignIn();
        }
    };

    handleForgotPassword(){
        window.location.href = '#/passwordrescue';
    }

    attemptSignIn = () => {
        let params = {
            email: document.getElementsByName('email')[0].value,
            password: document.getElementsByName('password')[0].value,
            isPermanent: document.getElementsByName('stay_signed')[0].checked
        };

        if (params.email) {
            params.email = params.email.toLowerCase();
        }

        const paramErrors = validate(params, {
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                    allowEmpty: false,
                    required: true,
                    messages: {
                        allowEmpty: 'Your email address should respect the following format: text@domainname.com with a single ‘@’ sign and a valid extension (.com, .org, .net, etc.)',
                        required: 'Your email address should respect the following format: text@domainname.com with a single ‘@’ sign and a valid extension (.com, .org, .net, etc.)',
                        format: 'Your email address should respect the following format: text@domainname.com with a single ‘@’ sign and a valid extension (.com, .org, .net, etc.)'
                    }
                },
                password: {
                    type: 'string',
                    allowEmpty: false,
                    required: true,
                    messages: {
                        allowEmpty: 'Please enter a valid password with a minimum of 6 characters.',
                        required: 'Please enter a valid password with a minimum of 6 characters.'
                    }
                }
            }
        });

        if (!paramErrors.valid) {
            this.props.onFailure(paramErrors.errors[0].message);
            return false;
        }

        this.setState({ params });
        this.signIn();
    };

    signIn = () => {
        // Use TanStack Query via Controller if available, otherwise fallback to SignUpModule
        if (this.props.onCognitoLogin) {
            console.log('[SignIn] Using TanStack Query for Cognito login');
            // Get email and password directly from the form inputs
            const emailInput = document.getElementsByName('email')[0];
            const passwordInput = document.getElementsByName('password')[0];
            const email = emailInput ? emailInput.value.toLowerCase() : '';
            const password = passwordInput ? passwordInput.value : '';
            
            console.log('[SignIn] Email:', email, 'Password length:', password.length);
            
            if (!email || !password) {
                console.error('[SignIn] Email or password is empty');
                this.props.onFailure('Email and password are required');
                return;
            }
            
            this.props.onCognitoLogin(email, password);
        } else {
            // Fallback to SignUpModule (legacy)
            console.log('[SignIn] Using SignUpModule for Cognito login (fallback)');
            if (this.state.submitButton) {
                this.state.submitButton.click();
            }
        }
    };

    renderSignInInputs() {
        return (
            <React.Fragment>
                <div className="row u-padding-r1-3 u-padding-l1-3 u-row-nomargin-bt">
                    <div className="col s12">
                        <LowerCasedLabelForm
                            nodeName="signInEmail"
                            idLabel="sign-in-email-label"
                            inputName="email"
                            labelContent={translate('E-mail address')}
                            prefilledEmail={this.props.prefilledEmail}
                        />
                        <LabelPassword
                            nodeName="signInPassword"
                            idLabel="sign-in-password-label"
                            inputName="password"
                            labelContent={translate('Password')}
                            signIn={true}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <StyledWrapper>
                <div className="login-container row u-row-nopadding-bt">
                    <div className="o-login-container">
                        <div className="col s12 offset-l3 l6 m-info-login-container ">
                            <div className="row u-padding-r2 u-padding-l2 u-row-nomargin-bt">
                                <div className="col s12">
                                    <IntroductionTop
                                        principal={translate('Log in')}
                                    />
                                </div>

                            </div>
                            <div className="row u-padding-r2 u-padding-l2 u-row-nomargin-bt">
                                <div className="col s12">
                                    <SigningRedirection
                                        label={translate('New to %(appName)s?', { appName: APP_CONFIG.appName })}
                                        redirectionLabel={translate('Create account here')}
                                        redirection='#/signup'
                                        redirectionDataQa='or-sign-up'
                                    />
                                </div>
                            </div>
                            <div className="row u-padding-r2 u-padding-l2 u-row-nomargin-bt">
                                <div className="col s12">
                                    <SocialButtonsInline
                                        onFailure={error => this.props.onFailure(error)}
                                        onSignInErrorHandler={this.props.onSignInErrorHandler}
                                    />
                                </div>
                            </div>
                            <div className="row u-padding-r2 u-padding-l2 u-row-nomargin-bt">
                                <div className="col s12">
                                    <Divider/>
                                </div>
                            </div>
                            <div className="row u-padding-r1-3 u-padding-l1-3 u-row-nomargin-bt">
                                <FlashMessage
                                    flashMessage={this.props.flashMessage}
                                    flashType={this.props.flashType}
                                />
                            </div>
                            <form className="signup-container">
                                {this.renderSignInInputs()}
                            </form>
                            <div className="row u-padding-r1-3 u-padding-l1-3 u-row-nomargin-bt">
                                <div className="col s12">
                                    <StyledContainer>
                                        <CheckboxWrapper>
                                            <input
                                                className="with-gap"
                                                value="1"
                                                name="stay_signed"
                                                type="checkbox"
                                                id="stay_signed_dest"
                                            />
                                            <label htmlFor="stay_signed_dest" id="stay_signed">
                                                {translate('Remember me')}
                                            </label>
                                        </CheckboxWrapper>
                                        <Link styles={{ margin:0 }} data-qa='forgot-password' onClick={this.handleForgotPassword}>
                                            {translate('Forgot password')}
                                        </Link>
                                    </StyledContainer>
                                </div>
                            </div>
                            <div>
                                <div className="row u-padding-r2 u-padding-l2 u-row-nomargin-bt">
                                    <SignInButton attemptSignIn={this.attemptSignIn} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </StyledWrapper>
        );
    }
}

const EnhancedSignIn = withLoginComponent(SignIn);

export { EnhancedSignIn as SignIn };
export default EnhancedSignIn;

