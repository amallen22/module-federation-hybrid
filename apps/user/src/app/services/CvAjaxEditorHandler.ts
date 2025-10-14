import StorePackage from '@npm_leadtech/cv-storage-js';
import { AjaxHandler } from '@npm_leadtech/jsr-lib-http';

import { API_EDITOR_URL } from '../config/appConfig';
import { OnErrorMiddleware } from '../internals/ajax/OnErrorMiddleware';
import { Options } from './CvAjaxHandler';
import { FrontLogService } from './FrontLogService';

export class CvAjaxEditorHandler<R> extends AjaxHandler {
    customAction(params?: any): Promise<R> {
        return super.customAction(params);
    }

    constructor({ endpointDefinition, reducer }: Options) {
        let errorHandler: any = FrontLogService.logAjaxResponse;

        if (endpointDefinition.logOutOnCodeRanges) {
            const errorMiddleware = new OnErrorMiddleware({
                logOutOnCodeRanges: endpointDefinition.logOutOnCodeRanges,
            });

            errorHandler = errorMiddleware.invoke.bind(errorMiddleware);
        }

        super({
            apiPrefix: API_EDITOR_URL,
            errorHandler: errorHandler,
            sessionStoreCookie: StorePackage.sessionStoreCookie,
            endpointDefinition,
            reducer,
        });
    }
}
