import React from 'react';
import styled from '@emotion/styled';
import { dsmColors, dsmTypography, Link } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;

const Label = styled.div`
    ${PrimaryFontFamily};
    font-size: 16px;
    line-height: 24px;
    color: ${dsmColors.colorNeutral800};
    margin-right: 5px;
`;

const RedirectionWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 8px;
`;

const SigningRedirection = ({ label, redirectionLabel, redirection, redirectionDataQa }) => {

    const handleRedirection = () => {
        window.location.href = redirection;
    };

    return(
        <RedirectionWrapper>
            <Label>
                {label}
            </Label>
            <Link onClick={handleRedirection} data-qa={redirectionDataQa}>
                {redirectionLabel}
            </Link>
        </RedirectionWrapper>
    );
};

export { SigningRedirection };