import { Steps } from '../step-definitions/RedirectAfterLoginUseCase.steps';

describe('Use Case: An authenticated user is redirected to the Editor app if there is NO deep link present', () => {

    const steps = new Steps();
    const href = 'http://site.com/#/signin';
    const destinationUrl = '/user/';

    it('Given a location object', () => steps.initLocation());
    it(`And a current href with value=${href}`, () => steps.initHref(href));
    it('And a service to navigate URLs', () => steps.initNavigatorService());
    it('And a service to read redirect destinations', () => steps.initRedirectReaderService());
    it('And a use case to deep link the user', () => steps.initDeepLinkingUseCase());
    it('When I invoke the use case', () => steps.invokeUseCase());
    it(`Then the browser has navigated to ${destinationUrl}`, () => steps.checkUrlIs(destinationUrl));

});

describe('Use Case: An authenticated user is redirected from the login page to the Shop deep link', () => {

    const steps = new Steps();
    const href = 'http://site.com/?goToApp=shop/#/signin';
    const destinationUrl = '/product';

    it('Given a location object', () => steps.initLocation());
    it(`And a current href with value=${href}`, () => steps.initHref(href));
    it('And a service to navigate URLs', () => steps.initNavigatorService());
    it('And a service to read redirect destinations', () => steps.initRedirectReaderService());
    it('And a use case to deep link the user', () => steps.initDeepLinkingUseCase());
    it('When I invoke the use case', () => steps.invokeUseCase());
    it(`Then the browser has navigated to ${destinationUrl}`, () => steps.checkUrlIs(destinationUrl));

});
