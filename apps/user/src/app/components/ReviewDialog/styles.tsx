import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

interface Props {
    show: boolean;
}

export const Dialog = styled.dialog`
    border: none;
    height: 630px;
    min-width: 800px;
    padding: 0;
    max-width: 872px;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;

    &.show {
        &::backdrop {
            opacity: 1;
        }
        opacity: 1;
    }

    @media only screen and (max-width: 880px) {
        min-width: 100%;
    }

    @media only screen and (max-width: 480px) {
        min-height: 100%;
        width: 100%;
        margin: 0;
        border-radius: 0;
        min-width: 100%;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        border: 1px solid black;
    }
    &::backdrop {
        opacity: 0;
        transition: opacity 0.3s ease;
        background-color: rgba(0, 0, 0, 0.5);
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: ${dsmColors.colorNeutral100};
        border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #4242427d;
        border-radius: 100px;
    }
`;

export const Container = styled.form`
    display: flex;
    width: 855px;
    min-height: 100%;
    position: relative;
    flex-direction: column;
    box-sizing: border-box;
    align-items: flex-end;
    padding: 0 42px;
    padding-bottom: 32px;
    background: ${dsmColors.colorNeutral100};

    @media only screen and (max-width: 880px) {
        width: 100%;
    }
`;

export const Cross = styled.img`
    background: ${dsmColors.colorNeutral300};
    box-sizing: border-box;
    margin-top: 16px;
    height: 30px;
    padding: 8px;
    border-radius: 50%;
    width: 30px;
    top: 16px;
    right: 24px;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 16px;
    z-index: 15;
    margin-right: -20px;
    cursor: pointer;

    &:hover {
        background-color: ${dsmColors.colorNeutral400};
    }
`;

export const Title = styled.h1`
    ${dsmTypography.XLTitle}
    padding-bottom: 48px;
    padding-top: 16px;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    background: linear-gradient(to bottom, ${dsmColors.colorNeutral100} 70%, rgba(0, 0, 0, 0) 100%);
    z-index: 10;
    text-align: center;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0px;
`;

export const DocumentBox = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    @media only screen and (max-width: 600px) {
        justify-content: center;
    }
    @media only screen and (max-width: 480px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const Footer = styled.div`
    margin-top: 24px;
    display: flex;
    width: 100%;
    justify-content: center;
    height: 20px;
`;

export const ShowMoreButton = styled.button<Props>`
    ${dsmTypography.SBodyText}
    color: ${dsmColors.colorPrimary400Base};
    text-align: center;
    font-weight: 500;
    margin: 16px;
    display: none;
    ${(props) =>
        props.show &&
        `
        display: block;
    `}

    &:hover {
        font-weight: 700;
        cursor: pointer;
        color: ${dsmColors.colorPrimary600};
    }
`;
