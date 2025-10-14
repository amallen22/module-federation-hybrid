
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import tests from '@npm_leadtech/cv-tests-app-common';

import { L10N_LANGUAGES } from '../../services/SetupTranslations';

configure({ adapter: new Adapter() });

describe('<LinkedInLogin />', () => {

    tests.i18n.componentTestsRunner({
        componentPathFromBase: 'src/app/components/LinkedIn/LinkedInLogin.js',
        props: {},
        languages: L10N_LANGUAGES
    });

});
