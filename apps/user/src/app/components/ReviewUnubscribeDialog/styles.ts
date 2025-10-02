import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

interface Props {
    isMobile?: boolean;
}

export const ModalContainer = styled.div`
    position: relative;
    top: 0;
    background-color: red;

    #cv-modal-background {
        #cv-modal-container {
            height: 100svh;
            max-height: 100svh;
            svg {
                background-color: ${dsmColors.colorNeutral200};
                height: 28px;
                width: 28px;
                padding: 4px;
                border-radius: 28px;
            }
        }
    }

    #cv-modal-content {
        max-height: 100svh !important;
        padding-top: 48px;
        height: 100%;
    }
`;

export const StyledCustomCursor = styled.div<Props>`
    position: absolute;
    opacity: 0;
    color: white;
    text-wrap: nowrap;
    padding: 8px 14px;
    background: linear-gradient(0deg, #e34340 -1.79%, #ff514e 47.32%, #ff514e 89.82%, #ffa8a7 100%);
    border-radius: 50px;
    pointer-events: none;
    z-index: 9999;
    animation: moveCursor 1s ease-in-out;
    animation-delay: 250ms;
    animation-fill-mode: forwards;

    &::before {
        content: '';
        position: absolute;
        top: -26px;
        left: 50%;
        width: 12px;
        height: 18px;
        background-color: #ff514e;
        clip-path: path(
            'M0.349976 14.0858V1.55187C0.349976 0.642309 1.46577 0.205061 2.08374 0.872461L11.295 10.8206C11.8877 11.4608 11.4337 12.5 10.5612 12.5H4.76419C4.49897 12.5 4.24462 12.6054 4.05708 12.7929L2.05708 14.7929C1.42712 15.4229 0.349976 14.9767 0.349976 14.0858Z'
        );
        transform: translateX(-50%);
    }

    ${(props) =>
        props.isMobile &&
        `
        animation: moveCursorMobile 1s ease-in-out;
        animation-delay: 250ms;
        animation-fill-mode: forwards;
    `}

    @keyframes moveCursor {
        from {
            opacity: 0;
            transform: translate(270px, 140px);
        }
        to {
            opacity: 1;
            transform: translate(110px, 120px);
        }
    }
    @keyframes moveCursorMobile {
        from {
            opacity: 0;
            transform: translate(58px, 470px);
        }
        to {
            opacity: 1;
            transform: translate(50px, 390px);
        }
    }
`;

export const BodyText = styled.p<Props>`
    margin: 0;
    ${dsmTypography.bodyM};
    font-size: 16px;
    line-height: 24px;
    color: ${dsmColors.colorNeutral700};

    &:not(:only-child) {
        min-height: 72px;
        display: flex;
        align-items: end;
    }

    ${(props) =>
        props.isMobile &&
        `
        margin-bottom: 16px;
        min-height: initial !important;
    `}
`;

export const StyledBody = styled.div<Props>`
    display: flex;
    gap: 32px;
    position: relative;
    ${(props) =>
        props.isMobile &&
        `
        flex-direction: column;
        gap: 8px;
        align-items: center;
        flex-grow: 1;
    `}
`;

export const StyledImg = styled.img`
    width: 100%;
`;
export const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 24px;
    min-width: 222px;
    ${dsmTypography.PrimaryFontFamily};
    ${dsmTypography.bodyM};
    color: ${dsmColors.colorNeutral700};
    justify-content: flex-start;

    p {
        margin: 0;
        padding: 0;
    }
`;

export const ClockContainer = styled.div<Props>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 24px;
    span {
        color: ${dsmColors.colorNeutral700};
        ${dsmTypography.Overline};
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 1.5px;
        margin-bottom: 8px;
    }
    p {
        width: auto !important;
        font-size: 16px;
        font-weight: 500;
        font-size: 24px;
    }

    ${(props) =>
        props.isMobile &&
        `
        align-items: center;
        margin-top: 24px;
    `}
`;

export const ButtonContainer = styled.div<Props>`
    display: flex;
    justify-content: flex-end;
    gap: 24px;
    ${(props) =>
        props.isMobile &&
        `
        flex-direction: column;
        gap: 16px;
        align-items: center;
    `}
`;

export const OutlinedButton = styled.button`
    ${dsmTypography.PrimaryFontFamily};
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-transform: capitalize;
    cursor: pointer;
    color: #006ecc;
`;

export const HeaderTitle = styled.p<Props>`
    margin: 0;
    padding: 0;
    color: #1e2021;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
`;

export const MainButton = styled.button`
    ${dsmTypography.PrimaryFontFamily};
    display: flex;
    height: 48px;
    padding: 16px 32px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    cursor: pointer;
    background-color: #006ecc;
    color: white;
`;
