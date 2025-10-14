import { sessionStoreCookie } from '@npm_leadtech/cv-storage-js';
import { AjaxHandler } from '@npm_leadtech/jsr-lib-http';

import { API_EDITOR_URL, API_URL } from '../config/appConfig';
import { FrontLogService } from './FrontLogService';
import { OnErrorMiddleware } from './OnErrorMiddleware';

// eslint-disable-next-line no-unused-vars
enum APP_URL {
    // eslint-disable-next-line no-unused-vars
    ApiUrl = API_URL,
    // eslint-disable-next-line no-unused-vars
    ApiEditorUrl = API_EDITOR_URL,
}

export interface Options {
    endpointDefinition: {
        method: string;
        path: string;
        params?: {
            [key: string]: {
                type: string;
                allowEmpty: boolean;
                required: boolean;
                description: string;
            };
        };
        urlParams?: { [key: string]: any };
        logOutOnCodeRanges?: { min: number; max: number }[];
        mockResponse?: any;
    };
    reducer: any;
    app?: APP_URL;
}

export class CvAjaxHandler<R> extends AjaxHandler {
    customAction(params?: any): Promise<R> {
        return super.customAction(params);
    }

    constructor({ endpointDefinition, app = API_URL, reducer }: Options) {
        let errorHandler = FrontLogService.logAjaxResponse;

        if (endpointDefinition.logOutOnCodeRanges) {
            const errorMiddleware = new OnErrorMiddleware({
                logOutOnCodeRanges: endpointDefinition.logOutOnCodeRanges,
            });
            errorHandler = errorMiddleware.invoke.bind(errorMiddleware);
        }

        super({
            apiPrefix: app,
            errorHandler,
            sessionStoreCookie,
            endpointDefinition,
            reducer,
        });
    }
}
