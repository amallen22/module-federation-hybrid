import { LogOutOnCodeRangesMiddleware } from '@npm_leadtech/jsr-lib-http';

import { Routes } from '../internals/router/Routes';
import { FrontLogService } from './FrontLogService';

export class OnErrorMiddleware {
    constructor(options) {
        this.logOutOnCodeRanges = options.logOutOnCodeRanges;
        this.destUrlOnError = options.destUrlOnError;
    }

    invoke(options) {
        const middleware = new LogOutOnCodeRangesMiddleware({
            logger: FrontLogService,
            codeRanges: this.logOutOnCodeRanges,
            signOutUrl: this.destUrlOnError || Routes.signout,
        });

        let status;
        try {
            const err = options.err;
            status = err.status || err.response.status || err.response.statusCode;
        } catch (e) {
            status = 499; // Special code to recognize this condition
        }

        const isActualError = middleware._invoke(status);
        if (!isActualError) {
            return;
        }

        if (!(options.err instanceof Error)) {
            options.err = new Error(`Received HTTP ${status}`);
        }

        FrontLogService.logAjaxResponse({
            className: 'OnErrorMiddleware',
            funcName: 'invoke',
            err: options.err,
        });
    }
}
