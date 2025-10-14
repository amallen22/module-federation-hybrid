import { LogOutOnCodeRangesMiddleware } from '@npm_leadtech/jsr-lib-http';

import { FrontLogService } from '../../services/FrontLogService';
import { Routes } from '../router/Routes';

interface Options {
    logOutOnCodeRanges: { min: number; max: number }[];
    destUrlOnError?: string;
    err?: any;
}

export class OnErrorMiddleware {
    logOutOnCodeRanges;
    destUrlOnError;

    constructor(options: Options) {
        this.logOutOnCodeRanges = options.logOutOnCodeRanges;
        this.destUrlOnError = options.destUrlOnError;
    }

    invoke(options: Options) {
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
