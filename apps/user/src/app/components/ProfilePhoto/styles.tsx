import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

export const PhotoWrapper = styled.div`
    position: relative;
    width: 136px;
    height: 136px;
`;

interface Props {
    hasImage: boolean;
}

export const PhotoCircle = styled.div<Props>`
    box-sizing: border-box;
    width: 136px;
    height: 136px;
    border-radius: 100%;
    background-color: ${dsmColors.colorPrimary50};
    border: ${(props) => (props.hasImage ? '' : `2px dashed ${dsmColors.colorPrimary100}`)};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    &:hover {
        PhotoCircleHover {
            display: block;
        }
    }
`;

export const PhotoCircleHover = styled.div`
    opacity: 0;
    width: 136px;
    height: 136px;
    border-radius: 100%;
    transform: translateY(-136px);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${dsmColors.colorNeutral800};
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25;
    color: ${dsmColors.colorNeutral00White};
    transition: 0.2s all;
    span {
        position: relative;
        padding-left: 28px;
        &:before {
            content: '';
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iMG5vaGY1aGExYSIgZD0iTTE2IDl2MTBIOFY5aDh6bS0xLjUtNmgtNWwtMSAxSDV2MmgxNFY0aC0zLjVsLTEtMXpNMTggN0g2djEyYzAgMS4xLjkgMiAyIDJoOGMxLjEgMCAyLS45IDItMlY3eiIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8Zz4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA2IC0zNzkpIHRyYW5zbGF0ZSgxODIgMjYyKSB0cmFuc2xhdGUoMCA2MCkgdHJhbnNsYXRlKDI0IDU3KSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXNrIGlkPSJsbmhsbThrZ21iIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iIzBub2hmNWhhMWEiLz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iIzBub2hmNWhhMWEiLz4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTAgMEgyNFYyNEgweiIgbWFzaz0idXJsKCNsbmhsbThrZ21iKSIvPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            width: 24px;
            height: 24px;
            position: absolute;
            top: -4px;
            left: 0px;
        }
    }
    &:hover {
        opacity: 0.75;
    }
`;

export const NameInitials = styled.div`
    ${dsmTypography.HeroTitle.styles};
    color: ${dsmColors.colorPrimary400Base};
    text-transform: uppercase;
`;

export const UploadButton = styled.div`
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    padding: 12px;
    background-color: ${dsmColors.colorPrimary400Base};
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0idjNnOTlpcmhnYSIgZD0iTTE3LjMzMyAyNS4wNTVWMTAuMTYybDYuNTA3IDYuNTA2Yy41Mi41MiAxLjM3My41MiAxLjg5MyAwcy41Mi0xLjM2IDAtMS44OGwtOC43ODYtOC43ODZjLS4yNS0uMjUtLjU4OC0uMzktLjk0LS4zOS0uMzUzIDAtLjY5MS4xNC0uOTQuMzlsLTguOCA4Ljc3M2MtLjUyLjUyLS41MiAxLjM2IDAgMS44OC41Mi41MiAxLjM2LjUyIDEuODggMGw2LjUyLTYuNDkzdjE0Ljg5M2MwIC43MzMuNiAxLjMzMyAxLjMzMyAxLjMzM3MxLjMzMy0uNiAxLjMzMy0xLjMzM3oiLz4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI4OCAtNDE0KSB0cmFuc2xhdGUoMjc2IDQwMikgdHJhbnNsYXRlKDEyIDEyKSI+CiAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9InRvZmx3aGY5a2IiIGZpbGw9IiNmZmYiPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiN2M2c5OWlyaGdhIi8+CiAgICAgICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgICAgIDxnIGZpbGw9IiNGRkYiIG1hc2s9InVybCgjdG9mbHdoZjlrYikiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCAwSDMyVjMySDB6Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K');
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 0;
    right: -12px;
    cursor: pointer;
    text-transform: uppercase;
`;

export const StyledInputFile = styled.input`
    display: none;
`;

export const StyledImage = styled.img`
    width: 100%;
    height: auto;
`;

export const MobileRemovePhoto = styled.div`
    position: relative;
    padding-left: 28px;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25;
    color: ${dsmColors.colorPrimary400Base};
    margin-top: 18px;
    &:before {
        content: '';
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMTYgOXYxMEg4VjloOHptLTEuNS02aC01bC0xIDFINXYyaDE0VjRoLTMuNWwtMS0xek0xOCA3SDZ2MTJjMCAxLjEuOSAyIDIgMmg4YzEuMSAwIDItLjkgMi0yVjd6IiBpZD0iYSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8L21hc2s+CiAgICAgICAgPHVzZSBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHhsaW5rOmhyZWY9IiNhIi8+CiAgICAgICAgPHBhdGggZmlsbD0iIzI2QTBGNCIgbWFzaz0idXJsKCNiKSIgZD0iTTAgMGgyNHYyNEgweiIvPgogICAgPC9nPgo8L3N2Zz4K');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 24px;
        height: 24px;
        position: absolute;
        top: -4px;
        left: 0px;
    }
    ${breakpoint.screenS} {
        display: none;
    }
`;
