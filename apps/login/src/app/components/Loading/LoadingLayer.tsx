import { FC } from 'react';

import { CircularProgress } from './CircularProgress';

import styles from './LoadingLayer.module.scss';

export const LoadingLayer: FC = () => {
    return (
        <div className={styles.loadingLayer}>
            <div className={styles.progressWrapper}>
                <CircularProgress thickness={5} className={styles.progress} />
            </div>
        </div>
    );
};

export default LoadingLayer;

