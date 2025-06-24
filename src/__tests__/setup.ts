import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables
vi.stubGlobal('import.meta', {
  env: {
    VITE_API_URL: 'http://localhost:8080/api',
    VITE_APP_NAME: 'Health Dashboard',
    VITE_APP_ENV: 'test',
    VITE_COGNITO_USER_POOL_ID: 'test-pool-id',
    VITE_COGNITO_CLIENT_ID: 'test-client-id',
    VITE_AWS_REGION: 'ap-south-1',
    VITE_DEBUG_MODE: 'true',
    VITE_LOG_LEVEL: 'debug'
  }
});