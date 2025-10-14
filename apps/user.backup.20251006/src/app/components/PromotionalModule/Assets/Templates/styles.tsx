import styled from '@emotion/styled';

interface Props {
    isHovered: boolean;
}

export const Container = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 24px;
    display: flex;
    gap: 24px;
`;

export const ContainerLeft = styled.div<Props>`
    height: 100%;
    width: 100%;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    transform: translate(0, -20px);
    ${(props) =>
        props.isHovered &&
        `transform: translate(0, -30px);
        `}
`;

export const ContainerRight = styled.div<Props>`
    height: 100%;
    width: 100%;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    transform: translate(0, -62px);
    ${(props) =>
        props.isHovered &&
        `transform: translate(0, -52px);
        `}
`;
