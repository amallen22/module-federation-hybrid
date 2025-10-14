import { Popover } from '@mui/material';
import { useMobile } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useState } from 'react';

import { APP_CONFIG } from '../../../config/appConfig';
import { Routes } from '../../../internals/router/Routes';
import DropdownIcon from './img/dropdown-icon.svg';
import {
    PopOverContent,
    PopOverItem,
    ProfileDropdownIcon,
    ProfileInfo,
    ProfilePhotoCircle,
    ProfileUserName,
    stylesPopOver,
} from './styles';

interface Item {
    key: string;
    urlPath: string;
    title: string;
    target: string;
}

interface Props {
    firstName?: string;
    lastName?: string;
    profilePhoto?: string;
}

const DropdownMenu = ({ firstName, lastName, profilePhoto }: Props) => {
    const userName = `${firstName ? firstName : ''}${lastName ? ` ${lastName}` : ''}`;

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { isMobile } = useMobile();

    // TODO SVG element click
    const handlePopOverClick = (event: any) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handlePopOverClose = () => {
        setAnchorEl(null);
    };

    const open = !!anchorEl;
    const id = open ? 'simple-popover' : undefined;

    const classes = stylesPopOver();

    const contactUrl = `https://www.${APP_CONFIG.domain}${APP_CONFIG.contactUrl}`;

    const menuDropdownConfig = [
        {
            key: 'settings',
            urlPath: Routes.profile,
            title: translate('Settings'),
            target: '_self',
        },
        {
            key: 'help',
            urlPath: contactUrl,
            title: translate('Help & Contact'),
            target: '_blank',
        },
        {
            key: 'signout',
            urlPath: Routes.signout,
            title: translate('Sign Out'),
            target: '_self',
        },
    ];

    const renderPhotoOrCircle = () => {
        if (!profilePhoto) {
            const initialFirstName = firstName?.charAt(0);
            const initialLastName = lastName?.charAt(0);
            return (
                <ProfilePhotoCircle data-qa='avatar-button-dropdown'>
                    {initialFirstName}
                    {initialLastName}
                </ProfilePhotoCircle>
            );
        }
        return <ProfilePhotoCircle data-qa='avatar-button-dropdown' profilePhoto={profilePhoto} />;
    };

    return (
        <>
            <ProfileInfo onClick={handlePopOverClick}>
                {renderPhotoOrCircle()}
                <ProfileUserName data-qa='avatar-name-text'>{userName}</ProfileUserName>
                {!isMobile && <ProfileDropdownIcon open={anchorEl !== null} src={DropdownIcon} />}
            </ProfileInfo>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopOverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                classes={{ paper: classes.PopOverPaper }}
            >
                <PopOverContent>
                    {menuDropdownConfig.map((item: Item) => (
                        <PopOverItem key={item.key} target={item.target} href={item.urlPath} data-qa={item.key}>
                            {item.title}
                        </PopOverItem>
                    ))}
                </PopOverContent>
            </Popover>
        </>
    );
};

export { DropdownMenu };
