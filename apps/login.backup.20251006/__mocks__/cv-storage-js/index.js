'use strict';

var StorageManager = require('./src/storagemanager');
var SessionStoreCookie = require('./src/sessionstorecookie');
var HttpClient = require('./src/httpclient.js');
var Request = require('./src/request');
var CookieProvider = require('./src/cookieprovider.js');

var buildCookie = function (config, domain) {
    var timeoutConfig;

    if (typeof(config["apiTimeout"]) != "undefined"){
        timeoutConfig = config["apiTimeout"];
    } else {
        timeoutConfig = 20;
    }

    if (typeof(config["apiEndpoint"]) == "undefined"){
        throw "Required apiEndpoint";
    }

    var apiEndpoint = config["apiEndpoint"];
    var storageMgr = StorageManager();
    var sessionStoreCookie = SessionStoreCookie(storageMgr, domain);
    var httpClient = HttpClient();
    var provider = CookieProvider(httpClient, sessionStoreCookie);

    provider.build(apiEndpoint, timeoutConfig, function (result) {
        sessionStoreCookie = result;
    });

    return sessionStoreCookie;
};


module.exports = {
    StorageManager: StorageManager,
    Request: Request,
    sessionStoreCookie: buildCookie
};
