// Override para solucionar problemas con la API de visitor
import { API_URL } from '../config/appConfig';

export class VisitorAPIOverride {
  constructor() {
    this.apiUrl = API_URL;
  }

  // Método para hacer la llamada a visitor con el referrer correcto
  async callVisitorAPI(referrer = 'https://local.resumecoach.com/') {
    try {
      // Usar fetch en lugar de XMLHttpRequest para evitar problemas de sincronización
      const response = await fetch(`${this.apiUrl}/visitor?referrer=${encodeURIComponent(referrer)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluir cookies
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Procesar la cookie si viene en la respuesta
      if (data.cookie) {
        // Extraer el valor de la cookie y establecerla
        const cookieValue = data.cookie;
        document.cookie = cookieValue;
        
        // También almacenar en localStorage para compatibilidad
        localStorage.setItem('cv_session_store', cookieValue);
      }

      return data;
    } catch (error) {
      console.error('Error en VisitorAPIOverride, usando mock:', error);
      // En caso de error, usar el mock directamente
      return this.createMockVisitorCookie();
    }
  }

  // Método para crear una cookie mock si la API falla
  createMockVisitorCookie() {
    const mockCookie = {
      cookie: btoa(JSON.stringify({
        country: "es",
        ip: "127.0.0.1",
        name: "",
        language: "en-US",
        visitor: this.generateVisitorId(),
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
        correlation_id: this.generateCorrelationId(),
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
      }))
    };

    // Establecer la cookie
    document.cookie = `cv_session_store=${mockCookie.cookie}; path=/; domain=.localhost`;
    localStorage.setItem('cv_session_store', mockCookie.cookie);

    return mockCookie;
  }

  generateVisitorId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  generateCorrelationId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// Interceptor para XMLHttpRequest que evita los problemas de sincronización
export const patchXMLHttpRequest = () => {
  const originalXMLHttpRequest = window.XMLHttpRequest;
  
  window.XMLHttpRequest = function() {
    const xhr = new originalXMLHttpRequest();
    const originalOpen = xhr.open;
    const originalSend = xhr.send;
    
    let requestUrl = '';
    
    xhr.open = function(method, url, async = true, user, password) {
      requestUrl = url;
      
      // Si es una petición a visitor, modificar la URL para cambiar el referrer
      if (url.includes('/visitor')) {
        console.log('🔧 Interceptando petición a visitor:', url);
        
        // Cambiar el referrer en la URL
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        params.set('referrer', 'https://local.resumecoach.com/');
        urlObj.search = params.toString();
        
        const newUrl = urlObj.toString();
        console.log('🔧 URL modificada de visitor:', newUrl);
        
        // Actualizar la URL de la petición
        url = newUrl;
        requestUrl = newUrl;
        
        // Forzar que sea asíncrona
        if (async === false) {
          console.log('🔧 Forzando petición asíncrona para visitor API');
          async = true;
        }
      }
      
      return originalOpen.call(this, method, url, async, user, password);
    };
    
    xhr.send = function(data) {
      // Si es una petición a visitor, interceptar para manejar errores
      if (requestUrl.includes('/visitor')) {
        // Guardar el handler original
        const originalReadyStateChange = xhr.onreadystatechange;
        
        // Sobrescribir el handler para interceptar errores
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            // Si la petición falló (status de error o CORS)
            if (xhr.status === 0 || xhr.status >= 400) {
              console.warn('🔧 Error en visitor API (XMLHttpRequest), usando mock. Status:', xhr.status);
              
              // Crear respuesta mock
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
              
              // Simular respuesta exitosa
              Object.defineProperty(xhr, 'status', { value: 200, writable: false });
              Object.defineProperty(xhr, 'statusText', { value: 'OK', writable: false });
              Object.defineProperty(xhr, 'responseText', { value: JSON.stringify(mockResponse), writable: false });
              Object.defineProperty(xhr, 'response', { value: JSON.stringify(mockResponse), writable: false });
              
              // Establecer la cookie mock
              document.cookie = mockResponse.cookie;
              localStorage.setItem('cv_session_store', mockCookie);
              
              console.log('🔧 Mock visitor response aplicado:', mockResponse);
            }
          }
          
          // Llamar al handler original si existe
          if (originalReadyStateChange) {
            originalReadyStateChange.call(this);
          }
        };
        
        try {
          return originalSend.call(this, data);
        } catch (error) {
          console.error('Error en XMLHttpRequest para visitor:', error);
          // El error será manejado por el onreadystatechange interceptado
          return;
        }
      }
      
      return originalSend.call(this, data);
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
    
    return xhr;
  };
  
  console.log('🔧 XMLHttpRequest patch applied for visitor API');
};
