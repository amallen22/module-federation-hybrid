import { useEffect, useState } from 'react';

import { Error } from '../models/error';
import { Language } from '../models/language';
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
