import { NavigatorService } from './NavigatorService';

export class AppNavigatorService extends NavigatorService {

    constructor (location) {
        super(location);
    }

    navigateTo ({ app, params }) {
        const url = AppNavigatorService.getAppUrl({ app: app, params: params });
        this.location.assign(url);
    }

    static getAppUrl ({ app, params }) {

        switch (app) {
            case 'shop':
                return '/product';
            case 'editor':
            case 'user':
                return '/user/';
            case 'payment':
                // Is necessary providerType, providerName and productId. If one of them is missing or empty /payment will redirect to /product
                // eslint-disable-next-line no-case-declarations
                let searchParams = [];

                if (!!params.providerName) {
                    searchParams.push(`pn=${params.providerName}`);
                }

                if (!!params.productId) {
                    searchParams.push(`pi=${params.productId}`);
                }

                // eslint-disable-next-line no-case-declarations
                let queryString = '';

                if (!!searchParams.length) {
                    queryString = `/?${searchParams.join('&')}`;
                }
                return `/payment/${ params.providerType || '' }${ queryString }`;
            default:
                return '/user/';
        }
    }
}
