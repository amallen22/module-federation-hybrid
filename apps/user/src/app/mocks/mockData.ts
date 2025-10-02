/**
 * Mock Data for Local Development
 * 
 * Este archivo contiene datos simulados para permitir el desarrollo
 * local sin dependencia de APIs externas o servicios backend.
 * 
 * IMPORTANTE: Estos datos son solo para desarrollo local.
 * En producción, los datos reales vendrán de las APIs correspondientes.
 */

import { Language } from '../models/language';

/**
 * Mock de datos de perfil de usuario
 */
export const mockProfileData = {
    groupPermission: 'premium', // Valores posibles: 'free', 'premium', 'enterprise'
    email: 'dev.user@example.com',
    userLanguage: 'en',
    createdAt: '2024-01-15T10:30:00Z',
    pricingModel: 'monthly',
    firstName: 'John',
    lastName: 'Developer',
    photo: 'https://i.pravatar.cc/150?img=33' // Avatar placeholder
};

/**
 * Mock de idiomas disponibles
 */
export const mockLanguages: Language[] = [
    {
        code: 'en',
        description: 'English',
        isProfileLanguage: true,
        flagIcon: '🇺🇸'
    },
    {
        code: 'es',
        description: 'Español',
        isProfileLanguage: false,
        flagIcon: '🇪🇸'
    },
    {
        code: 'fr',
        description: 'Français',
        isProfileLanguage: false,
        flagIcon: '🇫🇷'
    },
    {
        code: 'de',
        description: 'Deutsch',
        isProfileLanguage: false,
        flagIcon: '🇩🇪'
    },
    {
        code: 'pt',
        description: 'Português',
        isProfileLanguage: false,
        flagIcon: '🇵🇹'
    }
];

/**
 * Configuración de entorno
 * En Vite usamos import.meta.env en lugar de process.env
 */
export const isDevelopment = 
    (typeof import.meta !== 'undefined' && import.meta.env && 
     (import.meta.env.MODE === 'local' || import.meta.env.MODE === 'development' || !import.meta.env.PROD)) ||
    (typeof process !== 'undefined' && process.env && 
     (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'));

// Debug: Log del estado de desarrollo
if (typeof console !== 'undefined') {
    console.log('🔍 [mockData] isDevelopment:', isDevelopment);
    console.log('🔍 [mockData] import.meta.env:', typeof import.meta !== 'undefined' ? import.meta.env : 'undefined');
    console.log('🔍 [mockData] process.env.NODE_ENV:', typeof process !== 'undefined' && process.env ? process.env.NODE_ENV : 'undefined');
}

/**
 * Helper para simular delay de red en desarrollo
 */
export const mockDelay = (ms: number = 500): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
