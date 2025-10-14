// We need to mock these modules when running any test:

// - this one is used to point to our AWS MOCK API
jest.mock(
    '../../src/app/config/config',
    () => require('../../__mocks__/app-config'),
    { virtual: true });

jest.mock(
    '../../src/app/services/SetupTranslations',
    () => require('../../__mocks__/SetupTranslations')
);
    
// - this one mocks log calls to CloudWatch
global.CV = {
    Log: {
        fatalException: jest.fn()
    },
    setupLog: jest.fn()
};

// Mock assign as people at Facebook do: https://github.com/facebook/jest/issues/890#issuecomment-295939071
// Then in our tests, we can: expect(window.location.assign).toBeCalledWith('some-cool-path');
// Object.defineProperty(global, 'location', {
//     assign: jest.fn(),
// });
Object.defineProperty(global, 'location', {
    value: { assign: jest.fn() }
});
