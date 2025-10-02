import { getLogger } from '@npm_leadtech/cv-lib-app-jsnlog';

import { ApiError } from '../models/error';

interface Options {
    className: string;
    funcName: string;
    err: ApiError;
}

export class FrontLogService {
    static logAjaxResponse(options: Options) {
        // Deshabilitado en local para evitar CORS y ruido
        // No hacer nada
        return;
    }
}
