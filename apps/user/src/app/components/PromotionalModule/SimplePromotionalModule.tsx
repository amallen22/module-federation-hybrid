import React, { useEffect, useState } from 'react';

import { PMColorsType } from './Definitions';
import { Container } from './styles';

interface Props {
    children: React.ReactNode;
    color: PMColorsType;
    handleClick: Function;
    dataQa: string;
    disabled?: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsHovered: (isHovered: boolean) => void;
    isOver?: () => void;
    isOut?: () => void;
    id: string;
    tabIndex: number;
}

export const SimplePromotionalModule = ({
    children,
    handleClick,
    dataQa,
    color,
    disabled,
    setIsHovered,
    isOver,
    isOut,
    tabIndex,
    id,
}: Props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => setLoading(false);
    }, []);

    const onSubmit = () => {
        if (disabled) return;
        handleClick();
        setLoading(true);
    };

    const handleOver = () => {
        if (disabled) return;
        setIsHovered(true);
        if (isOver) isOver();
    };

    const handleOut = () => {
        if (disabled) return;
        setIsHovered(false);
        if (isOut) isOut();
    };

    const onKeyDown = (event: any) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <Container
            tabIndex={tabIndex}
            id={id}
            role='button'
            disabled={disabled || loading}
            color={color}
            onClick={onSubmit}
            onKeyDown={onKeyDown}
            onMouseOut={handleOut}
            onMouseOver={handleOver}
            data-qa={dataQa}
        >
            {children}
        </Container>
    );
};
