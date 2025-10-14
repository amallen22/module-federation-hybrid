import { useEffect, useState } from 'react';

import { ApiError } from '../models/error';
import { Language } from '../models/language';
import { isDevelopment, mockDelay, mockLanguages } from '../mocks/mockData';
import { apiService } from '../services/ApiService';
import { FrontLogService } from '../services/FrontLogService';

function useLanguages() {
    const [languages, setLanguage] = useState<Array<Language>>();
    const [languagesLoaded, setLanguageLoaded] = useState(false);

    const onPrefetchError = (err: Error) => {
        FrontLogService.logAjaxResponse({
            className: 'withLanguages',
            funcName: 'componentDidMount',
            err,
        });
    };

    useEffect(() => {
        // En desarrollo local, usar datos mock para evitar errores de CORS
        if (isDevelopment) {
            console.log('🔧 [DEV MODE] Using mock languages data');
            mockDelay(200).then(() => {
                setLanguage(mockLanguages);
                setLanguageLoaded(true);
            });
            return;
        }

        // En producción, usar la API real
        apiService
        .getLanguages()
        .then((res) => {
            setLanguage(res);
            setLanguageLoaded(true);
        })
        .catch(onPrefetchError);
    }, []);

    return { languages, languagesLoaded };
}

export default useLanguages;
