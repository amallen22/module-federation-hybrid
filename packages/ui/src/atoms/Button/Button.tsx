import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CvElement } from '../../types/CvElement';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CvElement {
  isFullWidth?: boolean;
  shape?: 'rounded' | 'square';
  size?: 'S' | 'M';
  variant?: 'primary' | 'secondary' | 'gradient';
}

export const Button = ({
  'data-qa': dataQa,
  children,
  id,
  isFullWidth = false,
  shape = 'square',
  size = 'M',
  type = 'button',
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles['cv-button'],
        styles[`cv-button--${shape}`],
        styles[`cv-button--${size}`],
        styles[`cv-button--${variant}`],
        {
          [styles['cv-button--full-width']]: isFullWidth
        },
        className
      )}
      data-qa={dataQa ? dataQa : ''}
      id={id}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

