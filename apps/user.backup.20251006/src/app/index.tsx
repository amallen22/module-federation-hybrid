import { analyticsClient } from '@npm_leadtech/cv-lib-app-analytics';
import { setupLog } from '@npm_leadtech/cv-lib-app-jsnlog';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { API_URL, APP_CONFIG } from './config/appConfig';
import { App } from './App';
import store from './internals/redux/store';
import { SetupTranslations } from './services/SetupTranslations';

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
    appName: 'cv-app-user',
});

SetupTranslations();

const container = document.getElementById('app');
// @ts-ignore
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
