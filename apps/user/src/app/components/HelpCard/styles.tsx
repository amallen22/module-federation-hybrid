import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

const Card = styled.div`
    ${dsmTypography.PrimaryFontFamily};
    padding: 24px 24px 28px;
    border-radius: 4px;
    border: solid 2px ${dsmColors.colorNeutral200};
    background-color: ${dsmColors.colorNeutral100};
    box-sizing: border-box;
    width: 100%;
    max-width: 380px;
    justify-self: center;
    ${breakpoint.screenL} {
        width: 360px;
        justify-self: end;
    }
`;

const CardTitle = styled.div`
    position: relative;
    margin-bottom: 8px;
    padding-left: 30px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.4;
    color: ${dsmColors.colorNeutral900};
    &:before {
        content: '';
        width: 20px;
        height: 24px;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDIyIDI2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICAgICAgICA8ZyBzdHJva2U9IiMzMDMwMzAiPgogICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS40NTUgMTEuNTM4SDEuODE4djUuOTM1YzAgMS4zMS45NzcgMi4zNzMgMi4xODIgMi4zNzNoMS40NTV2LTguMzA4ek0xOC4xODIgMTEuNTM4aC0zLjYzN3Y4LjMwOEgxNmMxLjIwNSAwIDIuMTgyLTEuMDYyIDIuMTgyLTIuMzczdi01LjkzNXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05NDggLTE2MSkgdHJhbnNsYXRlKDE1NSAxMzYpIHRyYW5zbGF0ZSg3NzApIHRyYW5zbGF0ZSgyNCAyNikiLz4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0LjIzIDIzLjUzOGguMzg1YzIuOTc0IDAgNS4zODUtMi40NTkgNS4zODUtNS40OTJWMTAuMkMyMCA0LjU2NyAxNS41MjMgMCAxMCAwaDBDNC40NzcgMCAwIDQuNTY3IDAgMTAuMnYzLjkyM00xMS44MTggMjMuNzY5TDkuNTQ1IDIzLjc2OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk0OCAtMTYxKSB0cmFuc2xhdGUoMTU1IDEzNikgdHJhbnNsYXRlKDc3MCkgdHJhbnNsYXRlKDI0IDI2KSIvPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==');
        background-size: contain;
        position: absolute;
        left: 0;
        top: 0;
    }
`;

const CardText = styled.div`
    font-size: 16px;
    line-height: 1.5;
    color: ${dsmColors.colorNeutral900};
`;

export { Card, CardTitle, CardText };
