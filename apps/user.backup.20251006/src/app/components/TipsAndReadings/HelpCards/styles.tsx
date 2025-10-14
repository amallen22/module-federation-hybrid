import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

const CardsWrapper = styled.div`
    width: 100%;
    ${breakpoint.screenL} {
        padding-left: 54px;
        width: 50%;
    }
    @media (max-width: 992px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
`;

const Card = styled.div`
    display: flex;
    align-items: stretch;
    width: 100%;
    min-height: 134px;
    background-color: ${(props) => props.color};
    box-sizing: border-box;
    word-break: break-word;
    &:not(:last-child) {
        margin-bottom: 16px;
        ${breakpoint.screenS} {
            margin-bottom: 24px;
        }
    }
    ${breakpoint.screenS} {
        border-radius: 4px;
    }
    ${breakpoint.screenL} {
        width: calc(50% - 17px);
    }
    ${breakpoint.screenM} {
        width: 100%;
    }
`;

const FlexWrapper = styled.div`
    width: calc(100% - 64px);
    padding: 16px;
    ${breakpoint.screenS} {
        display: flex;
        align-items: center;
        padding: 8px;
    }
`;

const CardIcon = styled.img`
    width: 24px;
    height: auto;
    ${breakpoint.screenS} {
        width: 60px;
    }
`;

const CardTextWrapper = styled.div`
    padding: 8px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    ${breakpoint.screenS} {
        padding: 24px 24px 24px 12px;
    }
`;

const CardTitle = styled.p`
    ${PrimaryFontFamily};
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    color: ${dsmColors.colorNeutral900};
    margin: 0 0 8px;
    ${breakpoint.screenS} {
        font-size: 20px;
    }
`;

const CardSubTitle = styled.p`
    ${PrimaryFontFamily};
    font-size: 14px;
    line-height: 1.4;
    color: ${dsmColors.colorNeutral900};
    margin: 0;
    ${breakpoint.screenS} {
        font-size: 15px;
    }
`;

const CardIconWrapper = styled.a`
    display: block;
    width: 80px;
    border-left: 2px solid rgba(30, 32, 33, 0.1);
    color: ${dsmColors.colorNeutral900};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &:visited,
    &:focus,
    &:hover {
        color: ${dsmColors.colorNeutral900};
    }
    svg {
        width: 24px;
        margin: 0 auto;
    }
`;

export { CardsWrapper, Card, CardTitle, CardSubTitle, CardTextWrapper, CardIconWrapper, CardIcon, FlexWrapper };
