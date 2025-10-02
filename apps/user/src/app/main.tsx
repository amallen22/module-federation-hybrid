import { analyticsClient } from '@npm_leadtech/cv-lib-app-analytics';
import { setupLog } from '@npm_leadtech/cv-lib-app-jsnlog';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';
import { API_URL, APP_CONFIG } from './config/appConfig';
import store from './internals/redux/store';
import { SetupTranslations } from './services/SetupTranslations';

// Componente principal para Module Federation
const UserApp = () => {
    useEffect(() => {
        // Inicialización que antes estaba en el nivel superior
        // const { tagManagerId, amplitudeKey } = APP_CONFIG;
        
        // const tagManagerArgs = {
        //     gtmId: tagManagerId,
        //     dataLayer: {
        //         dataLayerName: 'dataLayer',
        //     },
        // };
        
        // analyticsClient.initialize(tagManagerArgs, amplitudeKey);
        // console.log('API_URL ***************************************************************', API_URL);
        
        // setupLog deshabilitado en local para evitar CORS
        // setupLog({
        //     apiPrefix: API_URL,
        //     appName: 'user',
        // });
        
        // SetupTranslations();
    }, []);
    
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

// Si está siendo ejecutado como aplicación standalone
if (typeof document !== 'undefined' && document.getElementById('app')) {
    const container = document.getElementById('app');
    // @ts-ignore
    const root = createRoot(container);
    root.render(<UserApp />);
}

// Exportar para Module Federation
export default UserApp;