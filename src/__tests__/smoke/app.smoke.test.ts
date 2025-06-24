import { describe, it, expect } from 'vitest';
import { get } from '../../utils/api';

/**
 * Smoke tests verify that the application's critical functionality works
 * These tests require the backend API to be running
 */
describe('Health Dashboard Smoke Tests', () => {
  // Set longer timeout for API calls
  const TEST_TIMEOUT = 10000;

  it('API health endpoint is accessible', async () => {
    const response = await get('/health');
    expect(response.success).toBe(true);
  }, TEST_TIMEOUT);

  it('Authentication endpoints are accessible', async () => {
    // Just check if the endpoints respond (don't need successful auth)
    const response = await fetch(import.meta.env.VITE_API_URL + '/auth/status', {
      method: 'GET'
    });
    
    // Should at least get a response, even if unauthorized
    expect(response.status).toBeDefined();
  }, TEST_TIMEOUT);

  it('Profile endpoints are accessible', async () => {
    // Just check if the endpoints respond (don't need successful auth)
    const response = await fetch(import.meta.env.VITE_API_URL + '/profile', {
      method: 'GET'
    });
    
    // Should at least get a response, even if unauthorized
    expect(response.status).toBeDefined();
  }, TEST_TIMEOUT);
});