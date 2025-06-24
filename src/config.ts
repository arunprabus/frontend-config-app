export type AppConfig = {
  apiUrl: string;
  appName: string;
  environment: string;
  features: {
    authentication: boolean;
    fileUpload: boolean;
    notifications: boolean;
    debugMode?: boolean;
    dynamodb?: boolean;
  };
  version: string;
  buildTime: string;
  apiTimeout?: number;
  logLevel?: string;
  cognito?: {
    userPoolId: string;
    clientId: string;
    region: string;
  };
};

let config: AppConfig | null = null;

const defaultConfig: AppConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  appName: import.meta.env.VITE_APP_NAME || 'Health Dashboard',
  environment: import.meta.env.VITE_APP_ENV || 'development',
  features: {
    authentication: true,
    fileUpload: true,
    notifications: true,
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    dynamodb: true,
  },
  version: '1.0.0',
  buildTime: new Date().toISOString(),
  apiTimeout: 10000,
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'debug',
  cognito: {
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || 'your_user_pool_id',
    clientId: import.meta.env.VITE_COGNITO_CLIENT_ID || 'your_client_id',
    region: import.meta.env.VITE_AWS_REGION || 'ap-south-1',
  },
};

export async function loadConfig(): Promise<AppConfig> {
  if (config) {
    return config;
  }

  try {
    const response = await fetch('/assets/runtime-config.json', {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load config: ${response.status}`);
    }

    const runtimeConfig = await response.json();
    config = { ...defaultConfig, ...runtimeConfig };
    console.log('✅ Runtime configuration loaded successfully:', config);
    return config;
  } catch (error) {
    console.warn('⚠️ Failed to load runtime config, using defaults:', error);
    config = defaultConfig;
    return config;
  }
}

export function getConfig(): AppConfig | null {
  return config;
}