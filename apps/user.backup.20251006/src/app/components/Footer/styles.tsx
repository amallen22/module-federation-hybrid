import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;

export const StyledFooterDiv = styled.div`
    text-align: center;
    ${PrimaryFontFamily};
    width: 100%;
    box-sizing: border-box;
    color: ${dsmColors.colorNeutral300};
    font-size: 14px;
    padding: 32px 16px;
    background: ${dsmColors.colorNeutral200};
    & .address {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        & .image-address {
            padding: 2px;
        }
    }
    & .links {
        text-transform: uppercase;
        font-weight: 500;
        padding-bottom: 10px;
        font-size: 12px;
        letter-spacing: 1.5px;
        a {
            color: ${dsmColors.colorNeutral500};
            &:not(:last-child) {
                margin-right: 6px;
                padding-right: 6px;
                border-right: 2px solid ${dsmColors.colorNeutral300};
            }
        }
    }
    & .qa-link-terms,
    & .qa-link-privacy,
    & .qa-link-contact {
        color: ${dsmColors.colorNeutral500};
        &:hover {
            color: ${dsmColors.colorNeutral600};
        }
    }
`;

export const StyledLinks = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`;
