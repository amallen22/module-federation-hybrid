import React from 'react';

import { Container, ContainerLeft, ContainerRight } from './styles';
import template1 from './template1.svg';
import template2 from './template2.svg';
import template3 from './template3.svg';
import templateFront from './templateFront.svg';

interface Props {
    isHovered: boolean;
}

export const TemplatesAnimation = ({ isHovered }: Props) => {
    return (
        <Container>
            <ContainerLeft isHovered={isHovered}>
                <img src={templateFront} />
                <img src={template1} />
            </ContainerLeft>
            <ContainerRight isHovered={isHovered}>
                <img src={template2} />
                <img src={template3} />
            </ContainerRight>
        </Container>
    );
};
