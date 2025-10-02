import styled from '@emotion/styled';
import { makeStyles } from '@mui/styles';
import { dsmBreakpoints, dsmColors, dsmTypography } from '@npm_leadtech/cv-lib-app-components';

const { breakpoint } = dsmBreakpoints;

const { PrimaryFontFamily } = dsmTypography;

interface Open {
    open: boolean;
}

export const ProfileAvatar = styled.img`
    width: 32px;
    height: 32px;
`;

export const ProfileInfo = styled.div`
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ProfileUserName = styled.div`
    display: none;
    ${breakpoint.screenM} {
        display: block;
        font-family: Roboto;
        font-size: 18px;
        line-height: 1.4;
        color: ${dsmColors.colorNeutral700};
        margin-left: 12px;
        overflow: hidden;
        text-wrap: nowrap;
    }

    @media (max-width: 1049px) {
        display: none;
    }
`;

export const ProfileDropdownIcon = styled.img<Open>`
    display: none;
    ${breakpoint.screenM} {
        display: block;
        width: 24px;
        height: 24px;
        margin-top: 2px;
        transform: scaleY(1);
        ${(props) =>
        props.open &&
            `
            transform: scaleY(-1);
        `}
    }

    @media (max-width: 1049px) {
        display: none;
    }
`;

interface Props {
    profilePhoto?: string;
}

export const ProfilePhotoCircle = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border: ${(props) => (props.profilePhoto ? '' : `solid 1px ${dsmColors.colorPrimary100}`)};
    background-color: ${dsmColors.colorPrimary50};
    border-radius: 50px;
    font-size: 14.4px;
    font-weight: 500;
    line-height: 1.5;
    color: ${dsmColors.colorPrimary400Base};
    background-image: url(${(props) => (props.profilePhoto ? props.profilePhoto : '')});
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: -7px;
`;

export const stylesPopOver = makeStyles(() => ({
    PopOverPaper: {
        borderRadius: '4px',
        minWidth: '200px',
        boxSizing: 'border-box',
        boxShadow: '0 3px 8px 0 rgba(181, 186, 189, 0.75)',
    },
}));

export const PopOverContent = styled.div`
    ${PrimaryFontFamily};
    font-size: 16px;
    line-height: 1.5;
`;

export const PopOverItem = styled.a`
    display: block;
    ${PrimaryFontFamily};
    font-size: 16px;
    line-height: 1.5;
    color: ${dsmColors.colorNeutral800};
    padding: 18px 24px;
    box-sizing: border-box;
    transition: 0.1s all;
    display: flex;
    align-items: center;
    gap: 6px;
    &:hover {
        background-color: ${dsmColors.colorNeutral200};
    }
    &:last-child {
        color: ${dsmColors.colorError900Text};
    }
`;
