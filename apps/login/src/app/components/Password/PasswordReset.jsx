import React from 'react';
import styled from '@emotion/styled';
import translate from 'counterpart';
import { validate as VALIDATE } from 'revalidator';
import { Button } from '@packages/ui/atoms/Button';

import { LabelPassword } from '../Label/LabelPassword';
import { LowerCasedLabelForm } from '../Label/LowerCasedLabelForm';
import FlashMessage from '../lib/FlashMessage';
import IntroductionTop from '../lib/IntroductionTop';

const IllustrationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

class PasswordReset extends React.Component {

    constructor () {

        super();

        this.state = {
            verification: '',
            'reset-password-new': ''
        };

    }

    onChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });

    };

    rescuePassword = () => {

        let paramErrors = VALIDATE(this.state, {
            properties: {
                verification: {
                    type: 'string',
                    allowEmpty: false,
                    required: true,
                    pattern: /^[\S]+$/,
                    messages: {
                        allowEmpty: 'Please enter the verification code.',
                        required: 'Please enter the verification code.',
                        pattern: 'Please enter a valid verification code'
                    }
                },
                'reset-password-new': {
                    type: 'string',
                    allowEmpty: false,
                    required: true,
                    minLength: 6,
                    pattern: /^[\S]+$/,
                    messages: {
                        allowEmpty: 'Please enter the verification code.',
                        required: 'Please enter the verification code.',
                        minLength: 'Please enter a valid password with a minimum of 6 characters.',
                        pattern: 'Password cannot contain spaces'
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

        this.props.onPasswordReset(
            this.state.verification,
            this.state['reset-password-new'],
            () => {
                this.props.onSuccess(this.state['reset-password-new']);
            },
            error => {
                this.setState({
                    'reset-password-new': ''
                });
                document.getElementsByName('reset-password-new')[0].value = '';
                this.props.onFailure(error);
            }
        );

        return false;

    };

    render () {

        return (
            <div>
                <div className='password-rescue-container login-container row'>
                    <div className='container wrapper'>
                        <div className='col s12 m12 l7 m-info-login-container '>
                            <div className='m-info-payment'>
                                <div className='container'>
                                    <div className='container'>
                                        <IllustrationContainer>
                                            <img
                                                src='./images/password-reset.svg'
                                                alt=''
                                            />
                                        </IllustrationContainer>
                                        <div className='col s12'>
                                            <IntroductionTop
                                                principal={ translate('Please, enter your verification code') }
                                                content=''
                                            />
                                        </div>
                                        <FlashMessage
                                            flashMessage={ this.props.flashMessage }
                                            flashType={ this.props.flashType }
                                        />
                                        <form className='col s12'>
                                            <LowerCasedLabelForm
                                                send={ this.rescuePassword }
                                                inputName='verification'
                                                labelContent={ translate('Verification code') }
                                                onChange={ this.onChange }
                                            />
                                            <LabelPassword
                                                send={ this.rescuePassword }
                                                inputName='reset-password-new'
                                                labelContent={ translate('New password') }
                                                onChange={ this.onChange }
                                            />
                                            <Button
                                                style={{ marginBottom: 32, marginTop: 10 }}
                                                id='password-reset'
                                                variant='secondary'
                                                isFullWidth
                                                onClick={ this.rescuePassword }>
                                                { translate('Rescue password') }
                                            </Button>
                                        </form>
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

export default PasswordReset;