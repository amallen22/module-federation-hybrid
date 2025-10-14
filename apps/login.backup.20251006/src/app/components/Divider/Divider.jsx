import React from 'react';
import styled from '@emotion/styled';
import { Divider as DividerUI } from '@mui/material';
import translate from 'counterpart';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

import { APP_CONFIG } from '../../config/appConfig';

const { PrimaryFontFamily } = dsmTypography;

const DividerWrapper = styled.div`
    ${ PrimaryFontFamily };
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    color: ${ dsmColors.colorNeutral500 };
    letter-spacing: 2.5px;
`;

const DividerElement = styled(DividerUI)`
    width: 40%;
`;

const Divider = () => {
    const googleClientId = APP_CONFIG.googleLoginConfig && APP_CONFIG.googleLoginConfig.clientId;
    const linkedInClientId = APP_CONFIG.linkedInLoginConfig && APP_CONFIG.linkedInLoginConfig.clientId;

    if (!googleClientId && !linkedInClientId) return null;

    return (
        <DividerWrapper>
            <DividerElement />
            {translate('or')}
            <DividerElement />
        </DividerWrapper>
    );
};

export { Divider };