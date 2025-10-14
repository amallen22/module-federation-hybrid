import { InitialLoading, StepNavBar } from '@npm_leadtech/cv-lib-app-components';
import StorePackage from '@npm_leadtech/cv-storage-js';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_CONFIG } from '../../config/appConfig';
import { isMobile } from '../../helpers/isMobile';
import { useAppSelector } from '../../internals/redux/hooks';
import { Routes } from '../../internals/router/Routes';
import { Language } from '../../models/language';
import { ReviewCookieEnum, ReviewStatusEnum } from '../../models/review';
import { AppLanguageSelector } from '../AppLanguageSelector/AppLanguageSelector';
import { DropdownMenu } from './Dropdown/Dropdown';

const domain = APP_CONFIG.domain;
const basePath = `https://static.${domain}`;

/**
 * Load static images/icons from s3
 */
const getAssetPathFromS3 = (subPath: string) => {
    return `${basePath}${subPath}`;
};

interface Props {
    groupPermission: string | null;
    loadingProfile: boolean;
    languages?: Language[];
    languagesLoaded: boolean;
    firstName?: string;
    lastName?: string;
    profilePhoto?: string;
}

interface NavbarTab {
    key: string;
    urlPath: string;
    title: string;
    information?: string | null;
    notification?: boolean;
}

export const NavBarMenu = ({
    groupPermission,
    loadingProfile,
    languages,
    languagesLoaded,
    firstName,
    lastName,
    profilePhoto,
}: Props) => {
    const resumeCount = useAppSelector((state) => state.documents.resumeCount);
    const letterCount = useAppSelector((state) => state.documents.letterCount);
    const { reviewStatus } = useAppSelector((state) => state.documentReview);
    const navigate = useNavigate();
    const cookiesStorage = StorePackage.StorageManager();
    const cookieValue = cookiesStorage.getCookie(ReviewCookieEnum.REVIEWED_COOKIE);

    function showNotification() {
        return reviewStatus === ReviewStatusEnum.REVIEWED && !cookieValue;
    }

    const [menuItemsConfig, setMenuItemsConfig] = useState<NavbarTab[]>([
        {
            key: 'dashboard',
            urlPath: `${Routes.dashboard}`,
            title: translate('Dashboard'),
        },
        {
            key: 'documents',
            urlPath: `${Routes.documents}`,
            title: translate('Documents'),
        },
        {
            key: 'review',
            urlPath: `${Routes.review}`,
            title: translate('Resume review'),
            notification: showNotification(),
        },
    ]);

    useEffect(() => {
        if (!resumeCount && !letterCount) return;

        const numberOfDocuments = resumeCount + letterCount;
        setMenuItemsConfig([
            {
                key: 'dashboard',
                urlPath: `${Routes.dashboard}`,
                title: translate('Dashboard'),
            },
            {
                key: 'documents',
                urlPath: `${Routes.documents}`,
                title: translate('Documents'),
                information: numberOfDocuments > 1 ? `${numberOfDocuments}` : null,
            },
            {
                key: 'review',
                urlPath: `${Routes.review}`,
                title: translate('Resume review'),
                notification: showNotification(),
            },
        ]);
    }, [cookieValue]);

    useEffect(() => {
        if (!resumeCount && !letterCount) return;

        const numberOfDocuments = resumeCount + letterCount;
        setMenuItemsConfig([
            {
                key: 'dashboard',
                urlPath: `${Routes.dashboard}`,
                title: translate('Dashboard'),
            },
            {
                key: 'documents',
                urlPath: `${Routes.documents}`,
                title: translate('Documents'),
                information: numberOfDocuments > 1 ? `${numberOfDocuments}` : null,
            },
            {
                key: 'review',
                urlPath: `${Routes.review}`,
                title: translate('Resume review'),
                notification: showNotification(),
            },
        ]);
    }, [resumeCount, letterCount, reviewStatus]);

    const onClickLogoHandler = () => {
        document.location.href = '/user';
    };

    const handleRedirect = (path: string) => {
        window.location.href = path;
    };

    const getCurrentPath = () => {
        const pathname = window.location.pathname;
        return pathname;
    };

    const renderLanguageSelector = () => (
        <AppLanguageSelector languages={languages} languagesLoaded={languagesLoaded} />
    );

    const renderDropdown = () => <DropdownMenu firstName={firstName} lastName={lastName} profilePhoto={profilePhoto} />;

    if (loadingProfile) {
        return (
            <div className='cv-initial-loading'>
                <InitialLoading />
            </div>
        );
    }

    return (
        <StepNavBar
            logo={`${getAssetPathFromS3('/assets/')}${APP_CONFIG.assets}/logo_desktop.png`}
            logoMobile={`${getAssetPathFromS3('/assets/')}${APP_CONFIG.assets}/logo_mobile.png`}
            onClickLogo={onClickLogoHandler}
            LanguageSelector={renderLanguageSelector}
            menuItems={menuItemsConfig}
            onClickMenuItem={handleRedirect}
            currentUrl={getCurrentPath()}
            groupPermission={groupPermission === 'limited' ? 'premium' : groupPermission}
            upgradeText={translate('Upgrade now')}
            isMobile={isMobile}
            Dropdown={renderDropdown}
            navigate={navigate}
            showIcon={false}
        />
    );
};
