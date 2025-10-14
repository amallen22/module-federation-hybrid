import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;

const LanguageContainer = styled.div`
    ${PrimaryFontFamily};
    position: absolute;
    bottom: calc(33% + 44px);
    right: 16px;
    border-radius: 4px;
    padding: 6px 11px 6px 12px;
    background-color: ${dsmColors.colorNeutral300};
    display: flex;
    align-items: center;
    color: ${dsmColors.colorNeutral800};
    font-size: 14px;
`;

const Flag = styled.img`
    width: 20px;
    margin-left: 8px;
`;

export { LanguageContainer, Flag };
