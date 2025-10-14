import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

const PageWrapper = styled.div`
    background-color: ${dsmColors.colorNeutral50};
    max-width: 100%;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const PageContainer = styled.div`
    margin: 0 auto;
    max-width: 1180px;
    padding: 36px 16px;
    ${breakpoint.screenS} {
        padding: 72px 32px;
    }
`;

const FlexContainer = styled.div`
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${breakpoint.screenL} {
        justify-content: space-between;
    }
`;

const HeaderContainer = styled(FlexContainer)`
    align-items: flex-start;
`;

const Headline = styled.div`
    margin: 0 24px 20px 0;
    ${dsmTypography.PrimaryFontFamily};
    box-sizing: border-box;
    ${breakpoint.screenL} {
        width: calc(100% - 380px);
        margin: 0 0 20px 0;
    }
`;

export const Title = styled.h1`
    padding: 0 24px 0 0;
    margin: 0 0 16px;
    ${dsmTypography.LTitle.styles};
    color: ${dsmColors.colorNeutral900};
    ${breakpoint.screenM} {
        padding: 0 24px 0 0;
        margin: 0 0 16px;
        ${dsmTypography.XLTitle.styles};
        font-weight: 700;
    }
`;

export const Subtitle = styled.p`
    ${dsmTypography.SBodyText.styles};
    margin: 0;
    color: ${dsmColors.colorNeutral700};
`;

const HeaderLabel = styled.div`
    ${dsmTypography.PrimaryFontFamily};
    padding: 6px 16px;
    border-radius: 24px;
    background-color: #daeffd;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.67;
    letter-spacing: 1.5px;
    color: ${dsmColors.colorPrimary400Base};
    text-transform: uppercase;
    margin-top: 20px;
    display: table;
`;

export { PageWrapper, PageContainer, HeaderContainer, Headline, HeaderLabel, FlexContainer };
