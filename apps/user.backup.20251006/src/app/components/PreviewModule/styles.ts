import styled from '@emotion/styled';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

interface isMobile {
    isMobile?: boolean;
}

interface Ref {
    ref?: any;
}

const PreviewContainer = styled.div<Ref>`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 24px;
    overflow: hidden;
    background-color: ${dsmColors.colorNeutral200};
`;

const SpinnerContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const ExteriorContainer = styled.div`
    height: 280px;
    .useRefContainer {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
`;

const PreviewActionHidable = styled.div`
    &.inPopup {
        display: none;
        @media only screen and (max-width: 1190px) {
            display: block;
        }
    }
    &.inFooter {
        display: block;
        @media only screen and (max-width: 1190px) {
            display: none;
        }
    }
`;

const PreviewHoverEdit = styled.div`
    display: flex;
    align-items: center;
    background-color: ${dsmColors.colorPrimary400Base};
    color: ${dsmColors.colorNeutral00White};
    border-radius: 50px;
    filter: drop-shadow(0px 0px 10px rgba(0, 44, 107, 0.15));
    svg {
        width: 36px;
        height: 36px;
        padding: 12px;
    }
`;

const PreviewHeader = styled.div<isMobile>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    width: 100%;
    box-sizing: border-box;
    ${(props) =>
        props.isMobile &&
        `
        padding: 16px;
    `}
`;

const EditableTitle = styled.div`
    @media only screen and (max-width: 1190px) {
        width: 150px;
    }
`;

const CreateResume = styled.div<isMobile>`
    ${(props) =>
        props.isMobile
            ? `
        display: flex;
        margin-top: 12px;
        justify-content: center;
    `
            : `
        @media only screen and (max-width: 760px) {
            display: none;
        }
    `}
`;

const PreviewThumbnail = styled.img<isMobile>`
    cursor: pointer;
    position: absolute;
    top: 0;
    width: 272px;
    border-radius: 4px;
    box-shadow: 0px 0px 25.6px 0px rgba(0, 0, 0, 0.12);
    transition: 0.3s all;
    ${(props) =>
        props.isMobile &&
        `
        width: 80%;
    `};
`;

const PreviewHover = styled.div`
    z-index: 999;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    transition: 0.3s all;
    opacity: 0;
    cursor: pointer;

    @media only screen and (max-width: 550px) {
        opacity: 1;
    }
`;

const PreviewBody = styled.div`
    position: relative;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    &:hover {
        div {
            opacity: 1;
        }
        img {
            transform: scale(1.1);
        }
    }
`;

const PreviewFooter = styled.div`
    z-index: 99;
    position: relative;
    display: flex;
    flex-direction: row;
    bottom: 0;
    max-width: 100%;
    background-color: ${dsmColors.colorNeutral300};
    width: 100%;
    box-sizing: border-box;
    .useRefFooter {
        padding: 12px 0px 12px 24px;
        display: flex;
        width: unset;
        height: unset;
        & [data-qa='preview-module-edit-document'] {
            padding-left: 0;
        }
        & :not([data-qa='preview-module-edit-document'])::before {
            content: '';
            position: relative;
            width: 2px;
            height: 100%;
            right: 6px;
            background: ${dsmColors.colorNeutral400};
        }
    }
`;

export {
    CreateResume,
    EditableTitle,
    PreviewBody,
    PreviewActionHidable,
    PreviewContainer,
    PreviewFooter,
    PreviewHeader,
    PreviewHover,
    PreviewHoverEdit,
    PreviewThumbnail,
    ExteriorContainer,
    SpinnerContainer,
};
