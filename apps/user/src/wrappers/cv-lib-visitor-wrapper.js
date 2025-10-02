// Wrapper para cv-lib-visitor que soluciona problemas en desarrollo local
// Este wrapper proporciona versiones mock de las clases principales

export class HandleVisitorUseCase {
    constructor(queryStringService, cookieGenerator, cookieStorage) {
        this.queryStringService = queryStringService;
        this.cookieGenerator = cookieGenerator;
        this.cookieStorage = cookieStorage;
    }

    invoke() {
        // En desarrollo local, simplemente resolver la promesa sin hacer nada
        // console.log('HandleVisitorUseCase.invoke() - Mock implementation for local development');
        return Promise.resolve();
    }

    getCookieLanguage() {
        const cookieValue = this.cookieStorage.getCookie('cv_session_store');
        try {
            return JSON.parse(cookieValue).language;
        } catch (e) {
            return 'en';
        }
    }

    getAccountLanguage() {
        const accountLanguageMeta = document.querySelector("meta[name='accountLanguage']");
        if (accountLanguageMeta) {
            return accountLanguageMeta.getAttribute('content');
        }
        return null;
    }
}

export class CookieGeneratorHandler {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    customAction(queryStringObject) {
        // En desarrollo local, devolver una cookie mock
        console.log('CookieGeneratorHandler.customAction() - Mock implementation for local development');
        const mockCookie = JSON.stringify({
            language: 'en',
            access: false,
            visitor: 'mock_visitor_' + Date.now(),
            userid: null
        });
        return Promise.resolve(mockCookie);
    }
}

export class FieldsConfig {
    static fields = [
        'utm_source',
        'utm_medium', 
        'utm_campaign',
        'utm_content',
        'utm_term'
    ];
}

// Export default para compatibilidad
export default {
    HandleVisitorUseCase,
    CookieGeneratorHandler,
    FieldsConfig
};