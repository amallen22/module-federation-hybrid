import styled from '@emotion/styled';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

interface Id {
    number: number;
}

export const ContainerBorder = styled.div`
    position: absolute;
    width: max-content;
    height: fit-content;
    padding: 1px;
    border-radius: 50px;
    background: linear-gradient(76.84deg, rgba(38, 160, 244, 0.33) 6.45%, rgba(216, 0, 255, 0.33) 126.05%);
    animation: pulse 10s infinite ease-in-out;

    &:nth-of-type(1) {
        animation-delay: 0s;
    }

    &:nth-of-type(2) {
        animation-delay: -8s;
    }

    &:nth-of-type(3) {
        animation-delay: -5s;
    }

    &:nth-of-type(4) {
        animation-delay: -10s;
    }

    &:nth-of-type(5) {
        animation-delay: -2s;
    }

    @keyframes pulse {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @media only screen and (max-width: 730px) {
        &:nth-of-type(1) {
            animation-delay: -10s;
        }

        &:nth-of-type(2) {
            animation-delay: -4s;
        }

        &:nth-of-type(3) {
            animation-delay: -0s;
        }

        &:nth-of-type(4) {
            animation-delay: -7s;
        }

        &:nth-of-type(5) {
            animation-delay: -2s;
        }
    }
`;

export const Container = styled.div<Id>`
    width: max-content;
    border-radius: 50px;
    background: white;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px;
    ${(props) =>
        props.number > 3
            ? `
        .before {
            display: none !important;
        }
    `
            : `
        .after {
            display: none !important;
        }
    `}

    @media only screen and (max-width: 730px) {
        padding: 6px;
    }
`;

export const Text = styled.p`
    margin: 0;
    font-family: Roboto Mono;
    font-size: 14px;
    margin: 0 6px;
    font-weight: 400;
    line-height: 28px;
    color: ${dsmColors.colorNeutral700};

    @media only screen and (max-width: 730px) {
        font-size: 12px;
        line-height: 12px;
    }

    @media only screen and (max-width: 430px) {
        font-size: 0;
        line-height: 6px;
        height: 6px;
        width: 140px;
        border-radius: 3px;
        background: linear-gradient(76.84deg, #26a0f4 6.45%, #d800ff 126.05%);
        opacity: 23%;
    }
`;

export const Icon = styled.img`
    height: 22px;
    width: 22px;

    @media only screen and (max-width: 730px) {
        height: 16px;
        width: 16px;
    }
`;

export const IconContainer = styled.div`
    width: 40px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    background: linear-gradient(76.84deg, #26a0f4 6.45%, #d800ff 126.05%);

    @media only screen and (max-width: 730px) {
        width: 32px;
        height: 22px;
    }
`;
