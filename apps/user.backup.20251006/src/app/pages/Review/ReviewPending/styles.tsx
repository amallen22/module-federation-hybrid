import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

export const PageWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 10vh;
`;

export const Title = styled.h1`
    margin: 0;
    margin-top: -20px;
    width: 100%;
    margin-bottom: 16px;
    ${dsmTypography.XLTitle}
    order: 2;
    text-align: center;
    justify-self: center;

    @media only screen and (max-width: 730px) {
        order: 1;
        margin-top: 0;
        margin-bottom: 16px;
    }
`;

export const SubTitle = styled.h2`
    margin: 0;
    text-align: center;
    justify-self: center;
    font-size: 12px;
    width: 100%;
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${dsmColors.colorNeutral700};
    margin-bottom: 8px;
    order: 3;
    @media only screen and (max-width: 730px) {
        order: 2;
    }
`;

export const Clock = styled.p`
    margin: 0;
    width: 100%;
    justify-self: center;
    text-align: center;
    font-family: 'Roboto';
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 2px;
    background: linear-gradient(76.84deg, #26a0f4 6.45%, #d800ff 126.05%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    order: 4;
    @media only screen and (max-width: 730px) {
        order: 3;
        margin-bottom: 32px;
    }
`;
