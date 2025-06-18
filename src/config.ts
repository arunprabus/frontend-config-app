export type AppConfig = {
  apiUrl: string;
  appName: string;
  environment: string;
  features: {
    authentication: boolean;
    fileUpload: boolean;
    notifications: boolean;
  };
  version: string;
  buildTime: string;
};

let config: AppConfig | null = null;

const defaultConfig: AppConfig = {
  apiUrl: 'http://localhost:3000/api',
  appName: 'React Runtime Config App',
  environment: 'development',
  features: {
    authentication: true,
    fileUpload: true,
    notifications: true,
  },
  version: '1.0.0',
  buildTime: new Date().toISOString(),
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