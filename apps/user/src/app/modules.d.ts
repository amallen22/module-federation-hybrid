// modules.d.ts
declare module 'classnames';
declare module 'sanitize-html';
declare module 'react-google-tag-manager';
declare module 'react-script-tag';
declare module '@npm_leadtech/cv-lib-app-analytics';
declare module '@npm_leadtech/cv-lib-app-jsnlog';
declare module '@npm_leadtech/cv-lib-app-components';
declare module '@npm_leadtech/cv-lib-app-config';
declare module '@npm_leadtech/cv-storage-js';
declare module '@npm_leadtech/cv-lib-visitor';
declare module '@npm_leadtech/jsr-lib-http';
declare module '@npm_leadtech/cv-lib-app-abtesting';

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.png';
