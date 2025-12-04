
import translate from 'counterpart';

import DE from '../src/app/i18n/de-DE.json';
import GB from '../src/app/i18n/en-GB.json';
import US from '../src/app/i18n/en-US.json';
import AR from '../src/app/i18n/es-AR.json';
import ES from '../src/app/i18n/es-ES.json';
import FR from '../src/app/i18n/fr-FR.json';
import FR_OLD from '../src/app/i18n/fr.json';
import IT from '../src/app/i18n/it-IT.json';
import IT_OLD from '../src/app/i18n/it.json';
import JP from '../src/app/i18n/ja-JP.json';
import NL from '../src/app/i18n/nl-NL.json';
import PL from '../src/app/i18n/pl-PL.json';
import BR from '../src/app/i18n/pt-BR.json';
import HE from '../src/app/i18n/he-IL.json';
import CN from '../src/app/i18n/zh-CN.json';

export const langs = {
    'de-DE': DE,
    'en-GB': GB,
    'en-US': US,
    'es-AR': AR,
    'es-ES': ES,
    'fr': FR_OLD,
    'fr-FR': FR,
    'it': IT_OLD,
    'it-IT': IT,
    'ja-JP': JP,
    'he-IL': HE,
    'nl-NL': NL,
    'pl-PL': PL,
    'pt-BR': BR,
    'zh-CN': CN
};

export const L10N_LANGUAGES = Object.keys(langs);

export const SetupTranslations = function() {
    for (const [key, json] of Object.entries(langs)) {
        translate.registerTranslations(key, json);
    }
    translate.setSeparator('|');
};

export const SetLanguage = function(lang) {
    translate.setLocale(lang);
};