import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;

export const StyledWrapperContainer = styled.div`
    border-radius: 4px;
    ${PrimaryFontFamily};
    font-size: 16px;
    letter-spacing: 0;
`;

export const StyledHistoryHeaderWrapper = styled.div<Props>`
    font-size: 16px;
    cursor: pointer;
    border-bottom: ${(props) => (props.collapseOpen ? `2px solid ${dsmColors.colorNeutral200}` : '')};
    margin-bottom: 16px;
`;

interface Props {
    collapseOpen?: boolean;
}

export const StyledHeaderTitle = styled.p<Props>`
    font-weight: bold;
    padding-right: 28px;
    position: relative;
    max-width: fit-content;
    &:after {
        content: '';
        width: 24px;
        height: 24px;
        position: absolute;
        top: -2px;
        right: 0;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJtMTUuODc1IDktMy44OCAzLjg4TDguMTE1IDlhLjk5Ni45OTYgMCAxIDAtMS40MSAxLjQxbDQuNTkgNC41OWMuMzkuMzkgMS4wMi4zOSAxLjQxIDBsNC41OS00LjU5YS45OTYuOTk2IDAgMCAwIDAtMS40MWMtLjM5LS4zOC0xLjAzLS4zOS0xLjQyIDB6IiBpZD0iYSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8L21hc2s+CiAgICAgICAgPGcgbWFzaz0idXJsKCNiKSIgZmlsbD0iIzZENzI3NSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=');
        background-size: contain;
        background-repeat: no-repeat;
        transform: ${(props) => (props.collapseOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
        transition: 0.3s all;
    }
`;

export const ContentTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: 4px;
`;

export const StyledHeaderSubtitle = styled.p`
    margin-bottom: 10px;
    ${PrimaryFontFamily};
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    color: ${dsmColors.colorNeutral700};
    margin: 0 0 24px;
`;

export const CollapseContent = styled.div`
    box-sizing: border-box;
`;

export const StyledTableWrapper = styled.div`
    overflow-x: auto;
    width: 100%;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    padding: 0 0 12px;
    border-radius: 4px;
    border: solid 2px ${dsmColors.colorNeutral200};
    & tr:last-child {
        border-bottom: 0px;
    }
`;

export const StyledTableHeaderCell = styled.th`
    background-color: ${dsmColors.colorNeutral100};
    color: ${dsmColors.colorNeutral500};
    padding-left: 20px;
    ${PrimaryFontFamily};
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: 1.5px;
    text-transform: uppercase;

    @media (max-width: 992px) {
        &[data-row='plan'] {
            display: none;
        }
    }
`;

export const StyledTableRow = styled.tr`
    border-top: 2px solid ${dsmColors.colorNeutral200};
    border-bottom: 2px solid ${dsmColors.colorNeutral200};
    height: 40px;
    text-align: left;
    ${PrimaryFontFamily};
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;

    &.future-payment {
        color: ${dsmColors.colorNeutral500};
    }
`;

export const StyledTableCell = styled.td`
    padding-left: 25px;

    @media (max-width: 992px) {
        &[data-row='plan'] {
            display: none;
        }
    }
`;

export const UnsubscribeButton = styled.a`
    opacity: 0.5;
    ${PrimaryFontFamily};
    font-size: 14px;
    color: ${dsmColors.colorNeutral800};
    display: block;
    max-width: fit-content;
    border-bottom: 1px ${dsmColors.colorNeutral800} solid;
    cursor: pointer;
`;

export const UnsubscribeContainer = styled.div`
    margin-top: 32px;
`;
