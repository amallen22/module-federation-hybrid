import React from 'react';
import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;

const StyledPrincipalLabel = styled.h1`
    ${PrimaryFontFamily};
    margin-top: 32px;
    line-height: 32px;
    font-size: 24px;
    color: ${dsmColors.colorNeutral900};
    font-weight: bold;
`;

const IntroductionTop = ({ principal }) => (
    <StyledPrincipalLabel>
        {principal}
    </StyledPrincipalLabel>
);

export default IntroductionTop;
