'use strict';

var StorageManager = function () {

    return {
        set: function (cookieName, cookieValue, lifeHours, domain, path, isBase64) {
            var expires;
            var value = isBase64?cookieValue:btoa(cookieValue);

            if (domain && domain.length) {
                domain = ';domain=' + domain;
            } else {
                domain = '';
            }
            if (path && path.length) {
                path = ';path=' + path;
            } else {
                path = ';path=/';
            }
            if (!isNaN(parseInt(lifeHours))) {
                var expiryDate = new Date();
                var lifeSeconds = lifeHours * 60 * 60;
                expiryDate.setTime(
                    expiryDate.getTime() + (lifeSeconds * 1000)
                );
                expires = ';expires=' + expiryDate.toUTCString()
                    + ';max-age=' + lifeSeconds;
            } else {
                expires = '';
            }

            document.cookie = cookieName + '=' + value
                + expires
                + domain
                + path;
        },
        setRawCookie: function (cookieName, cookieValue, lifeHours, domain, path) {
            this.set(cookieName, cookieValue, lifeHours, domain, path, true);
        },

        setCookie: function (cookieName, cookieValue, lifeHours, domain, path) {
            this.set(cookieName, cookieValue, lifeHours, domain, path, false);
        },

        getCookie: function (cookieName) {
            var name = cookieName + '=';
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var chars = ca[i];
                while (chars.charAt(0) === ' ') {
                    chars = chars.substring(1);
                }
                if (chars.indexOf(name) === 0) {
                    try{
                        return atob(chars.substring(name.length, chars.length));
                    }catch (err){
                        console.error('Cookie not on Base64');
                        return '';
                    }
                }
            }
            return '';
        },
        deleteOtherCookies: function (cookieName) {
            var name;
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                name = ca[i].split('=')[0].trim();
                if (name !== cookieName) {
                    this.deleteCookie(name);
                }
            }
        },
        deleteCookie: function (cookieName) {
            this.setCookie(cookieName, '', -24);
        }
    };
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}
