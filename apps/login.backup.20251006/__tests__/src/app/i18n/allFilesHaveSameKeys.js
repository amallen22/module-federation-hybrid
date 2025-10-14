const { L10N_LANGUAGES } = require('../../../../src/app/services/SetupTranslations');
const path = require('path');

describe('All translation files have the same keys', () => {
    const ext = 'json';
    const baseDir = path.join(process.cwd(), 'src/app/i18n');
    const sourceLanguage = 'en-US';
    const destLanguages = L10N_LANGUAGES;

    const sourceFile = require(path.join(baseDir, `${sourceLanguage}.${ext}`));
    const sourceKeys = Object.keys(sourceFile);

    test('Source file should have keys', () => {
        expect(sourceKeys.length).toBeGreaterThan(0);
    });

    for (let language of destLanguages) {
        describe(`Language: ${language}`, () => {
            const destFile = require(path.join(baseDir, `${language}.${ext}`));
            const destKeys = Object.keys(destFile);

            test(`Should have same number of keys as source`, () => {
                expect(destKeys.length).toBe(sourceKeys.length);
            });

            for (let sourceKey of sourceKeys) {
                test(`Should have key: ${sourceKey}`, () => {
                    const translation = destFile[sourceKey];
                    expect(translation).toBeDefined();
                    expect(typeof translation).toBe('string');
                    expect(translation.length).toBeGreaterThan(0);
                });
            }
        });
    }
});
