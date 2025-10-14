import React from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled.div`
    padding: 5px 0 10px 10px;
    font-size: 12px;
    color: #808080;
    position: absolute;
    top: -31px;
`;

export const HelpMessage = ({ show, children }) => {

    return (
        <StyledDiv className={ !show && 'hide' }>
            { children }
        </StyledDiv>
    );
};