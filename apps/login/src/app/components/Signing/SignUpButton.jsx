import React, { Component } from 'react';
import translate from 'counterpart';

import { StyledBlockerDiv, StyledButton } from './ButtonStyles.jsx';

export class SignUpButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledBlockerDiv>
                <StyledButton data-qa='sign-up-button' variant='primary' id='sign-up' onClick={this.props.attemptSignUp} isFullWidth>
                    {translate('Sign Up')}
                </StyledButton>      
            </StyledBlockerDiv>
        );
    }
}
