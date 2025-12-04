import { FC, useEffect } from 'react';
import translate from 'counterpart';
import { Button } from '@packages/ui';

import { APP_CONFIG } from '../../config/appConfig';
import { withLoginComponent } from '../../hoc/withLoginComponent';
import GoogleIcon from '../../public_common/login/images/icons/google-icon.svg';
import styles from './GoogleLogin.module.scss';

interface GoogleLoginProps {
  setRenderedComponent?: (component: { name: string; node: HTMLElement | null }) => void;
  googleProvider?: {
    getToken: () => void;
  };
  onFailure?: (error: any) => void;
  onSignInErrorHandler?: (error: any, translationParams?: any) => void;
}

const GoogleLogin: FC<GoogleLoginProps> = ({ setRenderedComponent, googleProvider }) => {
  const googleClientId = APP_CONFIG.googleLoginConfig?.clientId;

  useEffect(() => {
    if (!googleClientId || !setRenderedComponent) return;

    setRenderedComponent({
      name: 'googleButton',
      node: document.getElementById('sign-in-google')
    });
  }, [googleClientId, setRenderedComponent]);

  const handleClick = () => {
    googleProvider?.getToken();
  };

  if (!googleClientId) {
    return null;
  }

  return (
    <Button
      data-qa="signin-google-modal-button"
      id="sign-in-google"
      onClick={handleClick}
      className={styles.googleButton}
      variant="secondary"
    >
      <img src={GoogleIcon} alt="Google" className={styles.icon} />
      {translate('Google')}
    </Button>
  );
};

const EnhancedGoogleLogin = withLoginComponent(GoogleLogin);
export { EnhancedGoogleLogin as GoogleLogin };

