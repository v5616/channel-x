import { useState, useEffect } from 'react'
import apiService from '../services/api'

const ApiTestPage = () => {
  const [apiStatus, setApiStatus] = useState('Testing...')
  const [channels, setChannels] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    testApiConnection()
  }, [])

  const testApiConnection = async () => {
    try {
      // Test health check
      const health = await apiService.healthCheck()
      setApiStatus(`✅ API Connected - ${health.status} - ${health.channels} channels`)
      
      // Test channels endpoint
      const channelsData = await apiService.getChannels()
      setChannels(channelsData)
      
    } catch (err) {
      setError(err.message)
      setApiStatus('❌ API Connection Failed')
    }
  }

  const testLogin = async () => {
    try {
      const result = await apiService.login('test@gmail.com', 'test@123')
      console.log('Login result:', result)
      alert('Login successful! Check console for details.')
    } catch (err) {
      alert('Login failed: ' + err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Status</h2>
          <p className="text-lg mb-4">{apiStatus}</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}
          
          <button 
            onClick={testApiConnection}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
          >
            Test API Connection
          </button>
          
          <button 
            onClick={testLogin}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test Login
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Channels from API</h2>
          {channels.length > 0 ? (
            <div className="space-y-4">
              {channels.map(channel => (
                <div key={channel.id} className="border rounded p-4">
                  <h3 className="font-semibold">{channel.channel_name}</h3>
                  <p className="text-gray-600">{channel.niche} - {channel.subscribers} subscribers</p>
                  <p className="text-green-600 font-semibold">${channel.asking_price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No channels loaded yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApiTestPage