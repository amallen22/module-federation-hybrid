
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import tests from '@npm_leadtech/cv-tests-app-common';

import { L10N_LANGUAGES } from '../../services/SetupTranslations';

configure({ adapter: new Adapter() });

describe('<LabelPassword />', () => {
    const content = 'New password';

    tests.i18n.componentTestsRunner({
        componentPathFromBase: 'src/app/components/Label/LabelPassword.js',
        props: {
            send: jest.fn(),
            onChange: jest.fn(),
            inputName: 'reset-password-new',
            labelContent: content
        },
        omitStrings: [content],
        languages: L10N_LANGUAGES
    });

});
