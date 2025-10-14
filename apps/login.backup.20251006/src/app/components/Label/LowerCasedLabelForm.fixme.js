
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import tests from '@npm_leadtech/cv-tests-app-common';

import { L10N_LANGUAGES } from '../../services/SetupTranslations';

configure({ adapter: new Adapter() });

describe('<LowerCasedLabelForm />', () => {
    const code = 'Verification code';

    tests.i18n.componentTestsRunner({
        componentPathFromBase: 'src/app/components/Label/LowerCasedLabelForm.js',
        props: {
            send: jest.fn(),
            inputName: 'verification',
            labelContent: code
        },
        omitStrings: [code],
        languages: L10N_LANGUAGES
    });

});
