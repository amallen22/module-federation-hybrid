import { AppNavigatorService } from '../../src/app/services/NavigatorService/AppNavigatorService';
import { AppRedirectReaderService } from '../../src/app/services/RedirectReaderService/AppRedirectReaderService';
import { DeepLinkingUseCase } from '../../src/app/usecase/DeepLinkingUseCase';

export class Steps {

    constructor () {
        this.location = undefined;
        this.navigatorService = undefined;
    }

    initLocation () {
        this.location = global.location;
    }

    initHref (href) {
        this.initialHref = href;
    }

    initNavigatorService () {
        this.navigatorService = new AppNavigatorService(this.location);
    }

    initRedirectReaderService () {
        this.appRedirectReaderService = new AppRedirectReaderService(this.initialHref);
    }

    initDeepLinkingUseCase () {
        this.useCase = new DeepLinkingUseCase(this.navigatorService, this.appRedirectReaderService);
    }

    invokeUseCase () {
        this.useCase.invoke();
    }

    checkUrlIs (destinationUrl) {
        expect(this.location.assign).toBeCalledWith(destinationUrl);
    }

}
