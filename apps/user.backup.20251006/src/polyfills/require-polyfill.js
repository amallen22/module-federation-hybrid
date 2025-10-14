// Polyfill para require en el contexto del browser
// Este polyfill maneja casos básicos donde el código legacy usa require()

const requirePolyfill = (function() {
  // Cache para módulos ya cargados
  const moduleCache = {};
  
  return function require(moduleId) {
    // Si ya está en caché, devolverlo
    if (moduleCache[moduleId]) {
      return moduleCache[moduleId];
    }
    
    // Mapeo de módulos específicos que sabemos que existen
    const moduleMap = {
      '../../lib/decoder/HexDecoder': { 
        HexDecoder: class HexDecoder {
          decode(data) {
            // Implementación básica de decodificador hex
            return data; // placeholder
          }
        }
      },
      './DecodeBuildConfig': {
        DecodeBuildConfig: class DecodeBuildConfig {
          constructor(options) {
            this.encodedData = options.encodedData;
            this.decoderService = options.decoderService;
          }
          
          decode() {
            // Implementación básica
            return this.encodedData;
          }
        }
      }
    };
    
    // Si el módulo está en nuestro mapa, devolverlo
    if (moduleMap[moduleId]) {
      moduleCache[moduleId] = moduleMap[moduleId];
      return moduleMap[moduleId];
    }
    
    // Si no se encuentra el módulo, lanzar error más descriptivo
    console.warn(`Module ${moduleId} not found, returning empty object`);
    const emptyModule = {};
    moduleCache[moduleId] = emptyModule;
    return emptyModule;
  };
})();

export default requirePolyfill;