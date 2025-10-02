import { sessionStoreCookie } from '@npm_leadtech/cv-storage-js';
import { ActiveRequester, AjaxAction, EndpointService } from '@npm_leadtech/jsr-lib-http';

import { API_EDITOR_URL } from '../../../config/appConfig';
import endpointDefinition from './api.json';
import { GetDocumentPdfReducer } from './reducers';

export class GetDocumentPdfHandler {
    constructor(documentTitle) {
        this.documentTitle = documentTitle;
    }

    customAction(params) {
        const activeRequester = new ActiveRequester({
            sessionStoreCookieFactory: sessionStoreCookie,
            apiPrefix: API_EDITOR_URL,
            type: 'application/pdf',
        });

        const endpointService = new EndpointService(activeRequester);
        const action = new AjaxAction(endpointService, endpointDefinition);

        return action.invoke(params).then((actionResult) => {
            const reducer = new GetDocumentPdfReducer(this.documentTitle);
            return reducer.reduce(actionResult);
        });
    }
}
