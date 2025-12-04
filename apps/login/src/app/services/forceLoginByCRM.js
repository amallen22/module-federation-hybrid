import { APP_CONFIG } from '../config/appConfig';

function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, domain) {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    document.cookie =
        name + '=' + value +
        ';path=/' +
        ';expires=' + date.toGMTString() +
        ';domain=' + domain +
        ';SameSite=Lax';
}

const { domain } = APP_CONFIG;

/**
 * This method is only executed from cv-dev-cookie-thief chrome extension
 * Which is present at the CRM
 * Its a sends token that pre-fill the cookie with an access token
 */
export function forceLoginByCRM(token, email) {
    let CvSessionBase64 = getCookie('cv_session_store');
    const session_store = JSON.parse(atob(CvSessionBase64));
    session_store.access = token;
    session_store.user = email;
    CvSessionBase64 = btoa(JSON.stringify(session_store));

    setCookie('cv_session_store', CvSessionBase64, domain);

    window.location.href = '/user/';
}
