// src/utils/api.js
class ApiClient {
  constructor() {
    this.baseURL = 'https://cup-backend-red.vercel.app/api/v4';
    this.token = null;
  }

  // Get token from localStorage
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token') || 
                   localStorage.getItem('authToken') || 
                   sessionStorage.getItem('token');
    }
    return this.token;
  }

  // Set token (call this after login)
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Clear token (call this on logout)
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('token');
  }

  // Make authenticated request
  async request(endpoint, options = {}) {
    const token = this.getToken();
    const url = `${this.baseURL}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 (Unauthorized) - token expired or invalid
      if (response.status === 401) {
        this.clearToken();
        // Show login prompt or redirect
        console.warn('Authentication required or token expired');
        throw new Error('Authentication required. Please log in.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Convenience methods
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create singleton instance
const apiClient = new ApiClient();
export default apiClient;