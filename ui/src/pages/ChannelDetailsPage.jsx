import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Users, DollarSign, TrendingUp, MapPin, Star, MessageCircle, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { channels } from '../data/mockData'

const ChannelDetailsPage = () => {
  const { id } = useParams()
  const channel = channels.find(c => c.id === parseInt(id)) || channels[0]
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>
        
        {/* Channel Banner */}
        <Card className="overflow-hidden mb-6">
          <div className="aspect-[21/6] bg-gradient-to-br from-primary-100 to-primary-200 relative">
            <img 
              src={channel.banner} 
              alt={channel.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <h1 className="text-4xl font-bold text-gray-900">{channel.name}</h1>
                  {channel.verified && (
                    <Badge variant="success">Verified</Badge>
                  )}
                  {channel.monetized && (
                    <Badge variant="primary">Monetized</Badge>
                  )}
                </div>
                <p className="text-lg text-gray-600 mb-4">{channel.niche}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{channel.country}</span>
                </div>
              </div>
              
              <Card className="p-6 lg:w-80">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-600 mb-2">Asking Price</div>
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="w-8 h-8 text-primary-600" />
                    <span className="text-5xl font-bold text-gray-900">{channel.price}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" size="lg">Buy Now</Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageCircle className="w-5 h-5" />
                    Contact Seller
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Card>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Key Metrics */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-600">Subscribers</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{channel.subscribers}</div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Monthly Revenue</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{channel.monthlyRevenue}</div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Avg Views</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{channel.avgViews}</div>
          </Card>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 font-medium transition-colors ${
                      activeTab === 'overview'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`px-6 py-4 font-medium transition-colors ${
                      activeTab === 'analytics'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`px-6 py-4 font-medium transition-colors ${
                      activeTab === 'description'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Description
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Channel Highlights</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Consistent upload schedule with 3-4 videos per week</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Engaged community with {channel.engagement} engagement rate</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Multiple revenue streams including AdSense and sponsorships</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Full ownership transfer with all assets included</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>YouTube Channel</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Social Media Accounts</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Video Assets</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Brand Guidelines</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Engagement Rate</div>
                        <div className="text-2xl font-bold text-gray-900">{channel.engagement}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Avg View Duration</div>
                        <div className="text-2xl font-bold text-gray-900">8:42</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Upload Frequency</div>
                        <div className="text-2xl font-bold text-gray-900">3-4/week</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Total Videos</div>
                        <div className="text-2xl font-bold text-gray-900">342</div>
                      </div>
                    </div>
                    
                    <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                      Analytics Chart Placeholder
                    </div>
                  </div>
                )}
                
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {channel.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-4">
                      This channel has been carefully built over the years with consistent content quality 
                      and audience engagement. The channel has a loyal subscriber base and generates steady 
                      revenue through multiple streams.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          {/* Seller Info */}
          <div>
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
              
              <Link to={`/seller/${channel.seller.name.toLowerCase().replace(' ', '-')}`}>
                <div className="flex items-center gap-3 mb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">
                      {channel.seller.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{channel.seller.name}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{channel.seller.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span>{channel.seller.sales} sales</span>
                    </div>
                  </div>
                </div>
              </Link>
              
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium text-gray-900">Within 2 hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium text-gray-900">Jan 2024</span>
                </div>
              </div>
              
              <Link to="/chat">
                <Button variant="outline" className="w-full mt-6">
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default ChannelDetailsPage
