/**
 * API utility functions for making HTTP requests
 */
import { authService } from '../services/auth.service';

/**
 * Base API URL from environment variables
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * Interface for API response
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Generic fetch function with authentication and error handling
 * @param endpoint API endpoint path
 * @param options Fetch options
 * @returns Promise with API response
 */
export const fetchApi = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
    
    // Add authentication headers if available
    const headers = {
      ...options.headers,
      ...authService.getAuthHeaders()
    };
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: result.error || `HTTP error ${response.status}`
        };
      }
      
      return result;
    } else {
      // Handle non-JSON response
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP error ${response.status}`
        };
      }
      
      const text = await response.text();
      return {
        success: true,
        data: text as unknown as T
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Network error'
    };
  }
};

/**
 * GET request helper
 * @param endpoint API endpoint path
 * @returns Promise with API response
 */
export const get = <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
  return fetchApi<T>(endpoint, { method: 'GET' });
};

/**
 * POST request helper
 * @param endpoint API endpoint path
 * @param data Request body data
 * @returns Promise with API response
 */
export const post = <T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
  return fetchApi<T>(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

/**
 * PUT request helper
 * @param endpoint API endpoint path
 * @param data Request body data
 * @returns Promise with API response
 */
export const put = <T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
  return fetchApi<T>(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

/**
 * DELETE request helper
 * @param endpoint API endpoint path
 * @returns Promise with API response
 */
export const del = <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
  return fetchApi<T>(endpoint, { method: 'DELETE' });
};

/**
 * Upload file helper
 * @param endpoint API endpoint path
 * @param file File to upload
 * @param fieldName Form field name
 * @returns Promise with API response
 */
export const uploadFile = <T = any>(
  endpoint: string,
  file: File,
  fieldName: string = 'document'
): Promise<ApiResponse<T>> => {
  const formData = new FormData();
  formData.append(fieldName, file);
  
  return fetchApi<T>(endpoint, {
    method: 'POST',
    body: formData
    // Don't set Content-Type header, browser will set it with boundary
  });
};