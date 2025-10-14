import './styles/global.scss';
import './styles/global.scss';

import { ThemeProvider } from '@mui/material/styles';
import { analyticsClient, UserType } from '@npm_leadtech/cv-lib-app-analytics';
import { GoToTopButton, InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import { FavIconInjector } from '@npm_leadtech/cv-lib-app-config';
import { getLogger } from '@npm_leadtech/cv-lib-app-jsnlog';
import { CookieGeneratorHandler, HandleVisitorUseCase } from '@npm_leadtech/cv-lib-visitor';
import StorePackage from '@npm_leadtech/cv-storage-js';
import { QueryStringService } from '@npm_leadtech/jsr-lib-http';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { NavBarMenu } from './components/Menu/NavBar';
import { API_URL, APP_CONFIG } from './config/appConfig';
import { getCookie } from './helpers/getCookie';
import useLanguages from './hooks/useLanguages';
import useProfile from './hooks/useProfile';
import { getReviews } from './internals/redux/documentReviewSlice';
import { useAppDispatch } from './internals/redux/hooks';
import { RouteMounter } from './internals/router';
import { Routes } from './internals/router/Routes';
import { Error } from './models/error';
import { SetLanguage } from './services/SetupTranslations';
import { CvMuiTheme } from './styles/CvMuiTheme';

export const App = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const { groupPermission, loadingProfile, firstName, lastName, profilePhoto } = useProfile();
    const { languages, languagesLoaded } = useLanguages();
    const cookiesStorage = StorePackage.StorageManager();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // TODO - refactor cv-lib-app-config with a static FavIconInjector to avoid this abomination
        new FavIconInjector({
            localizationDataStore: APP_CONFIG,
        }).injectFavIcons();
        const queryStringService = new QueryStringService();
        const cookieGenerator = new CookieGeneratorHandler(API_URL);
        const urlRequest = '/visitor';
        const cvSessionStore = StorePackage.sessionStoreCookie({
            apiTimeout: 10,
            apiEndpoint: API_URL + urlRequest,
        });

        new HandleVisitorUseCase(queryStringService, cookieGenerator, cookiesStorage)
        .invoke()
        .then(() => {
            return SetLanguage(cvSessionStore.getLanguage());
        })
        .then(() => {
            forceLogout(cvSessionStore);
        })
        .catch((err: Error) => {
            getLogger().fatalException('Editor HandleVisitorUseCase', err);
            forceLogout(cvSessionStore);
        });
    }, []);

    useEffect(() => {
        const userId = getCookie().userid;
        if (userId) {
            // @ts-ignore
            dataLayer.push({
                'user_id': userId,
            });
            analyticsClient.setUserId(userId);
        }
    }, []);

    useEffect(() => {
        dispatch(getReviews());
    }, []);

    useEffect(() => {
        if (!loadingProfile && groupPermission) {
            const cookieValue = cookiesStorage.getCookie('cv_session_store');
            const userId = JSON.parse(cookieValue).userid;

            analyticsClient.setUserType(userId ? UserType.Registered : UserType.Visitor);
        }
    }, [groupPermission, loadingProfile]);

    function forceLogout(cvSessionStore: { get: Function }) {
        if (!Boolean(cvSessionStore.get('access'))) {
            window.location.href = Routes.signout;
        } else {
            setInitialLoading(false);
        }
    }

    if (initialLoading) {
        return (
            <div className='cv-initial-loading' data-qa='user-loader'>
                <InitialLoading />
            </div>
        );
    }

    return (
        <ThemeProvider theme={CvMuiTheme}>
            <Router>
                <NavBarMenu
                    groupPermission={groupPermission}
                    loadingProfile={loadingProfile}
                    languages={languages}
                    languagesLoaded={languagesLoaded}
                    firstName={firstName}
                    lastName={lastName}
                    profilePhoto={profilePhoto}
                />
                <RouteMounter />
            </Router>
            <GoToTopButton />
        </ThemeProvider>
    );
};
