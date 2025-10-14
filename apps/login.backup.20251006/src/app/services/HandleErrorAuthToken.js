export default class HandleErrorAuthToken {

    constructor () {

        this.defaultErrorMessage = 'An error has occurred. Please introduce a valid email address and password to continue.';

    }

    extractErrorMessage (res) {

        if ((((res.body || {}).resultContext || {}).errorCode || '').charAt(0) === '5') {
            return 'There is an error in the information. Please review and try again.';
        }

        if (!!((res.response || {}).body || {}).errorMessage) {
            return res.response.body.errorMessage;
        }

        if (!!((res.body || {}).resultContext || {}).errorMessage) {
            return res.body.resultContext.errorMessage;
        }

        if (!!(res.body || {}).errorMessage) {
            return res.body.errorMessage;
        }

        if (!!res.message) {
            return res.message;
        }

        return this.defaultErrorMessage;

    }

}
