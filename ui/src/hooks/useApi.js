import { useState, useEffect } from 'react'
import apiService from '../services/api'

// Custom hook for API calls with loading and error states
export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiCall()
        
        if (isMounted) {
          setData(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'An error occurred')
          console.error('API call failed:', err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err.message || 'An error occurred')
      console.error('API refetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Hook for channels
export function useChannels(filters = {}) {
  return useApi(() => apiService.getChannels(filters), [JSON.stringify(filters)])
}

// Hook for single channel
export function useChannel(channelId) {
  return useApi(() => apiService.getChannel(channelId), [channelId])
}

// Hook for user listings
export function useUserListings() {
  return useApi(() => apiService.getUserListings(), [])
}

// Hook for user stats
export function useUserStats() {
  return useApi(() => apiService.getUserStats(), [])
}

// Hook for health check
export function useHealthCheck() {
  return useApi(() => apiService.healthCheck(), [])
}