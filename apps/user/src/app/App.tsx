import './styles/global.scss';

import { ThemeProvider } from '@mui/material/styles';
import { analyticsClient, UserType } from '@npm_leadtech/cv-lib-app-analytics';
import { GoToTopButton, InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import { FavIconInjector } from '@npm_leadtech/cv-lib-app-config';
import { getLogger } from '@npm_leadtech/cv-lib-app-jsnlog';
import { CookieGeneratorHandler, HandleVisitorUseCase } from '@npm_leadtech/cv-lib-visitor';
import { sessionStoreCookie, StorageManager } from '@npm_leadtech/cv-storage-js';
import { QueryStringService } from '@npm_leadtech/jsr-lib-http';
// Import ErrorBoundary HOC from shared UI package
// import { withErrorBoundary } from '@packages/ui/components/withErrorBoundary';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { NavBarMenu } from './components/Menu/NavBar';
import { ReviewSnackbar } from './components/ReviewSnackbar/ReviewSnackbar';
import { API_URL, APP_CONFIG } from './config/appConfig';
import { getCookie } from './helpers/getCookie';
import useLanguages from './hooks/useLanguages';
import useProfile from './hooks/useProfile';
import { getReviews } from './internals/redux/documentReviewSlice';
import { useAppDispatch } from './internals/redux/hooks';
import { RouteMounter } from './internals/router';
import { Routes } from './internals/router/Routes';
// import { ApiError } from './models/error';
import { SetLanguage } from './services/SetupTranslations';
import { CvMuiTheme } from './styles/CvMuiTheme';

export const App = () => {
    // const [initialLoading, setInitialLoading] = useState(false);
    const { groupPermission, loadingProfile, firstName, lastName, profilePhoto } = useProfile();

    const { languages, languagesLoaded } = useLanguages();
    // const cookiesStorage = StorageManager();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        // TODO - refactor cv-lib-app-config with a static FavIconInjector to avoid this abomination
        
        console.log('App - loadingProfile ====================>', { loadingProfile, groupPermission, firstName, lastName, profilePhoto });
    }, [loadingProfile, groupPermission, firstName, lastName, profilePhoto]);

    // useEffect(() => {
    //     new FavIconInjector(
    //         localizationDataStore: APP_CONFIG,
    //     }).injectFavIcons();

    //     const queryStringService = new QueryStringService();
    //     const cookieGenerator = new CookieGeneratorHandler(API_URL);
    //     const urlRequest = '/visitor';
    //     const cvSessionStore = sessionStoreCookie({
    //         apiTimeout: 10,
    //         apiEndpoint: API_URL + urlRequest,
    //     });
        

    //     new HandleVisitorUseCase(queryStringService, cookieGenerator, cookiesStorage)
    //     .invoke()
    //     .then(() => {
    //         // console.log('cvSessionStore.getLanguage() :::: ', cvSessionStore.getLanguage());
    //         SetLanguage(cvSessionStore.getLanguage());
    //     })
    //     .then(() => {
    //         console.log('cvSessionStore :::: ', cvSessionStore);
    //         console.log('forceLogout(cvSessionStore) :::: ', forceLogout(cvSessionStore));

    //         forceLogout(cvSessionStore);
    //     })
    //     .catch((err: Error) => {
    //         console.error('Error in Editor HandleVisitorUseCase', err);
    //         // getLogger().fatalException deshabilitado en local para evitar CORS
    //         // getLogger().fatalException('Editor HandleVisitorUseCase', err);

    //         // forceLogout(cvSessionStore);
    //     });
    // }, []);

    // useEffect(() => {
    //     const userId = getCookie().userid;

    //     // console.log('UserId for analytics *************************************************************==>', userId);
    //     if (userId) {
    //         // @ts-ignore
    //         dataLayer.push({
    //             'user_id': userId,
    //         });
    //         analyticsClient.setUserId(userId);
    //     }
    // }, []);

    // Temporalmente comentado hasta arreglar mocks
    // useEffect(() => {
    //     dispatch(getReviews());
    // }, []);

    // useEffect(() => {
    //     console.log('cookieValue =======> ', cookiesStorage.getCookie('cv_session_store'));
    //     console.log('loadingProfile =======> ', loadingProfile);
    //     console.log('groupPermission =======> ', groupPermission);
    //     // if (!loadingProfile && groupPermission) {
    //     // if (loadingProfile) {
    //     const cookieValue = cookiesStorage.getCookie('cv_session_store');
    //     const userId = JSON.parse(cookieValue).userid;
    //     console.log('cookieValue 2 =======> ', cookieValue);
    //     analyticsClient.setUserType(userId ? UserType.Registered : UserType.Visitor);
    //     // }
    // }, [groupPermission, loadingProfile]);
        
    // function forceLogout(cvSessionStore: { get: Function }) {
    //     console.log('CV_SESSION_STORE __ GET ACCESS ==> ', cvSessionStore.get('access'));
    //     // if (!Boolean(cvSessionStore.get('access'))) {
    //     if (Boolean(cvSessionStore.get('access'))) {
    //         console.log('CV_SESSION_STORE NO ACCESS ------------------------------ LOGOUT');
    //         window.location.href = Routes.signout;
    //     } else {
    //         setInitialLoading(false);
    //         console.log('initialLoading ==> ', initialLoading);

    //     }
    // }
            
    // if (initialLoading) {
    //     console.log('InitialLoading - User App !!!!!!!!!!!!!!!!!!!!!!!!');
    //     return (
    //         <div className='cv-initial-loading'>
    //             <InitialLoading />
    //         </div>
    //     );
    // }

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
                <ReviewSnackbar />
                <RouteMounter />
            </Router>
            <GoToTopButton />
        </ThemeProvider>
    );
};

