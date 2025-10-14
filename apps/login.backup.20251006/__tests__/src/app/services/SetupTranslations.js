const L10N_LANGUAGES = require('../../../../src/app/services/SetupTranslations').L10N_LANGUAGES;
const fs = require('fs');

describe('Check if language files exists', () => {
    it('SetupTranslation crashes if file is missing', () => {
        for (let index = 0; index < L10N_LANGUAGES.length; index++) {
            expect(fs.existsSync('./src/app/i18n/' + L10N_LANGUAGES[index] + '.json')).toBeTruthy();
        }
    });
});
