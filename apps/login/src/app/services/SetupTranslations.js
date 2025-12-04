import translate from 'counterpart';

import { GetLanguageHandler } from './api/GetLanguage/GetLanguageHandler';

export const SetupTranslations = function() {
    translate.setSeparator('|');
};

export const SetLanguage = function(language) {
    console.log('[SetLanguage] Called with language:', language);
    const handler = new GetLanguageHandler();
    console.log('[SetLanguage] Handler created, calling customAction...');
    
    return handler.customAction({ language })
    .then(res => {
        console.log('[SetLanguage] customAction resolved, response:', res);
        console.log('[SetLanguage] Response type:', typeof res);
        console.log('[SetLanguage] Response keys:', res ? Object.keys(res).slice(0, 5) : 'null');
        
        if (!res) {
            console.error('[SetLanguage] Response is null or undefined');
            throw new Error('Translation response is empty');
        }
        
        translate.registerTranslations(language, res);
        translate.setLocale(language);
        console.log('[SetLanguage] Translation registered and locale set to:', language);
        console.log('[SetLanguage] Current locale:', translate.getLocale());
        console.log('[SetLanguage] Available translations:', Object.keys(translate.translations || {}));
        
        return res;
    })
    .catch(error => {
        console.error('[SetLanguage] Error loading translation:', error);
        console.error('[SetLanguage] Error message:', error?.message);
        console.error('[SetLanguage] Error stack:', error?.stack);
        throw error;
    });
};