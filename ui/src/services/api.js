// API service for connecting to the backend
const API_BASE_URL = 'http://localhost:8000/api/v1'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem('channelx_token')
  }

  // Helper method to make HTTP requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add authorization header if token exists
    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => '')
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      // Don't log CORB/network errors as they flood the console
      if (!error.message?.includes('Failed to fetch') && !error.message?.includes('NetworkError')) {
        console.error('API request failed:', error.message)
      }
      throw error
    }
  }

  // Authentication methods
  async login(email, password) {
    try {
      const response = await this.request('/auth/login-json', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      
      if (response.access_token) {
        this.token = response.access_token
        localStorage.setItem('channelx_token', this.token)
      }
      
      return response
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  async signup(full_name, email, password) {
    try {
      const response = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ full_name, email, password }),
      })
      
      if (response.access_token) {
        this.token = response.access_token
        localStorage.setItem('channelx_token', this.token)
      }
      
      return response
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    }
  }

  async getCurrentUser() {
    try {
      return await this.request('/auth/me')
    } catch (error) {
      console.error('Get current user failed:', error)
      throw error
    }
  }

  logout() {
    this.token = null
    localStorage.removeItem('channelx_token')
  }

  // Channel methods
  async getChannels(filters = {}) {
    try {
      const queryParams = new URLSearchParams()
      
      if (filters.niche) queryParams.append('niche', filters.niche)
      if (filters.min_price) queryParams.append('min_price', filters.min_price)
      if (filters.max_price) queryParams.append('max_price', filters.max_price)
      if (filters.monetized !== undefined) queryParams.append('monetized', filters.monetized)
      if (filters.skip) queryParams.append('skip', filters.skip)
      if (filters.limit) queryParams.append('limit', filters.limit)

      const endpoint = `/channels/${queryParams.toString() ? '?' + queryParams.toString() : ''}`
      return await this.request(endpoint)
    } catch (error) {
      console.error('Get channels failed:', error)
      throw error
    }
  }

  async getChannel(channelId) {
    try {
      return await this.request(`/channels/${channelId}`)
    } catch (error) {
      console.error('Get channel failed:', error)
      throw error
    }
  }

  async createChannel(channelData) {
    try {
      return await this.request('/channels/', {
        method: 'POST',
        body: JSON.stringify(channelData),
      })
    } catch (error) {
      console.error('Create channel failed:', error)
      throw error
    }
  }

  async getUserListings() {
    try {
      return await this.request('/channels/user/listings')
    } catch (error) {
      console.error('Get user listings failed:', error)
      throw error
    }
  }

  // User methods
  async getUserProfile() {
    try {
      return await this.request('/users/profile')
    } catch (error) {
      console.error('Get user profile failed:', error)
      throw error
    }
  }

  async getUserStats() {
    try {
      return await this.request('/users/stats')
    } catch (error) {
      console.error('Get user stats failed:', error)
      throw error
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch('http://localhost:8000/health')
      return await response.json()
    } catch (error) {
      console.error('Health check failed:', error)
      throw error
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService

// Export individual methods for convenience
export const {
  login,
  signup,
  getCurrentUser,
  logout,
  getChannels,
  getChannel,
  createChannel,
  getUserListings,
  getUserProfile,
  getUserStats,
  healthCheck,
} = apiService