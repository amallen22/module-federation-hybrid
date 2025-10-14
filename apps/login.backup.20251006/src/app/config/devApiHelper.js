// Helper para manejar conexiones de API en desarrollo
export const createDevApiConfig = (originalConfig) => {
  const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
  
  if (!isDevelopment) {
    return originalConfig;
  }
  
  // Configuración para desarrollo local
  const devConfig = {
    ...originalConfig,
    // Verificar si la API local está disponible
    apiSubdomain: 'stage',
    apiVersion: 'api-public-v15',
    domain: 'resumecoach.com',  // Usar el dominio correcto para la API
    // Fallback URLs en caso de que la API local no esté disponible
    fallbackApiUrl: 'http://localhost:8080', // Puerto común para APIs locales
    useLocalApi: true
  };
  
  console.log('Development API config:', devConfig);
  return devConfig;
};

// Helper para verificar si la API está disponible
export const checkApiAvailability = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl + '/health', {
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch (error) {
    console.warn('API not available:', error.message);
    return false;
  }
};

// Mock para visitor API cuando no está disponible
export const mockVisitorResponse = {
  success: true,
  data: {
    visitor: {
      id: 'mock-visitor-id',
      session: 'mock-session-id',
      timestamp: new Date().toISOString()
    }
  }
};

// Mock para error handlers
export const createMockErrorHandler = () => ({
  fatalException: (message, error) => {
    console.error('Mock Fatal Exception:', message, error);
  },
  logAjaxResponse: (options) => {
    console.warn('Mock Ajax Response Log:', options);
  }
});
