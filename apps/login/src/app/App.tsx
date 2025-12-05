// Polyfills DEBEN ser el primer import (side-effect import)
import React, { useEffect } from 'react';
import values from 'object.values';
import { analyticsClient } from '@npm_leadtech/cv-lib-app-analytics';
import { getLogger, setupLog } from '@npm_leadtech/cv-lib-app-jsnlog';

import { API_URL, APP_CONFIG } from './config/appConfig';
import { SetupTranslations } from './services/SetupTranslations';
import Controller from './Controller';
import { trackAppInstalls } from './trackAppInstalls';

import './styles/cv.scss';

import '../polyfills';

const App = () => {
    useEffect(() => {
        try {
            const { tagManagerId, amplitudeKey } = APP_CONFIG || {};

            if (tagManagerId && amplitudeKey) {
                const tagManagerArgs = {
                    gtmId: tagManagerId,
                    dataLayer: {
                        dataLayerName: 'dataLayer',
                    },
                };

                analyticsClient.initialize(tagManagerArgs, amplitudeKey);
            }

            if (API_URL) {
                setupLog({
                    apiPrefix: API_URL,
                    appName: 'cv-app-login'
                });
            }

            if (typeof window !== 'undefined') {
                window.CV = window.CV || {};
                window.CV.Log = getLogger();
            }

            SetupTranslations();

            if (!Object.values) {
                values.shim();
            }

            trackAppInstalls();
        } catch (error) {
            console.error('Error initializing login app:', error);
        }
    }, []);

    return (
        <React.StrictMode>
            <Controller />
        </React.StrictMode>
    );
};

export default App;
export { App };

