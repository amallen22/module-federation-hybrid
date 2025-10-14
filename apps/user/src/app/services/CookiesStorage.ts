import StorePackage from '@npm_leadtech/cv-storage-js';

const CookiesStorage = (() => {
    return {
        setCookiesPreview: function (cookieName: string, cookieVal: string) {
            const cookiesStore = StorePackage.StorageManager();
            cookiesStore.setCookie(cookieName, cookieVal);
            return true;
        },
    };
})();

export default CookiesStorage;
