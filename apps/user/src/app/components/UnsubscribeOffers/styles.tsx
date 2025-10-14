import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

export const PageWrapper = styled.div`
    background-color: ${dsmColors.colorNeutral50};
    max-width: 100%;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const PageContainer = styled.div`
    margin: 0 auto;
    max-width: 980px;
    /* max-width: 1180px; */
    padding: 36px 16px;
    ${breakpoint.screenS} {
        padding: 24px 16px 36px;
    }

    display: grid;
    grid-template-rows: repeat(4, auto);
    grid-template-columns: 1fr;
    grid-template-areas:
        'title'
        'offers'
        'helpcard'
        'buttons';
    min-height: calc(100vh + 24px);
    gap: 16px;
    ${breakpoint.screenS} {
        gap: 0px 0px;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:
            'title title helpcard'
            'offers offers offers'
            'buttons buttons buttons';
    }
`;

export const HelpCardGridArea = styled.div`
    grid-area: helpcard;
    justify-items: end;
    width: 100%;
`;

export const OffersCardsGridArea = styled.div`
    grid-area: offers;
`;

export const UnsubscribeButtonsGridArea = styled.div`
    grid-area: buttons;
    text-align: center;
    margin-top: 60px;
    ${breakpoint.screenS} {
        text-align: start;
    }
    .cv-unsubscribe-button__title {
        font-size: 16px;
        line-height: 24px;
    }
    .cv-button {
        --cv-button-background: transparent;
    }
`;

export const HeadlineGridArea = styled.div`
    grid-area: title;
    ${dsmTypography.PrimaryFontFamily};
    box-sizing: border-box;
`;

export const Title = styled.h1`
    padding: 0 24px 0 0;
    margin: 0 0 16px;
    color: var(--color-neutrals-900-text-base, #1e2021);
    font-size: 24px;
    line-height: 32px;
    color: ${dsmColors.colorNeutral900};
    ${breakpoint.screenM} {
        font-size: 16px;
        line-height: 24px;
        padding: 0 24px 0 0;
        margin: 0 0 16px;
        ${dsmTypography.XLTitle.styles};
        font-weight: 700;
    }
`;

export const Subtitle = styled.p`
    color: ${dsmColors.colorNeutral700};
    line-height: 24px;
    font-size: 16px;
`;
