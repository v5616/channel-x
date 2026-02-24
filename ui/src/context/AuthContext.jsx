import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiService from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (has token)
    const token = localStorage.getItem('channelx_token')
    if (token) {
      // Try to get current user from API
      apiService.getCurrentUser()
        .then(userData => {
          setUser(userData)
        })
        .catch(error => {
          console.error('Failed to get current user:', error)
          // Token might be invalid, remove it
          localStorage.removeItem('channelx_token')
          apiService.logout()
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await apiService.login(email, password)
      
      if (response.access_token) {
        // Get user data after successful login
        const userData = await apiService.getCurrentUser()
        setUser(userData)
        return { success: true }
      }
      
      return { success: false, error: 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name, email, password) => {
    try {
      setLoading(true)
      const response = await apiService.signup(name, email, password)
      
      if (response.access_token) {
        // Get user data after successful signup
        const userData = await apiService.getCurrentUser()
        setUser(userData)
        return { success: true }
      }
      
      return { success: false, error: 'Signup failed' }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: error.message || 'Signup failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    apiService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}