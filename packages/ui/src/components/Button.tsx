import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    ...style
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#0070f3',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#f5f5f5',
      color: '#000',
      border: '1px solid #ddd',
    },
  };

  return (
    <button
      onClick={onClick}
      className={className}
      style={{ ...baseStyles, ...variantStyles[variant] }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

