// Environment configuration
export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  
  // Application Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Credito Insight Dashboard',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  
  // Feature Flags
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
};

// Validate required environment variables
export const validateEnv = () => {
  const required = ['VITE_API_BASE_URL'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    console.warn('Please create a .env file with the required variables');
  }
};

// Development helpers
export const isDevelopment = config.APP_ENV === 'development';
export const isProduction = config.APP_ENV === 'production';

export default config;
