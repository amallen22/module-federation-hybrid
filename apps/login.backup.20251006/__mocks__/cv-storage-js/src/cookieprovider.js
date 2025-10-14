'use strict';
const COOKIE = require('../cookie.json');


var CookieProvider = function (httpClient, sessionStore){
    var sessionStoreCookie = sessionStore;

    return {
        build: function(url, timeOut, callback){
            sessionStoreCookie.read();
            if (!sessionStoreCookie.isInitiated()) {
                sessionStoreCookie.putRaw(COOKIE);
                sessionStoreCookie.read();
            }
            callback(sessionStoreCookie);
        }
    };
};

module.exports = CookieProvider;
