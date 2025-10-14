
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import tests from '@npm_leadtech/cv-tests-app-common';

import { L10N_LANGUAGES } from '../../services/SetupTranslations';

configure({ adapter: new Adapter() });

describe('<IntroductionTop />', () => {
    const principal = 'Forgot your password?';
    const content = 'Instantly start building your resume';
    const classes = 'm-signin-introduction';

    tests.i18n.componentTestsRunner({
        componentPathFromBase: 'src/app/components/lib/IntroductionTop.js',
        props: {
            principal: principal,
            content: content,
            classes: classes
        },
        omitStrings: [principal, content],
        languages: L10N_LANGUAGES
    });

});
