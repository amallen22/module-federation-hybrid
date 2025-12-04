import { FC, useEffect, useState } from 'react';
import translate from 'counterpart';
import { Button } from '@packages/ui';

import { APP_CONFIG } from '../../config/appConfig';
import { withLoginComponent } from '../../hoc/withLoginComponent';
import LinkedinIcon from '../../public_common/login/images/icons/linkedin-icon.svg';
import styles from './LinkedInLogin.module.scss';

interface LinkedInLoginProps {
  setRenderedComponent?: (component: { name: string; node: HTMLElement | null }) => void;
  onFailure?: (error: any) => void;
  onSignInErrorHandler?: (error: any, translationParams?: any) => void;
}

const LinkedInLogin: FC<LinkedInLoginProps> = ({ setRenderedComponent }) => {
  const [linkedInClientId] = useState(APP_CONFIG.linkedInLoginConfig?.clientId);

  useEffect(() => {
    if (!linkedInClientId) return;

    setRenderedComponent({
      name: 'linkedinButton',
      node: document.getElementById('sign-in-linkedin')
    });
  }, [linkedInClientId, setRenderedComponent]);

  if (!linkedInClientId) {
    return null;
  }

  return (
    <Button
      data-qa="signin-linkedin-modal-button"
      id="sign-in-linkedin"
      className={styles.linkedInButton}
      variant="secondary"
    >
      <img src={LinkedinIcon} alt="LinkedIn" className={styles.icon} />
      {translate('LinkedIn')}
    </Button>
  );
};

const EnhancedLinkedInLogin = withLoginComponent(LinkedInLogin);

export { EnhancedLinkedInLogin as LinkedInLogin };

