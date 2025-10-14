// Logger initialization polyfill to prevent "Logger not initialized" errors
// This ensures the logger is properly set up before any components try to use it

// Mock logger setup if the real one isn't available
if (typeof window !== 'undefined') {
  // Check if logger is already initialized
  if (!window.JL || !window.JL.setOptions) {
    // Initialize a minimal logger
    window.JL = {
      setOptions: () => {},
      createLogger: () => ({
        fatalException: (message, error) => {
          console.error('Fatal Exception:', message, error);
        },
        error: (message, error) => {
          console.error('Error:', message, error);
        },
        warn: (message) => {
          console.warn('Warning:', message);
        },
        info: (message) => {
          console.info('Info:', message);
        },
        debug: (message) => {
          console.debug('Debug:', message);
        }
      })
    };
    
    // Initialize basic logger configuration
    window.JL.setOptions({
      enabled: true,
      level: 'DEBUG',
      userAgentRegex: '.*',
      ipRegex: '.*',
      requestId: 'requestId',
      defaultAjaxUrl: '/jsnlog.logger',
      corsErrorUrl: '/jsnlog.logger'
    });
  }
}

// Export for ES modules
export default window.JL;
