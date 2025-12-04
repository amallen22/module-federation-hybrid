import CVStorage from '@npm_leadtech/cv-storage-js';
import { AjaxHandler } from '@npm_leadtech/jsr-lib-http';

import { I18N_BASE_URL } from '../../../config/appConfig';
import { FrontLogService } from '../../FrontLogService';
import endpointDefinition from './api.json';
import { GetLanguageReducer } from './GetLanguageReducer.js';

export class GetLanguageHandler extends AjaxHandler {
    constructor () {
        const apiPrefix = I18N_BASE_URL || document.location.origin;
        console.log('[GetLanguageHandler] I18N_BASE_URL:', I18N_BASE_URL);
        console.log('[GetLanguageHandler] apiPrefix:', apiPrefix);
        console.log('[GetLanguageHandler] document.location.origin:', document.location.origin);
        
        super({
            apiPrefix: apiPrefix,
            errorHandler: FrontLogService.logAjaxResponse,
            endpointDefinition,
            reducer: GetLanguageReducer,
            sessionStoreCookie: CVStorage.sessionStoreCookie
        });
    }
}