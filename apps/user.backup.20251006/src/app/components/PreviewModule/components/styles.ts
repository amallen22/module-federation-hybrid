import styled from '@emotion/styled';
import { MoreHoriz } from '@mui/icons-material';
import { Popover } from '@mui/material';
import { dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

interface DisabledProps {
    disabled?: boolean;
}

interface ActionContainerProps {
    disabled?: boolean;
    hideInDesktop?: boolean;
    hideInMobile?: boolean;
    warning?: boolean;
}

const disabledStyles = `    
pointer-events: none;
opacity: 0.3;
`;

const PreviewActionContainer = styled.button<ActionContainerProps>`
    position: relative;
    display: flex;
    gap: 6px;
    flex-direction: row;
    align-items: center;
    padding: 4px 12px;
    cursor: pointer;
    transition: 0.2 all;

    &:hover span {
        ${(props) =>
        props.warning
            ? `
            color: #750000;
        `
            : `
            color: ${dsmColors.colorNeutral800};`}
    }
    &:hover img {
        filter: brightness(36.31%) contrast(119.09%); // generated with IA to match colors.
        ${(props) => props.warning && 'filter: brightness(60.31%) contrast(100.09%);'}
    }
    flex-shrink: 1;

    ${({ disabled }) => disabled && disabledStyles}
    ${({ hideInDesktop }) =>
        hideInDesktop &&
        `
        display: none;
        @media only screen and (max-width: 1190px) {
            display: flex;
        }
        `}
    ${({ hideInMobile }) =>
        hideInMobile &&
        `
        @media only screen and (max-width: 1190px) {
            display: none;
        }`}
`;

const PreviewActionIcon = styled.img`
    transition: 0.2s all;
`;

const PreviewActionText = styled.span`
    ${dsmTypography.PrimaryFontFamily};
    color: ${dsmColors.colorNeutral700};
    ${dsmTypography.STitle.styles};
    transition: 0.2s all;
    text-wrap: nowrap;
`;

const PreviewCreateActionContainer = styled.div`
    span {
        color: ${dsmColors.colorPrimary400Base};
        font-weight: 700;
        text-transform: capitalize;
    }
    &:hover span {
        color: ${dsmColors.colorPrimary500};
    }
    &:hover img {
        filter: unset;
    }
`;

const PreviewDeleteActionContainer = styled.div`
    span {
        color: ${dsmColors.colorWarning900Text};
        &:hover {
            color: red !important;
        }
    }
    &:hover span {
        color: #3d1303 !important;
    }
`;

const PreviewPopoverWrapper = styled(Popover)`
    .MuiPopover-paper {
        border-radius: 4px;
        box-shadow: 0px 3px 8px 0px rgba(181, 186, 189, 0.75);
    }
`;

const PreviewPopoverContent = styled.div`
    cursor: pointer;
    padding: 8px 0;
`;

const PreviewMoreIconContainer = styled.div<DisabledProps>`
    cursor: pointer;
    margin: auto;
    min-height: 24px;
    min-width: 24px;
    margin-right: 24px;
    ${({ disabled }) => disabled && disabledStyles}
`;

const PreviewMoreIcon = styled(MoreHoriz)`
    color: ${dsmColors.colorNeutral600};
    &:hover {
        color: ${dsmColors.colorNeutral900};
    }
`;

export {
    PreviewActionContainer,
    PreviewActionIcon,
    PreviewActionText,
    PreviewCreateActionContainer,
    PreviewDeleteActionContainer,
    PreviewPopoverWrapper,
    PreviewMoreIcon,
    PreviewMoreIconContainer,
    PreviewPopoverContent,
};
