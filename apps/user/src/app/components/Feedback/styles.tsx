import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily, XLTitle, LTitle, MTitle, STitle, MBodyText } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

export const Wrapper = styled.div`
    background-color: ${dsmColors.colorNeutral50};
    min-height: calc(100vh - 64px - 106px);
`;

export const Container = styled.div`
    ${PrimaryFontFamily};
    margin: 0 auto;
    padding: 32px 16px;
    max-width: 570px;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${breakpoint.screenM} {
        padding: 56px 16px;
    }
`;

export const Title = styled.h1`
    ${LTitle.styles};
    color: ${dsmColors.colorNeutral900};
    text-align: center;
    margin: 16px 0;
    ${breakpoint.screenM} {
        ${XLTitle.styles};
    }
`;

export const Subtitle = styled.h2`
    ${STitle.styles};
    color: ${dsmColors.colorNeutral900};
    text-align: center;
    margin: 16px 0 32px;
    ${breakpoint.screenM} {
        ${MTitle.styles};
        margin: 16px 0 56px;
    }
`;

export const ReasonWrapper = styled.div`
    width: 100%;
    &:not(:last-child) {
        margin-bottom: 16px;
    }
`;

export const ReasonCard = styled.div`
    ${STitle.styles};
    color: ${dsmColors.colorNeutral700};
    background-color: ${dsmColors.colorNeutral200};
    border: 1px solid transparent;
    padding: 24px 32px;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s;
    &.selected,
    &:hover {
        color: ${dsmColors.colorPrimary500};
        background-color: ${dsmColors.colorPrimary50};
        border: 1px solid ${dsmColors.colorPrimary400Base};
    }
`;

export const ReasonBox = styled.div`
    transition: 0.2s all;
`;

export const ReasonText = styled.p`
    ${STitle.styles};
    color: ${dsmColors.colorNeutral700};
    margin: 16px 0 0;
`;

export const ReasonTextField = styled.textarea`
    ${PrimaryFontFamily};
    ${MBodyText.styles};
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
    border-radius: 4px;
    border: 2px solid ${dsmColors.colorNeutral200};
    margin-top: 16px;
    resize: none;
    &::placeholder {
        ${STitle};
        font-style: italic;
        color: #b8b8b8;
    }
`;

export const Disclaimer = styled.div`
    font-size: 12px;
    line-height: 1.33;
    letter-spacing: 0.4px;
    text-align: center;
    color: ${dsmColors.colorNeutral700};
    max-width: 320px;
    margin-top: 16px;
`;
