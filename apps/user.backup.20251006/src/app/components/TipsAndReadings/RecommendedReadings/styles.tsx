import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

const FeedPanel = styled.div`
    width: 100%;
    border-bottom: 2px solid ${dsmColors.colorNeutral300};
    padding: 0 16px 48px;
    margin-bottom: 48px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${breakpoint.screenS} {
        padding: 0 0 48px;
    }
    ${breakpoint.screenL} {
        width: 50%;
        padding: 0 54px 0 0;
        margin-bottom: 0;
        border-right: 2px solid ${dsmColors.colorNeutral300};
        border-bottom: 0;
        display: block;
    }
`;

const Feed = styled.a`
    display: block;
    position: relative;
    box-sizing: border-box;
    &:not(:last-child) {
        margin-bottom: 16px;
    }
    ${breakpoint.screenS} {
        padding-left: 58px;
        &:before {
            content: '';
            width: 36px;
            height: 42px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSI0MiIgdmlld0JveD0iMCAwIDM2IDQyIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iI0I1QkFCRCI+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTM0IDhjMS4xMDUgMCAyIC44OTUgMiAydjM4YzAgMS4xMDUtLjg5NSAyLTIgMkgyYy0xLjEwNSAwLTItLjg5NS0yLTJWMTBjMC0xLjEwNS44OTUtMiAyLTJoMzJ6bTAgMkgydjM4aDMyVjEwek0xNyA0MmMuNTUyIDAgMSAuNDQ4IDEgMXMtLjQ0OCAxLTEgMUg2Yy0uNTUyIDAtMS0uNDQ4LTEtMXMuNDQ4LTEgMS0xaDExem0xMy02Yy41NTIgMCAxIC40NDggMSAxcy0uNDQ4IDEtMSAxSDZjLS41NTIgMC0xLS40NDgtMS0xcy40NDgtMSAxLTFoMjR6bTAtNmMuNTUyIDAgMSAuNDQ4IDEgMXMtLjQ0OCAxLTEgMUg2Yy0uNTUyIDAtMS0uNDQ4LTEtMXMuNDQ4LTEgMS0xaDI0em0tMS0xNmMxLjEwNSAwIDIgLjg5NSAyIDJ2OGMwIDEuMTA1LS44OTUgMi0yIDJIN2MtMS4xMDUgMC0yLS44OTUtMi0ydi04YzAtMS4xMDUuODk1LTIgMi0yaDIyem0wIDJIN3Y4aDIydi04eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0MiAtMTMzNCkgdHJhbnNsYXRlKDE0MiAxMjM4KSB0cmFuc2xhdGUoMCA4OCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==');
            background-size: contain;
            position: absolute;
            left: 0;
            top: 6px;
        }
    }
    @media (max-width: 992px) and (min-width: 768px) {
        width: calc(50% - 17px);
    }
`;

const FeedTitle = styled.p`
    ${PrimaryFontFamily};
    font-size: 20px;
    font-weight: 500;
    line-height: 1.4;
    color: ${dsmColors.colorNeutral900};
    margin: 0 0 8px;
    position: relative;
    padding-left: 28px;
    &:before {
        content: '';
        width: 18px;
        height: 21px;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDE4IDIxIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzMwMzAzMCIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTMyLjc4NiAxMDQ1LjU2MmMuMjQyIDAgLjQzOS4xOTYuNDM5LjQzOHYxOS4yOTRjMCAuMjQyLS4xOTcuNDM5LS40MzkuNDM5SDE3Yy0uMjQyIDAtLjQzOS0uMTk3LS40MzktLjQzOVYxMDQ2YzAtLjI0Mi4xOTctLjQzOC40MzktLjQzOHptLS40MzkuODc2SDE3LjQzOHYxOC40MTdoMTQuOTA5di0xOC40MTd6bS03Ljg5MiAxNS43ODdjLjI0MiAwIC40MzguMTk2LjQzOC40MzggMCAuMjE1LS4xNTUuMzk0LS4zNi40MzJsLS4wNzguMDA3SDE5LjYzYy0uMjQyIDAtLjQzOC0uMTk3LS40MzgtLjQzOSAwLS4yMTUuMTU1LS4zOTQuMzYtLjQzMWwuMDc4LS4wMDdoNC44MjR6bTUuNy0zLjA3Yy4yNDIgMCAuNDM5LjE5Ni40MzkuNDM5IDAgLjIxNS0uMTU2LjM5NC0uMzYuNDMxbC0uMDc5LjAwN0gxOS42MzFjLS4yNDIgMC0uNDM4LS4xOTYtLjQzOC0uNDM4IDAtLjIxNi4xNTUtLjM5NS4zNi0uNDMybC4wNzgtLjAwN2gxMC41MjR6bTAtMy4wN2MuMjQyIDAgLjQzOS4xOTcuNDM5LjQ0IDAgLjIxNC0uMTU2LjM5My0uMzYuNDNsLS4wNzkuMDA4SDE5LjYzMWMtLjI0MiAwLS40MzgtLjE5Ny0uNDM4LS40MzkgMC0uMjE1LjE1NS0uMzk0LjM2LS40MzFsLjA3OC0uMDA3aDEwLjUyNHptMC03Ljg5MmMuMjQyIDAgLjQzOS4xOTYuNDM5LjQzOHY0LjgyNGMwIC4yNDItLjE5Ny40MzgtLjQzOS40MzhIMTkuNjMxYy0uMjQyIDAtLjQzOC0uMTk2LS40MzgtLjQzOHYtNC44MjRjMC0uMjQyLjE5Ni0uNDM4LjQzOC0uNDM4em0tLjQzOS44NzZoLTkuNjQ3djMuOTQ3aDkuNjQ3di0zLjk0N3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNiAtMTA0NSkiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=');
        background-size: contain;
        position: absolute;
        left: 0;
        top: 3px;
    }
    ${breakpoint.screenS} {
        padding-left: 0;
        &:before {
            content: '';
            width: 0;
            height: 0;
        }
    }
`;

const FeedDescription = styled.p`
    ${PrimaryFontFamily};
    font-size: 14px;
    line-height: 1.43;
    color: ${dsmColors.colorNeutral700};
    margin: 0;
    span {
        color: ${dsmColors.colorPrimary400Base};
        font-weight: bold;
    }
`;

export { FeedPanel, Feed, FeedTitle, FeedDescription };
