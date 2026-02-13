// Configuración centralizada de variables de entorno
export const config = {
    // API Backend
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',

    // WebSocket
    WS_URL: process.env.REACT_APP_WS_URL || 'ws://localhost:8080',

    // Modo de desarrollo
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
};

export default config;
