import React from 'react';
import { Button } from '@packages/ui/atoms/Button';

export const StyledBlockerDiv = ({ children, ...props }) => (
    <div
        style={{
            width: '100%',
            cursor: 'pointer',
            position: 'relative',
            margin: '20px auto 32px'
        }}
        {...props}
    >
        {children}
    </div>
);

// StyledButton ahora es simplemente el Button con variant primary
// Los estilos personalizados se pueden añadir vía className si es necesario
export const StyledButton = Button;