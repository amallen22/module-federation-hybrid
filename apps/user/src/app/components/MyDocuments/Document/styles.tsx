import styled from '@emotion/styled';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { PrimaryFontFamily } = dsmTypography;

interface PropsShare {
    isShared: boolean;
}

const DocumentInfo = styled.div`
    z-index: 1;
    box-sizing: border-box;
    min-height: 144px;
    max-height: 156px;
    ${PrimaryFontFamily};
    background-color: ${dsmColors.colorNeutral00White};
    padding: 20px 16px;
    box-shadow: 0 0 32px 0 rgba(31, 31, 31, 0.25);
`;

const DocumentDownloading = styled.div`
    z-index: 99999;
    opacity: 0;
    width: 100%;
    height: calc(100% - 144px);
    min-height: calc(100% - 156px);
    max-height: calc(100% - 144px);
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s all;
    cursor: pointer;
`;
const DocumentHover = styled.div`
    z-index: 99999;
    opacity: 0;
    width: 100%;
    height: calc(100% - 144px);
    min-height: calc(100% - 156px);
    max-height: calc(100% - 144px);
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s all;
    cursor: pointer;
`;

const DocumentHoverEdit = styled.div`
    padding: 4px 12px 4px 4px;
    background-color: ${dsmColors.colorPrimary400Base};
    border-radius: 50px;
    color: ${dsmColors.colorNeutral00White};
    ${PrimaryFontFamily};
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.25px;
    display: flex;
    align-items: center;
    svg {
        width: 16px;
        height: 16px;
        margin-right: 8px;
        background-color: ${dsmColors.colorPrimary600};
        padding: 4px;
        border-radius: 50px;
    }
`;

const ThumbnailImg = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
`;

const DocumentContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    &:hover {
        ${DocumentHover} {
            opacity: 1;
        }
    }
`;

const StyledMoreVertIcon = styled(MoreVertIcon)`
    color: ${dsmColors.colorNeutral600};
    right: 10px;
    position: absolute;
    cursor: pointer;
`;

const LinkIconContainer = styled.div<PropsShare>`
    opacity: ${(props) => (props.isShared ? '1' : '.3')};
    justify-self: end;
    align-self: center;
    width: 24px;
    height: 24px;
`;

const DocumentUpdated = styled.p`
    margin: 2px 0 12px;
    padding-bottom: 12px;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.82;
    letter-spacing: 0.92px;
    color: ${dsmColors.colorNeutral500};
    border-bottom: 2px solid ${dsmColors.colorNeutral200};
`;

const DownloadButton = styled.div`
    color: ${dsmColors.colorPrimary400Base};
    font-family: Roboto;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    cursor: pointer;
    svg {
        margin-right: 4px;
    }
    &.disabled {
        opacity: 0.4;
        pointer-events: none;
    }
`;

const stylesPopOver = makeStyles(() => ({
    PopOverPaper: {
        borderRadius: '2px',
        minWidth: '200px',
        boxSizing: 'border-box',
    },
}));

const ItemAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 12px 12px 12px 12px;
    gap: 15px;
    transition: 0.1s all;
    img,
    svg {
        height: 25px;
        width: 25px;
    }
    &:hover {
        background: ${dsmColors.colorNeutral200};
    }
`;

const PopOverContent = styled.div`
    ${PrimaryFontFamily};
    font-size: 16px;
    line-height: 1.5;
    color: ${dsmColors.colorNeutral800};
    div {
        cursor: pointer;
        &:last-child {
            color: ${dsmColors.colorError900Text};
        }
    }
`;

const PopOverContentPlain = styled.div`
    ${PrimaryFontFamily};
    font-size: 16px;
    line-height: 1.5;
    color: ${dsmColors.colorNeutral800};
    div {
        cursor: pointer;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export {
    DocumentContainer,
    DocumentInfo,
    DocumentUpdated,
    DownloadButton,
    StyledMoreVertIcon,
    LinkIconContainer,
    PopOverContent,
    PopOverContentPlain,
    stylesPopOver,
    DocumentHover,
    DocumentHoverEdit,
    ItemAction,
    FlexContainer,
    DocumentDownloading,
    ThumbnailImg,
};
