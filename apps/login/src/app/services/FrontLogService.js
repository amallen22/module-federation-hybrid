import { getLogger } from '@npm_leadtech/cv-lib-app-jsnlog';

export class FrontLogService {
    static logAjaxResponse (options) {
        const { className, funcName, err } = options;
        try {
            err.stack += JSON.stringify(err.response.req);
        }
        // eslint-disable-next-line
        catch(e) {}
        getLogger().fatalException(`${className}#${funcName}`, err);
    }
}
