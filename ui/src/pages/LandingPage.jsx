import { Link } from 'react-router-dom'
import { Shield, CheckCircle, DollarSign, Lock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import ChannelCard from '../components/ChannelCard'
import { useState, useEffect } from 'react'
import apiService from '../services/api'
import useScrollAnimation from '../hooks/useScrollAnimation'

const LandingPage = () => {
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Scroll animation refs
  const [featuresRef, featuresVisible] = useScrollAnimation({ threshold: 0.1, once: true })
  const [channelsRef, channelsVisible] = useScrollAnimation({ threshold: 0.1, once: true })
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.1, once: true })

  // Fallback channels if API fails
  const fallbackChannels = [
    {
      id: "1",
      channel_name: "Tech Reviews Pro",
      niche: "Technology",
      subscribers: "250K",
      monthly_revenue: "$8,500",
      asking_price: 125000,
      banner_image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
      is_verified: true,
      is_monetized: true,
      seller: { name: "John Smith", rating: 4.8, sales: 12 }
    },
    {
      id: "2",
      channel_name: "Cooking Masters",
      niche: "Food & Cooking",
      subscribers: "180K",
      monthly_revenue: "$6,200",
      asking_price: 95000,
      banner_image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      is_verified: true,
      is_monetized: true,
      seller: { name: "John Smith", rating: 4.8, sales: 12 }
    },
    {
      id: "3",
      channel_name: "Fitness Journey",
      niche: "Health & Fitness",
      subscribers: "320K",
      monthly_revenue: "$12,800",
      asking_price: 185000,
      banner_image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      is_verified: true,
      is_monetized: true,
      seller: { name: "John Smith", rating: 4.8, sales: 12 }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get channels from API
        const channelsData = await apiService.getChannels({ limit: 3 })
        setChannels(channelsData)
      } catch (err) {
        console.error('API Error:', err)
        // Fall back to sample data if API fails
        setChannels(fallbackChannels)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading channels...</p>
          </div>
        </div>
      </div>
    )
  }

  // Use API data or fallback
  const displayChannels = channels.length > 0 ? channels : fallbackChannels

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-primary-600 to-purple-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Buy & Sell YouTube Channels
              <span className="block text-yellow-300 mt-2 animate-fade-in stagger-1">Securely</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in stagger-2">
              The trusted marketplace for verified YouTube channels. Safe transactions with escrow protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-3">
              <Link to="/marketplace">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">Browse Channels</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10">Get Started</Button>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-blue-100 animate-fade-in stagger-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Verified Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-300" />
                <span>Escrow Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-200" />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ChannelX?</h2>
            <p className="text-lg text-gray-600">The safest way to buy and sell YouTube channels</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`} style={{ transitionDelay: featuresVisible ? '100ms' : '0ms' }}>
              <div className="inline-flex p-4 bg-blue-500 rounded-2xl mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Escrow Protection</h3>
              <p className="text-gray-600">
                Your funds are held securely until the channel transfer is complete and verified.
              </p>
            </div>
            
            <div className={`text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-lg transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`} style={{ transitionDelay: featuresVisible ? '200ms' : '0ms' }}>
              <div className="inline-flex p-4 bg-green-500 rounded-2xl mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Listings</h3>
              <p className="text-gray-600">
                Every channel is verified for authenticity, metrics, and monetization status.
              </p>
            </div>
            
            <div className={`text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`} style={{ transitionDelay: featuresVisible ? '300ms' : '0ms' }}>
              <div className="inline-flex p-4 bg-purple-500 rounded-2xl mb-4 shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple payment options with bank-level security and fraud protection.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Channels */}
      <section ref={channelsRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center mb-12 transition-all duration-700 ${channelsVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`}>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Channels</h2>
              <p className="text-lg text-gray-600">Handpicked opportunities for you</p>
            </div>
            <Link to="/marketplace">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {displayChannels.map((channel, index) => (
              <div 
                key={channel.id} 
                className={`transition-all duration-700 ${channelsVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`}
                style={{ transitionDelay: channelsVisible ? `${(index + 1) * 100}ms` : '0ms' }}
              >
                <ChannelCard channel={channel} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-100 scale-98'}`} style={{ transitionDelay: statsVisible ? '0ms' : '0ms' }}>
              <div className="text-4xl font-bold mb-2">$50M+</div>
              <div className="text-blue-100">Total Transaction Value</div>
            </div>
            <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-100 scale-98'}`} style={{ transitionDelay: statsVisible ? '100ms' : '0ms' }}>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-purple-100">Channels Sold</div>
            </div>
            <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-100 scale-98'}`} style={{ transitionDelay: statsVisible ? '200ms' : '0ms' }}>
              <div className="text-4xl font-bold mb-2">15K+</div>
              <div className="text-pink-100">Active Users</div>
            </div>
            <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-100 scale-98'}`} style={{ transitionDelay: statsVisible ? '300ms' : '0ms' }}>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-indigo-100">User Rating</div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default LandingPage