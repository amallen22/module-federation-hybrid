import { StorageManager } from '@npm_leadtech/cv-storage-js';

export const getCookie = () => {
    const cookiesStorage = StorageManager();
    const cookieValue = cookiesStorage.getCookie('cv_session_store');

    return JSON.parse(cookieValue);
};
