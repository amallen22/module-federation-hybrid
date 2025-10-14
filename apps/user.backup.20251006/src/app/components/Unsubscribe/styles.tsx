import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily, XLTitle, LTitle, MTitle, MBodyText } = dsmTypography;
const { breakpoint } = dsmBreakpoints;

export const Wrapper = styled.div`
    margin: 56px 24px;
    ${PrimaryFontFamily};
    ${breakpoint.screenM} {
        margin: 56px;
    }
`;

export const Title = styled.h2`
    ${LTitle.styles};
    color: ${dsmColors.colorNeutral900};
    text-align: center;
    margin: 16px 0;
    text-transform: capitalize;
    ${breakpoint.screenM} {
        ${XLTitle.styles};
    }
`;

export const Subtitle = styled.h3`
    ${MTitle.styles};
    color: ${dsmColors.colorNeutral900};
    text-align: center;
    margin: 16px 0;
    align-self: flex-start;
    ${breakpoint.screenM} {
        ${LTitle.styles};
    }
`;

export const StyledSubtitle = styled(Subtitle)`
    width: 100%;
    margin: 0 0 54px;
    ${breakpoint.screenL} {
        width: calc(100% / 3 - 24px);
        text-align: left;
    }
`;

export const Container = styled.div`
    max-width: 1200px;
    margin: 48px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const StyledContainer = styled(Container)`
    margin: 0 auto;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
    ${breakpoint.screenL} {
        width: calc(50% - 28px);
    }
`;

export const ContentTitle = styled.h4`
    ${MTitle.styles};
    color: ${dsmColors.colorNeutral900};
    margin: 0 0 24px;
`;

export const ContentReason = styled.p`
    ${MBodyText.styles};
    color: ${dsmColors.colorNeutral700};
    position: relative;
    padding-left: 36px;
    margin: 0 0 16px;
    &:before {
        content: '';
        width: 24px;
        height: 24px;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik04LjQ2NCA4LjQ2NGExLjAwMyAxLjAwMyAwIDAgMCAwIDEuNDE1TDEwLjU4NiAxMmwtMi4xMjIgMi4xMjFhMS4wMDMgMS4wMDMgMCAwIDAgMCAxLjQxNSAxLjAwMyAxLjAwMyAwIDAgMCAxLjQxNSAwTDEyIDEzLjQxNGwyLjEyMSAyLjEyMmExLjAwMyAxLjAwMyAwIDAgMCAxLjQxNSAwIDEuMDAzIDEuMDAzIDAgMCAwIDAtMS40MTVMMTMuNDE0IDEybDIuMTIyLTIuMTIxYTEuMDAzIDEuMDAzIDAgMCAwIDAtMS40MTUgMS4wMDMgMS4wMDMgMCAwIDAtMS40MTUgMEwxMiAxMC41ODYgOS44NzkgOC40NjRhMS4wMDMgMS4wMDMgMCAwIDAtMS40MTUgMHpNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6IiBmaWxsPSIjRkM2NDJEIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+Cg==');
        position: absolute;
        left: 0;
    }
`;

export const ContentImage = styled.div`
    width: 100%;
    max-width: 560px;
    margin: 0 auto 40px;
    height: 340px;
    background-color: ${dsmColors.colorNeutral200};
    border-radius: 4px;
    border: 1px solid ${dsmColors.colorNeutral300};
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    ${breakpoint.screenL} {
        width: calc(50% - 28px);
        margin-bottom: 0;
    }
`;

export const Stamp = styled.img`
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: 24px;
    left: 34px;
    z-index: 1;
`;

export const DocumentPreview = styled.img`
    transform: scale(1) translateY(40px);
    box-shadow: 0 0 16px 0 rgba(30, 32, 33, 0.24);
    background-color: ${dsmColors.colorNeutral00White};
    ${breakpoint.screenS} {
        transform: scale(1.25) translateY(80px);
    }
`;

export const DocumentGenericPreview = styled.img`
    transform: scale(0.75) translateY(60px);
    box-shadow: 0 0 16px 0 rgba(30, 32, 33, 0.24);
    background-color: ${dsmColors.colorNeutral00White};
    ${breakpoint.screenS} {
        transform: scale(1) translateY(60px);
    }
`;

export const ContainerCta = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: fit-content;
    margin: 0 auto;
`;

export const UnsubscribeButton = styled.div`
    color: ${dsmColors.colorPrimary400Base};
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25;
    margin: 20px 0;
    text-align: center;
    cursor: pointer;
`;

export const OptionsWrapper = styled.div`
    padding: 56px 24px;
    background-color: ${dsmColors.colorNeutral200};
    ${PrimaryFontFamily};
    ${breakpoint.screenM} {
        padding: 72px 56px;
    }
`;

export const OptionCard = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: 450px;
    background-color: ${dsmColors.colorNeutral00White};
    padding: 24px;
    border-radius: 4px;
    box-shadow: 0 0 4px 0 ${dsmColors.colorNeutral300};
    border-top: 4px solid ${dsmColors.colorPrimary100};
    transition: 0.2s all;
    margin: 0 auto 32px;
    &:hover {
        border-top: 4px solid ${dsmColors.colorPrimary400Base};
        box-shadow: 0 3px 8px 0 ${dsmColors.colorNeutral400};
    }
    ${breakpoint.screenL} {
        width: calc(50% - 12px);
        margin-bottom: 0;
    }
    ${breakpoint.screenL} {
        width: calc(100% / 3 - 24px);
    }
`;

export const OptionImage = styled.img`
    width: 64px;
    height: 64px;
    margin-bottom: 32px;
`;

export const OptionText = styled.div`
    ${MBodyText.styles};
    color: ${dsmColors.colorNeutral800};
    margin-bottom: 24px;
`;

export const OptionLink = styled.a`
    display: block;
    width: max-content;
    margin-left: auto;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25;
    color: ${dsmColors.colorPrimary400Base};
    text-decoration: none;
    position: relative;
    padding-right: 28px;
    &:after {
        content: '';
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMTguNzkxIDExLjAwNUg3LjYyMWw0Ljg4LTQuODhjLjM5LS4zOS4zOS0xLjAzIDAtMS40MmEuOTk2Ljk5NiAwIDAgMC0xLjQxIDBsLTYuNTkgNi41OWEuOTk2Ljk5NiAwIDAgMCAwIDEuNDFsNi41OSA2LjU5YS45OTYuOTk2IDAgMSAwIDEuNDEtMS40MWwtNC44OC00Ljg4aDExLjE3Yy41NSAwIDEtLjQ1IDEtMXMtLjQ1LTEtMS0xeiIgaWQ9ImEiLz4KICAgIDwvZGVmcz4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDI0IDApIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxtYXNrIGlkPSJiIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8ZyBtYXNrPSJ1cmwoI2IpIiBmaWxsPSIjMjZBMEY0Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==');
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        top: -2px;
    }
`;

export const UnsubscribeContainer = styled.div`
    height: calc(100vh - 72px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
