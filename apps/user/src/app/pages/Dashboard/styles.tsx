import styled from '@emotion/styled';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

interface isMobile {
    isMobile?: boolean;
}

interface props {
    isMobile?: boolean;
    height?: number;
}

export const DB_BREAKPOINT = {
    S: '550px',
    M: '1015px',
    L: '1190px',
    XL: '1980px',
};

export const PageWrapper = styled.div`
    max-width: 100%;
    position: relative;
    display: flex;
    min-height: 100%;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    background: ${dsmColors.colorNeutral50};
`;

export const PageContainer = styled.div<isMobile>`
    height: 100%;
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: roboto;
    gap: 48px;
    box-sizing: border-box;
    padding: 40px 24px 80px 24px;
    ${(props) =>
        props.isMobile &&
        `padding: 24px 16px 48px 16px;
        gap: 24px;
        `}
`;

export const ContainerTitle = styled.h1`
    font-size: 32px;
    font-weight: 500;
    margin: 0;
    line-height: 40px;

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        font-size: 20px;
        line-height: 28px;
        padding: 0 20px;
        text-align: center;
    }
`;

export const Grid = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    @media only screen and (max-width: ${DB_BREAKPOINT.M}) {
        flex-direction: column;
        align-items: center;
    }
`;

export const ColumnLeft = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    width: 648px;

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        width: 100%;
    }
    @media only screen and (max-width: ${DB_BREAKPOINT.L}) {
        width: 549px;
    }
    @media only screen and (max-width: ${DB_BREAKPOINT.M}) {
        width: auto;
        max-width: 645px;
    }
`;

export const Row = styled.div`
    display: flex;
    gap: 24px;
    min-height: 280px;
    height: 280px;
    width: 100%;

    @media only screen and (max-width: ${DB_BREAKPOINT.L}) {
        height: auto;
    }

    @media only screen and (max-width: ${DB_BREAKPOINT.M}) {
        height: 280px;
    }

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        flex-direction: column;
        height: auto;
        min-height: auto;
    }
`;

export const ColumnRight = styled.div`
    float: left;
    display: flex;
    gap: 24px;
    margin-left: 24px;
    width: 456px;
    flex-direction: column;

    @media only screen and (max-width: ${DB_BREAKPOINT.L}) {
        margin-left: 24px;
        width: 385px;
        flex-direction: column;
    }

    @media only screen and (max-width: ${DB_BREAKPOINT.M}) {
        margin-left: 0;
        margin-top: 24px;
        display: grid;
        grid-template-columns: 48% 48%;
        width: 100%;
        max-width: 645px;
        gap: 0;
        grid-gap: 24px;
    }

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        flex-direction: column;
        margin-left: 0;
        gap: 52px;
        margin-top: 24px;
    }
`;

export const Item = styled.div<props>`
    display: table-cell;
    height: 280px;
    width: 100%;
    position: relative;
    ${(props) =>
        props.isMobile
            ? `
    `
            : `
        &:has(> :nth-child(2)) {
            display: flex;
            gap: 28px;
        }
    `}
`;
