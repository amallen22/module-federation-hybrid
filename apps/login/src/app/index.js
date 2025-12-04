import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/system';
import values from 'object.values'; /* Adding Polyfills */
import { analyticsClient } from '@npm_leadtech/cv-lib-app-analytics';
import { CvMuiTheme } from '@npm_leadtech/cv-lib-app-components';
import { getLogger, setupLog } from '@npm_leadtech/cv-lib-app-jsnlog';

import { API_URL, APP_CONFIG } from './config/appConfig';
import { SetupTranslations } from './services/SetupTranslations';
import Controller from './Controller';
import { trackAppInstalls } from './trackAppInstalls';

import './styles/cv.scss';

const { tagManagerId, amplitudeKey } = APP_CONFIG;

const tagManagerArgs = {
    gtmId: tagManagerId,
    dataLayer: {
        dataLayerName: 'dataLayer',
    },
};

analyticsClient.initialize(tagManagerArgs, amplitudeKey);

setupLog({
    apiPrefix: API_URL,
    appName: 'cv-app-login'
});

global.CV = global.CV || {};
global.CV.Log = getLogger();

SetupTranslations();

if (!Object.values) {
    values.shim();
}

const rootElement = document.getElementById('app');

render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={CvMuiTheme}>
            <Controller />
        </ThemeProvider>
    </StyledEngineProvider>,
    rootElement
);

trackAppInstalls();
