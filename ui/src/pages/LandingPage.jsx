import { Link } from 'react-router-dom'
import { Shield, CheckCircle, DollarSign, TrendingUp, Users, Lock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import ChannelCard from '../components/ChannelCard'
import { channels } from '../data/mockData'

const LandingPage = () => {
  const featuredChannels = channels.slice(0, 3)
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-primary-600 to-purple-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Buy & Sell YouTube Channels
              <span className="block text-yellow-300 mt-2">Securely</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              The trusted marketplace for verified YouTube channels. Safe transactions with escrow protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">Browse Channels</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10">Get Started</Button>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-blue-100">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ChannelX?</h2>
            <p className="text-lg text-gray-600">The safest way to buy and sell YouTube channels</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all">
              <div className="inline-flex p-4 bg-blue-500 rounded-2xl mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Escrow Protection</h3>
              <p className="text-gray-600">
                Your funds are held securely until the channel transfer is complete and verified.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-lg transition-all">
              <div className="inline-flex p-4 bg-green-500 rounded-2xl mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Listings</h3>
              <p className="text-gray-600">
                Every channel is verified for authenticity, metrics, and monetization status.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Channels</h2>
              <p className="text-lg text-gray-600">Handpicked opportunities for you</p>
            </div>
            <Link to="/marketplace">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredChannels.map(channel => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">$50M+</div>
              <div className="text-blue-100">Total Transaction Value</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-purple-100">Channels Sold</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">15K+</div>
              <div className="text-pink-100">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
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
