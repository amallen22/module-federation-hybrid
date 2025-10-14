import translate from 'counterpart';

import { GetLanguageHandler } from './api/GetLanguage/GetLanguageHandler';

export const SetupTranslations = function() {
    translate.setSeparator('|');
};

export const SetLanguage = function(language) {
    return new GetLanguageHandler().customAction({ language })
    .then(res => {
        translate.registerTranslations(language, res);
        translate.setLocale(language);
    });
};