import translate from 'counterpart';
import React from 'react';

import { Container, ContainerBorder, Icon, IconContainer, Text } from './styles';

interface Props {
    id: number;
    text: string;
    icon: string;
}

export const LoaderFeature = ({ id, text, icon }: Props) => {
    return (
        <ContainerBorder className='loaderFeature' id={id.toString()}>
            <Container number={id}>
                <IconContainer className='before'>
                    <Icon src={icon} />
                </IconContainer>
                <Text>{translate(text)}</Text>
                <IconContainer className='after'>
                    <Icon src={icon} />
                </IconContainer>
            </Container>
        </ContainerBorder>
    );
};
