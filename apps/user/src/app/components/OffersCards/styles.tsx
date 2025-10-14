import styled from '@emotion/styled';
import { dsmBreakpoints, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;
const CardsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 32px;
    row-gap: 16px;
    ${breakpoint.screenM} {
        justify-content: space-between;
    }
`;

const CardWrapper = styled.div`
    max-width: none;
    height: min-content;
    .cv-product-card {
        width: 100%;
    }
    ${breakpoint.screenM} {
        max-width: 380px;
        width: calc(100% / 3 - 16px);
        height: auto;
        position: relative;
    }
`;

const Disclaimer = styled.div`
    ${dsmTypography.PrimaryFontFamily};
    padding-left: 16px;
    margin: 16px 0 0;
    ${breakpoint.screenM} {
        margin: 16px 0 56px;
        position: absolute;
    }
    color: var(--base-neutral-fg-default, #62666a);
    font-size: 10px;
    line-height: 16px; /* 160% */
    letter-spacing: 0.5px;
`;

export { CardsContainer, CardWrapper, Disclaimer };
