import styled from '@emotion/styled';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

interface Props {
    isHovered: boolean;
}

export const Container = styled.div`
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 4px 24px 4px 24px;
    justify-content: space-between;

    @media only screen and (max-width: 1015px) {
        padding: 0;
    }
`;

export const Post = styled.a<Props>`
    border-bottom: solid 2px ${dsmColors.colorNeutral700};
    color: ${dsmColors.colorNeutral700};
    position: relative;
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 2px solid ${dsmColors.colorNeutral500}26;
    transition: 0.3s;
    box-sizing: content-box;
    gap: 8px;
    ${dsmTypography.STitle.styles};
    ${dsmTypography.primaryFontFamily}
    &:before {
        content: '';
        position: absolute;
        border-bottom: 2px solid ${dsmColors.colorNeutral900};
        width: 0;
        bottom: -2px;
        height: 100%;
        transition: 0.3s;
        ${(props) =>
        props.isHovered &&
            `width: 100%;
        `}
    }
    svg {
        min-width: 24px;
        fill: ${dsmColors.colorNeutral500};
        transition: 0.3s;
        opacity: 0.6;
    }
    ${(props) =>
        props.isHovered &&
        `color: ${dsmColors.colorNeutral900};
        svg {
            fill:  ${dsmColors.colorPrimary600};
            opacity: 1;
        }
    `}
`;

export const TimeToRead = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    gap: 4px;
    color: ${dsmColors.colorNeutral500};
`;

export const TextContainer = styled.p`
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 95%;
    white-space: nowrap;
    margin: 0;
`;

export const DocumentImage = styled.img<Props>`
    svg {
        ${(props) =>
        props.isHovered &&
            `
        color: blue`}
    }
`;

export const Min = styled.p`
    white-space: nowrap;
    font-weight: 400;
    margin: 0;
`;

export const IconContainer = styled.div<Props>`
    display: flex;
    align-items: center;
    height: 16px;
    width: 25px;
    overflow: clip;
    overflow-clip-margin: 4px;
    img {
        transition: all 0.3s linear;
        position: relative;
        transform: translateX(-30px);
        opacity: 0;
        ${(props) =>
        props.isHovered &&
            `
         transform: translateX(0px);
         opacity: 1;
         `}
    }
`;

export const Title = styled.p`
    ${dsmTypography.OverlineText.styles};
    ${dsmTypography.primaryFontFamily}
    text-align: left;
    margin: 0;
    margin-bottom: 4px;
    font-weight: 400;
    text-transform: uppercase;
    color: ${dsmColors.colorNeutral700};
`;
