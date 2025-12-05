import { FC } from 'react';

import styles from './CircularProgress.module.scss';

interface CircularProgressProps {
  thickness?: number;
  className?: string;
}

export const CircularProgress: FC<CircularProgressProps> = ({
    thickness = 5,
    className = ''
}) => {
    const style = {
        '--thickness': `${thickness}px`
    } as React.CSSProperties;

    return (
        <div
            className={`${styles.circularProgress} ${className}`}
            style={style}
            role="progressbar"
            aria-label="Loading"
        >
            <svg className={styles.svg} viewBox="22 22 44 44">
                <circle
                    className={styles.circle}
                    cx="44"
                    cy="44"
                    r="20.2"
                    fill="none"
                    strokeWidth={thickness}
                />
            </svg>
        </div>
    );
};

