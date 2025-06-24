import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchApi, get, post, put, del, uploadFile } from '../utils/api';
import { authService } from '../services/auth.service';

// Mock authService
vi.mock('../services/auth.service', () => ({
  authService: {
    getAuthHeaders: vi.fn(() => ({ 'Authorization': 'Bearer test-token' }))
  }
}));

// Mock fetch
global.fetch = vi.fn();

describe('API Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchApi', () => {
    it('adds auth headers to requests', async () => {
      // Mock successful response
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => 'application/json'
        },
        json: async () => ({ success: true, data: { test: 'data' } })
      } as any);

      await fetchApi('/test');
      
      // Check if fetch was called with auth headers
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-token'
        })
      }));
    });

    it('handles JSON response correctly', async () => {
      // Mock successful response
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => 'application/json'
        },
        json: async () => ({ success: true, data: { test: 'data' } })
      } as any);

      const result = await fetchApi('/test');
      
      expect(result).toEqual({
        success: true,
        data: { test: 'data' }
      });
    });

    it('handles error responses correctly', async () => {
      // Mock error response
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        headers: {
          get: () => 'application/json'
        },
        json: async () => ({ success: false, error: 'Not found' })
      } as any);

      const result = await fetchApi('/test');
      
      expect(result).toEqual({
        success: false,
        error: 'Not found'
      });
    });
  });

  describe('HTTP method helpers', () => {
    it('get() makes GET request', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => 'application/json'
        },
        json: async () => ({ success: true })
      } as any);

      await get('/test');
      
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'GET'
      }));
    });

    it('post() makes POST request with JSON body', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => 'application/json'
        },
        json: async () => ({ success: true })
      } as any);

      const data = { name: 'Test' };
      await post('/test', data);
      
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      }));
    });
  });

  describe('uploadFile', () => {
    it('creates FormData with file', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => 'application/json'
        },
        json: async () => ({ success: true })
      } as any);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      await uploadFile('/upload', file);
      
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData)
      }));
    });
  });
});