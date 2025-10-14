import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

export const Select = styled.div`
    text-transform: uppercase;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 1.25px;
    z-index: 5;
    position: absolute;
    background: ${dsmColors.colorPrimary400Base};
    border-radius: 50px;
    color: white;
    border: none;
    padding: 0;
    outline: inherit;
    padding: 10px 32px;
    opacity: 0;
    transition: opacity 0.2s;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: fit-content;
`;

export const Card = styled.button`
    border: none;
    padding: 0;
    outline: inherit;
    height: 341px;
    width: 240px;
    border-radius: 4px;
    position: relative;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 4px 0px #d9dde0;
    background: gainsboro;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        .select {
            opacity: 1 !important;
        }
    }
`;

export const Thumbnail = styled.img`
    z-index: 1;
    height: 100%;
    width: 100%;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
`;

export const Footer = styled.div`
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    z-index: 2;
    min-height: 72px;
    background: white;
    padding: 16px;
`;

export const DocumentTitle = styled.p`
    margin: 0;
    padding: 0;
    ${dsmTypography.STitle};
    text-align: left;
`;

export const DocumentDate = styled.p`
    margin: 0;
    padding: 0;
    line-height: 16px;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1.2px;
    font-weight: 500;
    color: ${dsmColors.colorNeutral500};
    text-align: left;
`;
