import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    animation: appear 0.2s ease-in-out forwards;
    overflow-y: auto;
    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

export const CropperContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    background: #4d5052;
    > .reactEasyCrop_Container {
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        > div {
            color: rgba(155, 157, 159, 0.5);
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 4px;
        }
    }
`;

export const CircularFakeCropper = styled.div`
    border: 2px solid rgba(255, 255, 255, 0.5);
    background-color: transparent;
    border-radius: 50%;
    width: 234px;
    height: 234px;
    z-index: 99999;
    pointer-events: none;
`;

export const InfoMessageCropper = styled.div`
    color: #fff;
    pointer-events: none;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 15px;
    font-size: 12px;
    line-height: 1.33;
    letter-spacing: 0.4px;
    font-family: Roboto;
    z-index: 99999;
`;

export const CropperControls = styled.div`
    display: flex;
    align-items: center;
    background-color: #d9dde0;
    height: 24px;
    padding: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`;

export const HorizontalDivider = styled.div`
    border-left: 2px solid #b5babd;
    height: 40px;
    margin-left: 16px;
    margin-right: 16px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
`;

export const UploadNewPhoto = styled.span`
    color: #26a0f4;
    font-family: Roboto;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25;
    letter-spacing: normal;
    cursor: pointer;
    margin-right: 24px;
`;

export const stylesCustomSlider = {
    root: {
        color: '#6d7275',
        height: 2,
    },
    thumb: {
        height: 16,
        width: 16,
        backgroundColor: '#d9dde0',
        border: 'solid 2px #6d7275',
        marginTop: -6.5,
        marginLeft: -4.5,
        '&:focus, &:hover, & active': {
            boxShadow: 'inherit',
        },
    },
    track: {
        height: 4,
        borderRadius: 2,
    },
    rail: {
        height: 4,
        borderRadius: 2,
        backgroundColor: '#bec2c6',
        opacity: 1,
    },
    mark: {
        backgroundColor: '#bec2c6',
        height: 6,
        width: 6,
        borderRadius: 50,
        marginTop: -2,
    },
};
