"use strict";

var Request = function (parsedUrl, data, cvStorage) {
    return {
        getParams: jest.fn()
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Request;
}
