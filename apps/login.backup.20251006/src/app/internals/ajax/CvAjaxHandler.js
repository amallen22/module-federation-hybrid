import CVStorage from '@npm_leadtech/cv-storage-js';
import { AjaxHandler } from '@npm_leadtech/jsr-lib-http';

import { API_URL } from '../../config/appConfig';
import { FrontLogService } from '../../services/FrontLogService';

export class CvAjaxHandler extends AjaxHandler {
    constructor ({ endpointDefinition, reducer }) {
        super({
            apiPrefix: API_URL,
            errorHandler: FrontLogService.logAjaxResponse,
            sessionStoreCookie: CVStorage.sessionStoreCookie,
            endpointDefinition,
            reducer
        });
    }
}