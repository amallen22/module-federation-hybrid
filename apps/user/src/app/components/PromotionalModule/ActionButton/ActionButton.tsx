import React from 'react';

import { ActionText, Container } from './styles';

interface Props {
    handleClick: () => void;
    children: any;
    isHovered: boolean;
}

export const ActionButton = ({ handleClick, children, isHovered }: Props) => {
    return (
        <Container onClick={() => handleClick()}>
            <ActionText isHovered={isHovered}> {children}</ActionText>
        </Container>
    );
};
