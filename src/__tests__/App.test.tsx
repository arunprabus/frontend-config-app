import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { authService } from '../services/auth.service';

// Mock the auth service
vi.mock('../services/auth.service', () => ({
  authService: {
    getCurrentUser: vi.fn(),
    logout: vi.fn(),
    getAuthHeaders: vi.fn(() => ({ 'Authorization': 'Bearer test-token' }))
  }
}));

// Mock fetch
global.fetch = vi.fn();

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login screen when user is not authenticated', () => {
    // Mock getCurrentUser to return null (not authenticated)
    vi.mocked(authService.getCurrentUser).mockReturnValue(null);
    
    render(<App />);
    
    // Should show login form
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    // Mock getCurrentUser to return null
    vi.mocked(authService.getCurrentUser).mockReturnValue(null);
    
    render(<App />);
    
    // Should show loading initially before auth check completes
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});