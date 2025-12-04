export class DeepLinkingUseCase {

    constructor (navigatorService, redirectReaderService) {
        this.navigatorService = navigatorService;
        this.redirectReaderService = redirectReaderService;
    }

    invoke () {
        const destination = this.redirectReaderService.getDestination();
        this.navigatorService.navigateTo(destination);
    }

}
