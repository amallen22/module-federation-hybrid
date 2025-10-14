import StorePackage from '@npm_leadtech/cv-storage-js';
import { AjaxHandler } from '@npm_leadtech/jsr-lib-http';

import { FrontLogService } from '../../../services/FrontLogService';
import endpointDefinition from './api.json';
import { GetLanguageReducer } from './GetLanguageReducer.js';

export class GetLanguageHandler extends AjaxHandler {
    constructor() {
        super({
            apiPrefix: document.location.origin,
            errorHandler: FrontLogService.logAjaxResponse,
            endpointDefinition,
            reducer: GetLanguageReducer,
            sessionStoreCookie: StorePackage.sessionStoreCookie,
        });
    }
}
