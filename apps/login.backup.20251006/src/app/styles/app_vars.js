import styled from '@emotion/styled';
import { dsmBreakpoints, dsmColors } from '@npm_leadtech/cv-lib-app-components';

export const Scroll = styled.div`
    &::-webkit-scrollbar {
        background-color: transparent;
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    &::-webkit-scrollbar-track:hover {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${dsmColors.colorNeutral400};
        border-radius: 16px;
        border: 2px solid white;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: ${dsmColors.colorNeutral500};
    }
    &::-webkit-scrollbar-button {
        display: none;
    }
`;

export const mediaQueries = {
    smallAndDown: `(max-width : ${dsmBreakpoints.breakpoint.screenL}px)`,
    mediumAndDown: `(max-width : ${dsmBreakpoints.breakpoint.screenM}px)`,
    mobileMaxHeight: '(max-height : 480px)' // prevent mobile keyboard overlapping
};
