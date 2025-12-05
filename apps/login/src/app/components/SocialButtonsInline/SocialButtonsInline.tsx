import React from 'react';

import { APP_CONFIG } from '../../config/appConfig';
import { GoogleLogin } from '../Google/GoogleLogin';
import { LinkedInLogin } from '../LinkedIn/LinkedInLogin';

import styles from './SocialButtonsInline.module.scss';

interface SocialButtonsInlineProps {
  onFailure?: (error: any) => void;
  onSignInErrorHandler?: (error: any, translationParams?: any) => void;
}

export const SocialButtonsInline: React.FC<SocialButtonsInlineProps> = ({ 
    onFailure, 
    onSignInErrorHandler 
}) => {
    const googleConfig = APP_CONFIG.googleLoginConfig;
    const linkedInConfig = APP_CONFIG.linkedInLoginConfig;

    const renderGoogleLogin = () => {
        if (!googleConfig || !googleConfig.clientId) {
            return null;
        }

        return (
            <GoogleLogin
                onFailure={onFailure}
                onSignInErrorHandler={onSignInErrorHandler}
            />
        );
    };

    const renderLinkedinLogin = () => {
        if (!linkedInConfig || !linkedInConfig.clientId) {
            return null;
        }

        return (
            <LinkedInLogin
                onFailure={onFailure}
                onSignInErrorHandler={onSignInErrorHandler}
            />
        );
    };

    return (
        <div className={styles.socialButtonsWrapper}>
            {renderGoogleLogin()}
            {renderLinkedinLogin()}
        </div>
    );
};

export default SocialButtonsInline;

