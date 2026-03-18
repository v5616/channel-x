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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-orange-500 to-amber-500">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-8 animate-fade-in shadow-lg">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>Join 15,000+ successful creators</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 animate-fade-in leading-tight tracking-tight">
              Your YouTube Channel
              <span className="block text-amber-100 mt-2 animate-fade-in stagger-1">
                Marketplace
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-orange-50 mb-10 max-w-3xl mx-auto animate-fade-in stagger-2 leading-relaxed font-light">
              Buy and sell verified YouTube channels with confidence. Secure, simple, and trusted by creators worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-3">
              <Link to="/marketplace">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-orange-50 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all font-semibold">
                  Browse Channels
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm font-semibold">
                  List Your Channel
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-12 animate-fade-in stagger-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">Verified</div>
                  <div className="text-orange-100 text-sm">100% Authentic</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">Protected</div>
                  <div className="text-orange-100 text-sm">Escrow Security</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">Secure</div>
                  <div className="text-orange-100 text-sm">Safe Payments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fffbeb"/>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-bold mb-4 tracking-wide uppercase">
              <CheckCircle className="w-4 h-4" />
              <span>Why ChannelX</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-4 tracking-tight">
              Built for Your Success
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
              Everything you need to buy or sell with complete confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`group relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl border-2 border-orange-100 hover:border-primary-300 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`} style={{ transitionDelay: featuresVisible ? '100ms' : '0ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-orange-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex p-4 bg-gradient-to-br from-primary-500 to-orange-500 rounded-2xl mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">Escrow Protection</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Your funds stay secure in escrow until the channel transfer is verified and complete.
                </p>
              </div>
            </div>
            
            <div className={`group relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl border-2 border-amber-100 hover:border-accent-300 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`} style={{ transitionDelay: featuresVisible ? '200ms' : '0ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-100 to-yellow-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">Verified Listings</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Every channel is thoroughly verified for authenticity, metrics, and monetization.
                </p>
              </div>
            </div>
            
            <div className={`group relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl border-2 border-orange-100 hover:border-primary-300 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`} style={{ transitionDelay: featuresVisible ? '300ms' : '0ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-orange-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex p-4 bg-gradient-to-br from-orange-500 to-primary-500 rounded-2xl mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">Secure Payments</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Bank-level encryption with multiple payment options and instant tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Channels */}
      <section ref={channelsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center mb-12 transition-all duration-700 ${channelsVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-5'}`}>
            <div>
              <h2 className="text-4xl font-black text-neutral-900 mb-2 tracking-tight">Featured Channels</h2>
              <p className="text-lg text-neutral-600 font-light">Handpicked premium opportunities</p>
            </div>
            <Link to="/marketplace">
              <Button variant="outline" className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-semibold">
                View All
              </Button>
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
      <section ref={statsRef} className="py-24 bg-gradient-to-br from-primary-600 via-orange-500 to-amber-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              Trusted Worldwide
            </h2>
            <p className="text-xl text-orange-50 font-light">
              Join thousands of successful creators
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className={`group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-100 scale-98'}`} style={{ transitionDelay: statsVisible ? '0ms' : '0ms' }}>
              <div className="text-5xl lg:text-6xl font-black mb-3 text-white">
                $50M+
              </div>
              <div className="text-orange-100 text-lg font-medium">Transaction Volume</div>
              <div className="mt-4 h-1.5 w-20 bg-white/50 rounded-full mx-auto"></div>
            </div>
            
            <div className={`group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-100 scale-98'}`} style={{ transitionDelay: statsVisible ? '100ms' : '0ms' }}>
              <div className="text-5xl lg:text-6xl font-black mb-3 text-white">
                2,500+
              </div>
              <div className="text-orange-100 text-lg font-medium">Channels Sold</div>
              <div className="mt-4 h-1.5 w-20 bg-white/50 rounded-full mx-auto"></div>
            </div>
            
            <div className={`group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-100 scale-98'}`} style={{ transitionDelay: statsVisible ? '200ms' : '0ms' }}>
              <div className="text-5xl lg:text-6xl font-black mb-3 text-white">
                15K+
              </div>
              <div className="text-orange-100 text-lg font-medium">Active Users</div>
              <div className="mt-4 h-1.5 w-20 bg-white/50 rounded-full mx-auto"></div>
            </div>
            
            <div className={`group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-100 scale-98'}`} style={{ transitionDelay: statsVisible ? '300ms' : '0ms' }}>
              <div className="text-5xl lg:text-6xl font-black mb-3 text-white">
                4.9/5
              </div>
              <div className="text-orange-100 text-lg font-medium">User Rating</div>
              <div className="mt-4 h-1.5 w-20 bg-white/50 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default LandingPage