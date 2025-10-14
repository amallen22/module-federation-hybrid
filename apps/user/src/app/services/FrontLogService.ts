import { getLogger } from '@npm_leadtech/cv-lib-app-jsnlog';

import { Error } from '../models/error';

interface Options {
    className: string;
    funcName: string;
    err: Error;
}

export class FrontLogService {
    static logAjaxResponse(options: Options) {
        const { className, funcName, err } = options;
        try {
            err.stack += JSON.stringify(err.response.req);
        } catch (e) {
            // eslint-disable-next-line no-empty
        }
        getLogger().fatalException(`${className}#${funcName}`, err);
    }
}
