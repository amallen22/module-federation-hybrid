'use strict';
var SESSION_COOKIE_NAME = "cv_session_store";

var SessionStoreCookie = function (storageManager, domain){
    var values = {};
    var cookieDomain = domain;

    if (!cookieDomain && window) {
        let hostname = window.location.hostname;
        let hostnameArray = hostname.split(".");
        if (hostnameArray.length > 1) {
            cookieDomain = "." + hostnameArray.slice(1).join(".")
        } else {
            cookieDomain =  hostname;
        }
    }

    return {
        name: SESSION_COOKIE_NAME,
        value: values,
        domain: (typeof cookieDomain !== "undefined")? cookieDomain : null,
        path: (typeof cookiePath !== "undefined")? cookiePath : "/",
        life: null,

        read: function () {},

        isInitiated: function() {
            return typeof this.value.visitor === 'string' && this.value.visitor;
        },

        getLanguage: () => 'en',

        get: function(param){
            return (typeof param !== 'undefined')
                ? (typeof this.value[param] !== 'undefined')
                    ? this.value[param]
                    : null
                : this.value;
        },

        put: function(param, newValue){
            var oldValue = this.value[param];
            this.value[param] = newValue;
            this.persist();
            return oldValue;
        },

        putRaw: function(value) {
            this.value = value;
        },

        persist: function(life) {
            var currentLife = (typeof life !== 'undefined')? life : this.life;
            this.life = currentLife;
            storage.setCookie(
                this.name,
                JSON.stringify(this.get()),
                currentLife,
                this.domain,
                this.path
            );
        }
    };
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SessionStoreCookie;
}
