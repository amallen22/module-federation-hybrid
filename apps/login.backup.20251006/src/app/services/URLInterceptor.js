// Interceptor para modificar URLs y solucionar problemas de referrer
export const interceptVisitorURL = () => {
  const originalFetch = window.fetch;
  
  // Función para crear mock response
  const createMockVisitorResponse = () => {
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
    
    // Establecer la cookie
    document.cookie = mockResponse.cookie;
    localStorage.setItem('cv_session_store', mockCookie);
    
    return new Response(JSON.stringify(mockResponse), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
  
  window.fetch = function(url, options = {}) {
    // Si es una petición a visitor, modificar el referrer
    if (url.includes('/visitor')) {
      console.log('🔧 Interceptando petición a visitor:', url);
      
      // Extraer parámetros existentes
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      
      // Cambiar el referrer a uno válido
      params.set('referrer', 'https://local.resumecoach.com/');
      
      // Reconstruir la URL
      urlObj.search = params.toString();
      const newUrl = urlObj.toString();
      
      console.log('🔧 URL modificada:', newUrl);
      
      // Modificar headers para evitar problemas CORS
      const newOptions = {
        ...options,
        headers: {
          ...options.headers,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
      };
      
      // Intentar la petición real, si falla usar mock
      return originalFetch(newUrl, newOptions)
        .catch(error => {
          console.warn('🔧 Error en visitor API, usando mock:', error);
          return createMockVisitorResponse();
        });
    }
    
    return originalFetch(url, options);
  };
  
  console.log('🔧 URL interceptor for visitor API applied');
};

// Función helper para generar visitor ID
function generateVisitorId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Función helper para generar correlation ID
function generateCorrelationId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
