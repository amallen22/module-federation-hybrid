import React, { Component } from 'react';
import translate from 'counterpart';

import { StyledBlockerDiv, StyledButton } from './ButtonStyles';

export class SignUpButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledBlockerDiv>
                <StyledButton data-qa='sign-up-button' color='primary' id='sign-up' onClick={this.props.attemptSignUp} style={{ width: '100%' }}>
                    {translate('Sign Up')}
                </StyledButton>      
            </StyledBlockerDiv>
        );
    }
}
