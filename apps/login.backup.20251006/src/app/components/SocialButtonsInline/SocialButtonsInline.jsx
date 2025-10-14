import React from 'react';
import styled from '@emotion/styled';

import { APP_CONFIG } from '../../config/appConfig';
import { GoogleLogin } from '../Google/GoogleLogin';
import { LinkedInLogin } from '../LinkedIn/LinkedInLogin';

const SocialButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;
    button {
        width: 47%;
        &:only-child {
            width: 100%;
        }
    }
`;

const SocialButtonsInline = ({ onFailure, onSignInErrorHandler }) => {
    const googleConfig = APP_CONFIG.googleLoginConfig;
    const linkedInConfig = APP_CONFIG.linkedInLoginConfig;

    const renderGoogleLogin = () => {
        if (!googleConfig || !googleConfig.clientId) {
            return null;
        }

        return(
            <GoogleLogin
                onFailure={ onFailure }
                onSignInErrorHandler ={ onSignInErrorHandler }/>
        );
    };

    const renderLinkedinLogin = () => {
        if (!linkedInConfig || !linkedInConfig.clientId) {
            return null;
        }

        return(
            <LinkedInLogin
                onFailure={ onFailure }
                onSignInErrorHandler ={ onSignInErrorHandler }/>
        );
    };
    const renderSocialButtons = () => {
        return (
            <SocialButtonsWrapper>
                {renderGoogleLogin()}
                {renderLinkedinLogin()}
            </SocialButtonsWrapper>
        );
    };

    return renderSocialButtons();
};

export default SocialButtonsInline;
