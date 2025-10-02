import styled from '@emotion/styled';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

import pattern from '../Assets/pattern-bg.svg';

interface Props {
    isHovered?: boolean;
}

export const CVImage = styled.img`
    height: 100%;
    width: 100%;

    z-index: 2;
    @media only screen and (max-width: 550px) {
        position: absolute;
        bottom: 0;
        left: -20px;
        width: 90%;
        height: 95%;
    }
`;

export const Foreground = styled.div<Props>`
    position: absolute;
    right: 24px;
    height: 100%;
    width: 30%;
    border-left: 2px solid ${dsmColors.colorPrimary400Base};
    background: linear-gradient(
        270deg,
        rgba(38, 162, 244, 0) 0%,
        rgba(38, 160, 244, 0.5) 84.72%,
        rgba(38, 160, 244, 0.85) 100%
    );
    z-index: 3;
    opacity: 60%;
    transition: 0.4s width ease-in-out;

    ${(props) =>
        props.isHovered &&
        `
        width: 60%;
    `}
`;

export const Background = styled.div<Props>`
    position: absolute;
    z-index: 1;
    right: 0;
    border-radius: 0 24px 24px 0;
    height: 100%;
    width: calc(30% + 24px);
    background: url(${pattern}) center center repeat;
    background-color: ${dsmColors.colorPrimary100};
    background-attachment: fixed;
    background-size: 1.2em;
    opacity: 0.7;
    transition: 0.4s all ease-in-out;

    ${(props) =>
        props.isHovered &&
        `
        width: calc(60% + 24px);
    `}
`;
