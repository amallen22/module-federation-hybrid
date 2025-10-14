import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import translate from 'counterpart';

import { APP_CONFIG } from '../../config/appConfig';
import { withLoginComponent } from '../../hoc/withLoginComponent';
import GoogleIcon from '../../public_common/login/images/icons/google-icon.svg';

const GoogleButton = styled(Button)`
    border-radius: 24px;
    color: #7B8A94;
    background-color: #FFF;
    border: solid 1px rgba(33,71,97,0.4);
    align-items: center;
    font-size: 14px;
`;

const GoogleButtonIcon = styled.img`
    margin: 0 10px 0 0;
`;

const GoogleLogin = ({ setRenderedComponent, googleProvider }) => {
    const googleClientId = APP_CONFIG.googleLoginConfig.clientId;

    useEffect(() => {
        if (!googleClientId) return;

        setRenderedComponent({
            name: 'googleButton',
            node: document.getElementById('sign-in-google')
        });
    }, []);

    const handleClick = () => {
        googleProvider.getToken();
    };

    return (
        <GoogleButton
            data-qa='signin-google-modal-button'
            id='sign-in-google'
            onClick={() => handleClick()}
        >
            <GoogleButtonIcon src={GoogleIcon} />
            {translate('Google')}
        </GoogleButton>
    );
};

const EnhancedGoogleLogin = withLoginComponent(GoogleLogin);
export { EnhancedGoogleLogin as GoogleLogin };

