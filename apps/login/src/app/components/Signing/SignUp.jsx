import React from 'react';
import styled from '@emotion/styled';
import translate from 'counterpart';
import parse from 'html-react-parser';
import { validate } from 'revalidator';
import { dsmTypography } from '@npm_leadtech/cv-lib-app-components';

import { APP_CONFIG } from '../../config/appConfig';
import { withLoginComponent } from '../../hoc/withLoginComponent';
import { Divider } from '../Divider/Divider';
import { LabelPassword } from '../Label/LabelPassword';
import { LowerCasedLabelForm } from '../Label/LowerCasedLabelForm';
import FlashMessage from '../lib/FlashMessage';
import IntroductionTop from '../lib/IntroductionTop';
import { SigningRedirection } from '../lib/SigningRedirection';
import SocialButtonsInline from '../SocialButtonsInline/SocialButtonsInline';
import { HelpMessage } from './HelpMessage';
import { SignUpButton } from './SignUpButton';

const { PrimaryFontFamily } = dsmTypography;

const StyledWrapper = styled.div`
    display: flex;
`;

const StyledInfoParagraph = styled.p`
    ${PrimaryFontFamily};
    color: #7B8A94;
    text-align: center;
    font-size: 12px;
    margin-bottom: 20px;
    & .qa-gdpr-link-terms, & .qa-gdpr-link-privacy {
        color: #2E9DEA
    }
`;
class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            showEmailHelp: false,
            showPasswordHelp: false,
            params: {},
            submitButton: null
        };
    }


    componentDidMount() {
        let submitBtn = document.getElementById('sign-up');
        this.setState({ submitButton: submitBtn });
        this.props.setRenderedComponent({
            name: 'signUpButton',
            node: submitBtn
        });
        document.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    handleKeyPress = e => {
        if (e.charCode === 13 && e.shiftKey === false) {
            this.attemptSignUp();
        }
    };

    attemptSignUp = () => {
        const params = {
            email: document.getElementById('sign-up-email-label').value.toLowerCase(),
            password: document.getElementById('sign-up-password-label').value
        };

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
                    minLength: 6,
                    messages: {
                        allowEmpty: 'Please enter a valid password with a minimum of 6 characters.',
                        required: 'Please enter a valid password with a minimum of 6 characters.',
                        minLength: 'Please enter a valid password with a minimum of 6 characters.'
                    }
                }
            }
        });

        if (!paramErrors.valid) {
            this.props.onFailure(paramErrors.errors[0].message);
            return false;
        }

        this.setState({ params });
        this.signUp();
    };

    signUp() {
        this.state.submitButton.click();
    }

    focusHelp = stateName => () => {
        this.setState({ [stateName]: true });
    };

    blurHelp = stateName => () => {
        this.setState({ [stateName]: false });
    };

    selectContentMessage() {
        return translate(
            'Instantly start building your professional profile'
        );
    }

    renderGdpr = () => {
        const { domain, privacyPolicyUrl, termsOfUseUrl } = APP_CONFIG;

        let txtGdprCheckbox = translate(
            'By clicking “Sign up”, I expressly agree to the <a href="%(linkTerms)s" class="%(classTerms)s" target="blank">Terms and Conditions</a> and <a href="%(linkPrivacy)s" class="%(classPrivacy)s" target="blank">Privacy Policy</a>.',
            {
                linkTerms: `//www.${domain}${termsOfUseUrl}`,
                linkPrivacy: `//www.${domain}${privacyPolicyUrl}`,
                classTerms: 'qa-gdpr-link-terms',
                classPrivacy: 'qa-gdpr-link-privacy'
            }
        );
        txtGdprCheckbox = parse(txtGdprCheckbox);

        return (
            <div className="row u-padding-r1-3 u-padding-l1-3 u-row-nomargin-bt">
                <div className="col s12">
                    <StyledInfoParagraph>
                        {txtGdprCheckbox}
                    </StyledInfoParagraph>
                </div>
            </div>
        );
    }

    renderSignUpInputs() {
        return (
            <React.Fragment>
                <div className="row u-padding-r1-3 u-padding-l1-3 u-row-nomargin-bt">
                    <div className="col s12">
                        <LowerCasedLabelForm
                            nodeName="signUpEmail"
                            idLabel="sign-up-email-label"
                            inputName="email"
                            labelContent={translate('E-mail address')}
                            prefilledEmail={this.props.prefilledEmail}
                        />
                        <div className="help-container">
                            <HelpMessage show={this.state.showEmailHelp}>
                                {translate('Please enter a valid email (example@example.com)')}
                            </HelpMessage>
                        </div>
                        <LabelPassword
                            nodeName="signUpPassword"
                            idLabel="sign-up-password-label"
                            inputName="password"
                            labelContent={translate('Password')}
                        />
                        <div className="help-container">
                            <HelpMessage show={this.state.showPasswordHelp}>
                                {translate('Choose a password at least 6 characters long')}
                            </HelpMessage>
                        </div>
                    </div>
                </div>
                <div className="row u-padding-r2 u-padding-l2 u-row-nomargin-bt">
                    <SignUpButton attemptSignUp={this.attemptSignUp} />
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
                                        principal={translate('Create a free account and launch your career')}
                                    />
                                </div>
                            </div>
                            <div className="row u-padding-r2 u-padding-l2 u-row-nomargin-bt">
                                <div className="col s12">
                                    <SigningRedirection
                                        label={translate('Already have an account?')}
                                        redirectionLabel={translate('Log in now')}
                                        redirection={'#/signin'}
                                        redirectionDataQa='or-sign-in'
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
                                {this.renderSignUpInputs()}
                            </form>
                            {this.renderGdpr()}
                        </div>
                    </div>
                </div>
            </StyledWrapper>
        );
    }
}

const EnhancedSignUp = withLoginComponent(SignUp);

export { EnhancedSignUp as SignUp };
