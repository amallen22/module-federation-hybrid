
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import tests from '@npm_leadtech/cv-tests-app-common';

import { L10N_LANGUAGES } from '../../services/SetupTranslations';

configure({ adapter: new Adapter() });

describe('<PasswordRescue />', () => {

    tests.i18n.componentTestsRunner({
        componentPathFromBase: 'src/app/components/Password/PasswordRescue.js',
        props: {},
        omitStrings: ['arrow_back'],
        languages: L10N_LANGUAGES
    });

});
