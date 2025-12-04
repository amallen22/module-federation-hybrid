import { RedirectReaderService } from './RedirectReaderService';

import 'url-polyfill';

export class AppRedirectReaderService extends RedirectReaderService {

    constructor (href) {
        super();
        this.href = href;
    }

    getDestination () {
        const searchParams = new URL(this.href).searchParams;
        const goToApp = searchParams.get('goToApp');
        const providerType = searchParams.get('pt') || '';
        const providerName = searchParams.get('pn') || '';
        const productId = searchParams.get('pi') || '';

        let app = null;

        if (!goToApp) {
            return { app };
        }

        let params = {};
        params.providerType = providerType.replace(/\//g, '');
        params.providerName = providerName.replace(/\//g, '');
        params.productId = productId.replace(/\//g, '');

        app = goToApp.replace(/\//g, ''); // in case there are trailing slashes, then "shop/" --> "shop"

        return { app, params };
    }
}
