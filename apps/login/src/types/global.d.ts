import { getLogger } from '@npm_leadtech/cv-lib-app-jsnlog';

declare global {
    interface Window {
        CV?: {
            Log?: ReturnType<typeof getLogger>;
        };
    }
}

export {};

