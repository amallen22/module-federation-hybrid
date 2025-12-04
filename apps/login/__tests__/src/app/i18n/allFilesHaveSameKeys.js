import { L10N_LANGUAGES } from '../../../../src/app/services/SetupTranslations';
import tests from '@npm_leadtech/cv-tests-app-common';

tests.i18n.allFilesHaveSameKeys({
    sourceLanguage: 'en-US',
    destLanguages: L10N_LANGUAGES
});
