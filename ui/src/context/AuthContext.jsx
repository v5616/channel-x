import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

  // Demo credentials
  const DEMO_USER = {
    email: 'test@gmail.com',
    password: 'test@123',
    name: 'John Smith',
    id: 1,
  }

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('channelx_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simple demo authentication
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const userData = {
        id: DEMO_USER.id,
        name: DEMO_USER.name,
        email: DEMO_USER.email,
      }
      setUser(userData)
      localStorage.setItem('channelx_user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const signup = (name, email, password) => {
    // Simple demo signup
    const userData = {
      id: Date.now(),
      name,
      email,
    }
    setUser(userData)
    localStorage.setItem('channelx_user', JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('channelx_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}