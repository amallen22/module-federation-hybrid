import React from 'react';
import styled from '@emotion/styled';
import translate from 'counterpart';
import { validate as VALIDATE } from 'revalidator';
import { Button, dsmColors } from '@npm_leadtech/cv-lib-app-components';

import { LowerCasedLabelForm } from '../Label/LowerCasedLabelForm';
import FlashMessage from '../lib/FlashMessage';
import IntroductionTop from '../lib/IntroductionTop';

const ContentMessage = styled.p`
    color: ${dsmColors.colorNeutral800};
`;

const IllustrationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;
class PasswordRescue extends React.Component {
    constructor () {
        super();
    }

    componentDidMount () {
        if (this.props.prefilledEmail) {
            document.getElementsByName('password-rescue-email')[0].focus();
        }
    }

    rescuePassword = () => {
        let params = {
            email: document.getElementsByName('password-rescue-email')[0].value
        };

        if (this.props.forceLowerCaseEmail && params.email) {
            params.email = params.email.toLowerCase();
        }

        const paramErrors = VALIDATE(params, {
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                    allowEmpty: false,
                    required: true,
                    messages: {
                        allowEmpty: 'Please enter an email address.',
                        required: 'Please enter an email address.',
                        format: 'Please enter an email address.'
                    }
                }
            }
        });

        if (!paramErrors.valid) {
            this.props.stopLoading();
            this.props.onFailure(paramErrors.errors[0].message);
            return false;
        }

        this.props.startLoading();
        this.props.onPasswordRescue(
            params.email,
            this.props.onSuccess,
            this.props.onFailure
        );

    };

    render () {

        return (
            <div>
                <div className='password-rescue-container login-container row'>
                    <div className='container wrapper'>
                        <div className='col s12 m12 l7 m-info-login-container'>
                            <div className='m-info-payment'>
                                <div className='container'>
                                    <div className='container'>
                                        <IllustrationContainer>
                                            <img
                                                src='./images/group-40.svg'
                                                alt=''
                                            />
                                        </IllustrationContainer>
                                        <IntroductionTop
                                            principal={ translate('Forgot your password?') }
                                        />
                                        <ContentMessage>
                                            { translate('Please enter the email address you used to open your account with us.') }
                                        </ContentMessage>
                                        <ContentMessage>
                                            { translate('We’ll send a message to this address with instructions to recover and reset your password.') }
                                        </ContentMessage>
                                        <FlashMessage
                                            flashMessage={ this.props.flashMessage }
                                            flashType={ this.props.flashType }
                                        />
                                        <LowerCasedLabelForm
                                            send={ this.rescuePassword }
                                            inputName='password-rescue-email'
                                            labelContent={ translate('E-mail address') }
                                            prefilledEmail={ this.props.prefilledEmail }
                                        />
                                        <Button
                                            style={{ width: '100%', marginBottom: 32, marginTop: 10 }}
                                            id='password-rescue'
                                            color='secondary'
                                            name='action'
                                            onClick={ this.rescuePassword }>
                                            { translate('Send Email') }
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export default PasswordRescue;
