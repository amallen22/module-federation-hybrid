import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/system';
import { CvMuiTheme } from '@npm_leadtech/cv-lib-app-components';

import { API_URL, APP_CONFIG } from './config/appConfig';

// Importaciones comentadas temporalmente para debugging
import { analyticsClient } from '@npm_leadtech/cv-lib-app-analytics';
import { setupLog } from '@npm_leadtech/cv-lib-app-jsnlog';
import { SetupTranslations } from './services/SetupTranslations';
import Controller from './Controller';
import { trackAppInstalls } from './trackAppInstalls';
import './styles/cv.scss';

const { tagManagerId, amplitudeKey } = APP_CONFIG;

const App = () => {
  useEffect(() => {
    console.log('🚀 App: Iniciando configuración...');
    // console.log('APP_CONFIG:', APP_CONFIG);
    // console.log('API_URL:', API_URL);
    // console.log('tagManagerId:', tagManagerId);
    // console.log('amplitudeKey:', amplitudeKey);
    
    // Comentado temporalmente para debugging
    // // Initialize analytics
    // const tagManagerArgs = {
    //   gtmId: tagManagerId,
    //   dataLayer: {
    //     dataLayerName: 'dataLayer',
    //   },
    // };
    // analyticsClient.initialize(tagManagerArgs, amplitudeKey);
    
    // Setup logging
    // setupLog({
    //   apiPrefix: API_URL,
    //   appName: 'login'
    // });
    
    // Setup translations
    SetupTranslations();
    
    // Track app installs
    // trackAppInstalls();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={CvMuiTheme}>
        <Controller />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
