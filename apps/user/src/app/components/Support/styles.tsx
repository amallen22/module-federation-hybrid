import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily, XLTitle, LTitle, SBodyText } = dsmTypography;

const { breakpoint } = dsmBreakpoints;

export const Wrapper = styled.div`
    ${PrimaryFontFamily};
    background-color: ${dsmColors.colorNeutral50};
`;

export const Container = styled.div`
    box-sizing: border-box;
    min-height: calc(100vh - 80px - 106px);
    max-width: 900px;
    padding: 36px 16px;
    margin: 0 auto;
    ${breakpoint.screenM} {
        padding: 60px 16px;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    ${breakpoint.screenM} {
        justify-content: space-between;
    }
`;

export const FlexContainerBottom = styled(FlexContainer)`
    margin-top: 36px;
    align-items: flex-start;
    flex-wrap: wrap;
    ${breakpoint.screenM} {
        margin-top: 100px;
    }
`;

export const Headline = styled.div`
    width: 100%;
    margin-bottom: 36px;
    ${breakpoint.screenM} {
        margin-bottom: 0;
        width: calc(100% - 320px);
    }
`;

export const Title = styled.h1`
    ${LTitle.styles};
    margin: 0 0 16px;
    color: ${dsmColors.colorNeutral900};
    ${breakpoint.screenM} {
        ${XLTitle.styles};
    }
`;

export const Subtitle = styled.h2`
    ${SBodyText.styles};
    margin: 0;
    color: ${dsmColors.colorNeutral700};
`;

export const SupportImage = styled.img`
    width: 100%;
    max-width: 269px;
    height: auto;
    ${breakpoint.screenM} {
        width: 269px;
        height: 267px;
    }
`;

export const Divider = styled.div`
    height: 24px;
    width: 100%;
    ${breakpoint.screenM} {
        display: none;
    }
`;
