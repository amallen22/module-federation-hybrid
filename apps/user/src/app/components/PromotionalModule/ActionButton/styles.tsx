import styled from '@emotion/styled';

interface Props {
    isHovered: boolean;
}

export const Container = styled.div`
    display: flex;
    gap: 9px;
    align-items: center;
    opacity: 1;
    transition: opacity 0.3s;

    @media only screen and (max-width: 550px) {
        display: none;
    }
`;

export const ActionText = styled.p<Props>`
    font-family: Roboto;
    position: relative;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    margin: 0;
    color: gray;
    border-bottom: 2px solid #1e202126;
    transition: 0.3s;
    white-space: nowrap;
    &:before {
        content: '';
        position: absolute;
        border-bottom: 2px solid #1e2021;
        width: 0;
        height: 100%;
        transition: 0.3s;
        ${(props) =>
        props.isHovered &&
            `color: #1E2021;
            width: 100%;
        `}
    }
    ${(props) =>
        props.isHovered &&
        `color: #1E2021;
    `}
`;

export const IconContainer = styled.div<Props>`
    overflow: clip;
    overflow-clip-margin: 4px;
    display: flex;
    align-items: center;
    height: 16px;
    width: 25px;
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
