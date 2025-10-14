// Interceptor agresivo para evitar completamente las llamadas a visitor API
// Este interceptor previene que las llamadas lleguen al servidor

// Función para generar visitor ID
function generateVisitorId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Función para generar correlation ID
function generateCorrelationId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Función para crear respuesta mock
function createMockVisitorResponse() {
  const mockCookie = btoa(JSON.stringify({
    country: "es",
    ip: "127.0.0.1",
    name: "",
    language: "en-US",
    visitor: generateVisitorId(),
    user: "",
    userid: "",
    access: "",
    referrer: "",
    page_size: "letter",
    "provider-name": "",
    formId: "",
    provider: "",
    "payment-product": "",
    viewerDesktop: "true",
    viewerMobile: "false",
    viewerSmartTv: "",
    viewerTablet: "false",
    gclid: "",
    msclkid: "",
    correlation_id: generateCorrelationId(),
    utm_source: "",
    utm_origin: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_document: "",
    utm_aid: "",
    utm_campaigntype: "",
    utm_term: "",
    utm_adgroup: "",
    utm_network: "",
    utm_device: "",
    utm_devicemodel: "",
    utm_matchtype: "",
    utm_loc_physical_ms: ""
  }));
  
  const mockResponse = {
    cookie: `cv_session_store=${mockCookie}; path=/; domain=.localhost`
  };
  
  // Establecer la cookie inmediatamente
  document.cookie = mockResponse.cookie;
  localStorage.setItem('cv_session_store', mockCookie);
  
  console.log('🔧 Mock visitor response creado:', mockResponse);
  
  return mockResponse;
}

// Interceptor para fetch
export const interceptVisitorFetch = () => {
  const originalFetch = window.fetch;
  
  window.fetch = function(url, options = {}) {
    // Si es una petición a visitor, devolver mock inmediatamente
    if (url.includes('/visitor')) {
      console.log('🔧 Interceptando fetch a visitor (evitando llamada real):', url);
      
      const mockResponse = createMockVisitorResponse();
      
      return Promise.resolve(new Response(JSON.stringify(mockResponse), {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json'
        }
      }));
    }
    
    return originalFetch(url, options);
  };
  
  console.log('🔧 Visitor fetch interceptor aplicado');
};

// Interceptor para XMLHttpRequest
export const interceptVisitorXHR = () => {
  const originalXMLHttpRequest = window.XMLHttpRequest;
  
  window.XMLHttpRequest = function() {
    const xhr = new originalXMLHttpRequest();
    const originalOpen = xhr.open;
    const originalSend = xhr.send;
    const originalSetRequestHeader = xhr.setRequestHeader;
    
    let requestUrl = '';
    let isVisitorRequest = false;
    let mockMode = false;
    
    xhr.open = function(method, url, async = true, user, password) {
      requestUrl = url;
      isVisitorRequest = url.includes('/visitor');
      
      if (isVisitorRequest) {
        console.log('🔧 Interceptando XHR a visitor (evitando llamada real):', url);
        mockMode = true;
        
        // Simular que se abrió correctamente
        Object.defineProperty(xhr, 'readyState', { value: 1, writable: true });
        return;
      }
      
      return originalOpen.call(this, method, url, async, user, password);
    };
    
    xhr.setRequestHeader = function(header, value) {
      if (mockMode) {
        // En modo mock, simplemente ignorar los headers
        return;
      }
      
      return originalSetRequestHeader.call(this, header, value);
    };
    
    xhr.send = function(data) {
      if (isVisitorRequest && mockMode) {
        console.log('🔧 Enviando respuesta mock para visitor XHR');
        
        const mockResponse = createMockVisitorResponse();
        
        // Simular respuesta inmediata
        setTimeout(() => {
          // Configurar propiedades de respuesta
          Object.defineProperty(xhr, 'status', { value: 200, writable: false });
          Object.defineProperty(xhr, 'statusText', { value: 'OK', writable: false });
          Object.defineProperty(xhr, 'responseText', { value: JSON.stringify(mockResponse), writable: false });
          Object.defineProperty(xhr, 'response', { value: JSON.stringify(mockResponse), writable: false });
          Object.defineProperty(xhr, 'readyState', { value: 4, writable: false });
          
          // Disparar el evento de cambio de estado
          if (xhr.onreadystatechange) {
            xhr.onreadystatechange();
          }
        }, 1);
        
        return;
      }
      
      return originalSend.call(this, data);
    };
    
    return xhr;
  };
  
  console.log('🔧 Visitor XHR interceptor aplicado');
};

// Aplicar todos los interceptores
export const applyVisitorMockInterceptors = () => {
  interceptVisitorFetch();
  interceptVisitorXHR();
  console.log('🔧 Todos los interceptores de visitor mock aplicados');
};
