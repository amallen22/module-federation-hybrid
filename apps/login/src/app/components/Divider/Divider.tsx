import { FC } from 'react';
import translate from 'counterpart';

import { APP_CONFIG } from '../../config/appConfig';

import styles from './Divider.module.scss';

export const Divider: FC = () => {
    const googleClientId = APP_CONFIG.googleLoginConfig?.clientId;
    const linkedInClientId = APP_CONFIG.linkedInLoginConfig?.clientId;

    if (!googleClientId && !linkedInClientId) {
        return null;
    }

    return (
        <div className={styles.dividerWrapper}>
            <div className={styles.dividerElement} />
            {translate('or')}
            <div className={styles.dividerElement} />
        </div>
    );
};

