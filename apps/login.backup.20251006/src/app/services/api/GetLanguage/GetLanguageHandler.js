import CVStorage from '@npm_leadtech/cv-storage-js';
import { AjaxHandler } from '@npm_leadtech/jsr-lib-http';

import { FrontLogService } from '../../FrontLogService.js';
import endpointDefinition from './api.json';
import { GetLanguageReducer } from './GetLanguageReducer.js';

export class GetLanguageHandler extends AjaxHandler {
    constructor () {
        // Si estamos en localhost:5000, cambiamos a localhost:5003 donde está la app de login
        let apiPrefix = document.location.origin;
        if (apiPrefix === 'http://localhost:5000') {
            apiPrefix = 'http://localhost:5003';
        }
        
        super({
            apiPrefix: apiPrefix,
            errorHandler: FrontLogService.logAjaxResponse,
            endpointDefinition,
            reducer: GetLanguageReducer,
            sessionStoreCookie: CVStorage.sessionStoreCookie
        });
    }
}
