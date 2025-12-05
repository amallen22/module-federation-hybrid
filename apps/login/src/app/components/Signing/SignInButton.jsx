import React, { Component } from 'react';
import translate from 'counterpart';

import { APP_CONFIG } from '../../config/appConfig';
import { StyledBlockerDiv, StyledButton } from './ButtonStyles.jsx';

export class SignInButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledBlockerDiv>
                <StyledButton variant='primary' data-qa='sign-in-button' id='sign-in' onClick={this.props.attemptSignIn} isFullWidth>
                    {translate('Log in to %(appName)s', { appName: APP_CONFIG.appName })}
                </StyledButton>            
            </StyledBlockerDiv>
        );
    }
}