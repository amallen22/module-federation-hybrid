import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily, SBodyText } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

export const Container = styled.div`
    ${PrimaryFontFamily};
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 24px;
    max-width: 380px;
    ${breakpoint.screenL} {
        margin-top: 0;
        flex-wrap: nowrap;
        max-width: 520px;
    }
`;

export const CheckerImage = styled.img`
    width: 183px;
    height: 196px;
    margin: 0 auto 16px;
    ${breakpoint.screenL} {
        margin: 0 24px 0 0;
    }
`;

export const Label = styled.div`
    padding: 6px 16px;
    border-radius: 24px;
    background-color: #daeffd;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.67;
    letter-spacing: 1.5px;
    color: ${dsmColors.colorPrimary400Base};
    text-transform: uppercase;
    display: table;
`;

export const Text = styled.p`
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    color: ${dsmColors.colorNeutral900};
    margin: 8px 0;
`;

export const Cta = styled.div`
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    text-decoration: underline;
    text-transform: uppercase;
    color: ${dsmColors.colorPrimary400Base};
    cursor: pointer;
`;

export const ContentItem = styled.p`
    ${SBodyText};
    color: ${dsmColors.colorNeutral900};
    margin: 0 0 12px;
    padding-left: 32px;
    position: relative;
    &:last-child {
        margin: 0;
    }
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: -3px;
        width: 24px;
        height: 24px;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJtOC43OTUgMTUuODc1LTMuNDctMy40N2EuOTk2Ljk5NiAwIDEgMC0xLjQxIDEuNDFsNC4xOCA0LjE4Yy4zOS4zOSAxLjAyLjM5IDEuNDEgMGwxMC41OC0xMC41OGEuOTk2Ljk5NiAwIDEgMC0xLjQxLTEuNDFsLTkuODggOS44N3oiIGlkPSJxeWFvend6aGRhIi8+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxtYXNrIGlkPSJoaGQ5a2JkcjFiIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcXlhb3p3emhkYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8ZyBtYXNrPSJ1cmwoI2hoZDlrYmRyMWIpIiBmaWxsPSIjMjZBMEY0Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==');
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    ${breakpoint.screenS} {
        flex-wrap: nowrap;
        flex-direction: row;
    }
`;

export const OutlinedButton = styled.button`
    ${dsmTypography.PrimaryFontFamily};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 1.25px;
    text-align: center;
    text-transform: uppercase;
    padding: 14px 24px;
    box-sizing: border-box;
    border-radius: 50px;
    cursor: pointer;
    margin-bottom: 16px;
    display: block;
    text-decoration: none;
    color: ${dsmColors.colorPrimary400Base};
    border: 2px solid ${dsmColors.colorPrimary400Base};
    ${breakpoint.screenS} {
        margin-bottom: 0;
        margin-right: 16px;
    }
`;
