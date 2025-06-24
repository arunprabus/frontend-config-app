import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../services/auth.service';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('returns null when no user is authenticated', () => {
    expect(authService.getCurrentUser()).toBeNull();
  });

  it('stores user in localStorage on login', () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      username: 'testuser',
      accessToken: 'test-token'
    };
    
    // Simulate login by setting user in localStorage
    authService['currentUser'] = mockUser;
    authService['logout'] = vi.fn();
    
    // Check if localStorage was called
    expect(localStorageMock.setItem).toHaveBeenCalledWith('authUser', JSON.stringify(mockUser));
  });

  it('clears localStorage on logout', () => {
    authService.logout();
    
    // Check if localStorage was cleared
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('authUser');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('accessToken');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('refreshToken');
  });

  it('returns auth headers with token when user is authenticated', () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      username: 'testuser',
      accessToken: 'test-token'
    };
    
    // Set mock user
    authService['currentUser'] = mockUser;
    
    // Check auth headers
    const headers = authService.getAuthHeaders();
    expect(headers).toEqual({
      'Authorization': 'Bearer test-token',
      'Content-Type': 'application/json'
    });
  });
});