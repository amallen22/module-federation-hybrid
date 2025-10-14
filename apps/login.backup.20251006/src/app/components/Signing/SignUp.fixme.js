
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import tests from '@npm_leadtech/cv-tests-app-common';

import { L10N_LANGUAGES } from '../../services/SetupTranslations';

configure({ adapter: new Adapter() });

describe('<SignUp />', () => {

    tests.i18n.componentTestsRunner({
        componentPathFromBase: 'src/app/components/Signin/SignUp.js',
        props: {
            localizationDataStore: {
                domain: 'local.resumecoach.com',
                privacyPolicyUrl: 'mock-privacy-policy-url',
                termsOfUserUrl: 'mock-terms-of-user-url'
            }
        },
        omitStrings: [/\s+/g],
        languages: L10N_LANGUAGES
    });

});
