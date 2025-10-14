import styled from '@emotion/styled';

export const AnimationContainer = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    border-radius: 0 24px 24px 0;
    overflow: hidden;

    .lottie1 {
        margin-left: 13px;
        svg {
            width: auto !important;
        }
    }

    @media only screen and (max-width: 550px) {
        bottom: 0;
        display: flex;
        align-items: flex-end;
        .lottie1 {
            height: 100%;
            margin-left: 0;
            svg {
                width: auto !important;
            }
        }
    }
`;
