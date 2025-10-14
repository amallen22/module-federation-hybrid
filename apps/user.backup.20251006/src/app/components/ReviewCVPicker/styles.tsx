import styled from '@emotion/styled';
import { dsmColors, dsmTypography, GradientButton } from '@npm_leadtech/cv-lib-app-components';

export const Container = styled.div`
    border-radius: 24px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 4px 0px #d9dde0;

    @media only screen and (max-width: 480px) {
        width: calc(100% + 48px);
        margin-left: -24px;
        border-radius: 0;
    }
`;

export const PreviewBody = styled.div`
    height: 237px;
    width: 100%;
    box-sizing: border-box;
    background: ${dsmColors.colorNeutral200};
    padding: 16px 24px 0 24px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LoaderContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const DocumentTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    flex-grow: 1;
    color: ${dsmColors.colorNeutral700};
`;

export const ChangeButton = styled.button`
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    cursor: pointer;
    color: ${dsmColors.colorPrimary400Base};

    &:hover,
    &:focus-visible {
        color: ${dsmColors.colorPrimary700};
    }

    &:focus-visible {
        outline: auto;
    }
`;

export const StyledGradientButton = styled(GradientButton)`
    height: 48px;
    span {
        text-transform: uppercase;
        letter-spacing: 1.25px;
        font-weight: 500;
        font-size: 14px;
    }
    @media only screen and (max-width: 480px) {
        order: 5;
        height: 70px;
        border-radius: 0;
        width: calc(100% + 32px) !important;
        margin-left: -16px;
        margin-top: 0 !important;
        padding-bottom: 24px;
    }
`;

export const DocumentDate = styled.button`
    font-size: 12px;
    line-height: 24px;
    width: 100%;
    font-weight: 400;
    color: ${dsmColors.colorNeutral700};
    text-align: left;
    width: 100%;
    text-transform: uppercase;
`;

export const PreviewHeader = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
`;

export const PreviewThumbnail = styled.img`
    bottom: -40px;
    width: 272px;
    transition: transform 500ms;
    border-radius: 4px;
    box-shadow: 0px 0px 25.6px 0px rgba(0, 0, 0, 0.12);
`;

export const PreviewActions = styled.div`
    background: white;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
        padding: 16px;
        width: 100%;
        margin-top: 12px;
        display: flex;
        justify-content: center;
    }

    @media only screen and (max-width: 480px) {
        padding: 16px;
        padding-top: 24px;
        gap: 16px;
        padding-bottom: 0;
    }
`;

export const BottomText = styled.p`
    margin: 0;
    padding: 0 8px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: ${dsmColors.colorNeutral700};
    span {
        font-weight: 600;
    }

    @media only screen and (max-width: 480px) {
        order: 4;
        line-height: 16px;
        font-size: 12px;
        margin-top: 18px !important;
        margin-bottom: 4px !important;
        text-align: center;
    }
`;

export const DesiredJob = styled.p`
    ${dsmTypography.STitle}
`;
