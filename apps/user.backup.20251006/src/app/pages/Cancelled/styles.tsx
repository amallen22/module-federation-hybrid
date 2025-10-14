import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily, LTitle } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

export const Wrapper = styled.div`
    width: 100%;
    background-color: ${dsmColors.colorNeutral50};
    min-height: calc(100vh - 64px - 106px);
    ${PrimaryFontFamily};
`;

export const Container = styled.div`
    padding: 24px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    ${breakpoint.screenM} {
        padding: 40px 24px;
    }
`;

export const Title = styled.h2`
    ${LTitle.styles};
    margin: 0 0 32px;
    text-align: center;
`;

export const CardHeader = styled.div`
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 2px solid ${dsmColors.colorNeutral200};
`;

export const Card = styled.div`
    background-color: ${dsmColors.colorNeutral00White};
    padding: 24px;
    border-top: 4px solid ${dsmColors.colorPrimary400Base};
    border-radius: 6px;
    box-shadow: 0 1px 4px 0 ${dsmColors.colorNeutral400}, 0 3px 8px 0 ${dsmColors.colorNeutral200};
    max-width: 570px;
    margin: 0 auto 38px;
    box-sizing: border-box;
    ${breakpoint.screenM} {
        padding: 40px 32px;
    }
`;

export const CancelTitle = styled.p`
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.67;
    letter-spacing: 1.5px;
    color: ${dsmColors.colorNeutral500};
    margin: 0 0 4px;
`;

export const CancelDate = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: ${dsmColors.colorNeutral900};
`;

export const InfoItem = styled.div`
    position: relative;
    padding-left: 36px;
    font-size: 16px;
    line-height: 1.5;
    color: ${dsmColors.colorNeutral800};
    &:not(:last-child) {
        margin-bottom: 16px;
    }
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggZD0ibTguNzk1IDE1Ljg3NS0zLjQ3LTMuNDdhLjk5Ni45OTYgMCAxIDAtMS40MSAxLjQxbDQuMTggNC4xOGMuMzkuMzkgMS4wMi4zOSAxLjQxIDBsMTAuNTgtMTAuNThhLjk5Ni45OTYgMCAxIDAtMS40MS0xLjQxbC05Ljg4IDkuODd6IiBpZD0iYSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8L21hc2s+CiAgICAgICAgPGcgbWFzaz0idXJsKCNiKSIgZmlsbD0iIzI2QTBGNCI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=');
    }
`;

export const Logo = styled.img`
    margin-bottom: 16px;
`;
