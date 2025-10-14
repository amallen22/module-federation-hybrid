
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import tests from '@npm_leadtech/cv-tests-app-common';

import { L10N_LANGUAGES } from '../../../src/app/services/SetupTranslations';

configure({ adapter: new Adapter() });

describe('<SocialButtonsInline />', () => {

    tests.i18n.componentTestsRunner({
        componentPathFromBase: 'src/app/components/SocialButtonsInline/SocialButtonsInline.js',
        props: {},
        omitStrings: ['Facebook', 'Google', 'LinkedIn'],
        languages: L10N_LANGUAGES
    });

});
