import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

import { DB_BREAKPOINT } from '../../pages/Dashboard/styles';
import { ContainerProps, PMColors, PMColorsHovered } from './Definitions';

export const RightColumn = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    min-width: 50%;
    box-sizing: border-box;
    flex-direction: column;
    padding: 24px;
    gap: 8px;

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        width: 30%;
        padding: 18px;
    }
`;

export const LeftColumn = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    flex-grow: 1;
    box-sizing: border-box;
    flex-direction: column;
    padding: 24px;
    gap: 8px;

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        width: 60%;
        min-width: 60%;
        padding: 18px;
        gap: 0;
    }
`;

export const Container = styled.button<ContainerProps>`
    height: 100%;
    width: 100%;
    text-align: left;
    border-radius: 24px;
    display: flex;
    cursor: pointer;
    position: relative;
    transition: 0.3s all;
    ${(props) =>
        props.disabled === true &&
        `
        opacity: 0.5`}
    background: ${(props) => PMColors[props.color]};

    &:not(:only-child) {
        width: calc(50% - 12px);
        .right {
            display: none;
        }

        @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
            width: 100%;
            .right {
                display: block;
            }
        }
    }

    &:focus-visible,
    &:hover {
        background: ${(props) => PMColorsHovered[props.color]};
    }

    &:focus-visible {
        outline: 1px solid black;
    }

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        height: fit-content;
        min-height: 178px;
        overflow: hidden;
    }
`;

const baseChip = `
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 2px 12px 1px 12px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 11px;
    line-height: 20px;
    letter-spacing: 1.38px;
    text-transform: uppercase;

    @media only screen and (max-width: 550px) {   
        margin-bottom: 8px;
    }
`;

export const PrimaryChip = styled.div`
    ${baseChip}
    background: ${dsmColors.colorPrimary400Base};
    color: ${dsmColors.colorNeutral00White};
`;

export const SecondaryChip = styled.div`
    ${baseChip}
    border: 1px solid ${dsmColors.colorPrimary400Base};
    color: ${dsmColors.colorPrimary400Base};
`;

export const TertiaryChip = styled.div`
    ${baseChip}
    border: 1px solid #1E202180;
    color: #1e202180;
`;

export const CardTitle = styled.h2`
    /* 
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    */
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    margin: 0;

    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        flex-grow: 1;
    }
`;

export const CardBody = styled.p`
    margin: 0;
    ${dsmTypography.bodyM}
    color: ${dsmColors.colorNeutral600};
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    line-height: 24px;
    @media only screen and (max-width: ${DB_BREAKPOINT.S}) {
        font-size: 14px;
    }
`;
