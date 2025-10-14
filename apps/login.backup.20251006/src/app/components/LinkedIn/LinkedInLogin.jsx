import React, { Component } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import translate from 'counterpart';

import { APP_CONFIG } from '../../config/appConfig';
import { withLoginComponent } from '../../hoc/withLoginComponent';
import LinkedinIcon from '../../public_common/login/images/icons/linkedin-icon.svg';

const LinkedinButton = styled(Button)`
    background-color: #FFF;
    align-items: center;
    color: #7B8A94;
    border-radius: 24px;
    font-size: 14px;
    border: solid 1px rgba(33,71,97,0.4);
`;

const LinkedinButtonIcon = styled.img`
    align-self: flex-start;
    margin: 0 10px 0 0;
`;

class LinkedInLogin extends Component {

    constructor (props) {
        super(props);

        this.linkedInClientId = APP_CONFIG.linkedInLoginConfig.clientId;
    }

    componentDidMount () {
        this.props.setRenderedComponent({
            name: 'linkedinButton',
            node: document.getElementById('sign-in-linkedin')
        });
    }

    render () {
        if (!this.linkedInClientId) {
            return null;
        }

        return (
            <LinkedinButton
                data-qa='signin-linkedin-modal-button'
                id='sign-in-linkedin'
            >
                <LinkedinButtonIcon src={LinkedinIcon} />
                {translate('LinkedIn')}
            </LinkedinButton>
        );
    }
}

const EnhancedLinkedInLogin = withLoginComponent((LinkedInLogin));

export { EnhancedLinkedInLogin as LinkedInLogin };
