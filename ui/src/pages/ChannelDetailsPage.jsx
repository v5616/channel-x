import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Users, DollarSign, TrendingUp, MapPin, Star, MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-600 mb-6 font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>

        {/* Channel Banner */}
        <Card className="overflow-hidden mb-6 border-2 border-orange-100 shadow-xl">
          <div className="aspect-[21/6] bg-gradient-to-br from-primary-100 to-orange-100 relative">
            <img src={channel.banner} alt={channel.name} className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80' }} />
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-start gap-3 mb-3">
          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900">{channel.name}</h1>
                  {channel.verified && <Badge variant="success">Verified</Badge>}
                  {channel.monetized && <Badge variant="primary">Monetized</Badge>}
                </div>
                <p className="text-lg text-neutral-500 mb-3 font-medium">{channel.niche}</p>
                <div className="flex items-center gap-2 text-neutral-500">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>{channel.country}</span>
                </div>
              </div>

              <Card className="p-6 lg:w-80 border-2 border-orange-100 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-sm text-neutral-500 font-semibold uppercase tracking-wide mb-2">Asking Price</div>
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="w-8 h-8 text-primary-600" />
                    <span className="text-5xl font-black text-neutral-900">{channel.price}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" size="lg">Buy Now</Button>
                  <Link to="/chat">
                    <Button variant="outline" className="w-full" size="lg">
                      <MessageCircle className="w-5 h-5" />
                      Contact Seller
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-neutral-500 uppercase tracking-wide">Subscribers</span>
            </div>
            <div className="text-3xl font-black text-neutral-900">{channel.subscribers}</div>
          </Card>

          <Card className="p-6 border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-neutral-500 uppercase tracking-wide">Monthly Revenue</span>
            </div>
            <div className="text-3xl font-black text-neutral-900">{channel.monthlyRevenue}</div>
          </Card>

          <Card className="p-6 border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-neutral-500 uppercase tracking-wide">Avg Views</span>
            </div>
            <div className="text-3xl font-black text-neutral-900">{channel.avgViews}</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-2 border-orange-100 shadow-xl">
              {/* Tabs */}
              <div className="border-b-2 border-orange-100">
                <div className="flex">
                  {['overview', 'analytics', 'description'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-bold capitalize transition-colors ${
                        activeTab === tab
                          ? 'text-primary-600 border-b-2 border-primary-600 -mb-px'
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-black text-neutral-900 mb-4 text-lg">Channel Highlights</h3>
                      <ul className="space-y-3">
                        {[
                          'Consistent upload schedule with 3-4 videos per week',
                          `Engaged community with ${channel.engagement} engagement rate`,
                          'Multiple revenue streams including AdSense and sponsorships',
                          'Full ownership transfer with all assets included',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                            <span className="text-neutral-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-black text-neutral-900 mb-4 text-lg">What's Included</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {['YouTube Channel', 'Social Media Accounts', 'Video Assets', 'Brand Guidelines'].map(item => (
                          <div key={item} className="flex items-center gap-2 p-3 bg-orange-50 rounded-2xl">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="text-neutral-700 font-medium text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Engagement Rate', value: channel.engagement },
                        { label: 'Avg View Duration', value: '8:42' },
                        { label: 'Upload Frequency', value: '3-4/week' },
                        { label: 'Total Videos', value: '342' },
                      ].map(stat => (
                        <div key={stat.label} className="p-4 bg-orange-50 rounded-2xl">
                          <div className="text-sm text-neutral-500 font-semibold mb-1">{stat.label}</div>
                          <div className="text-2xl font-black text-neutral-900">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="h-64 bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl border-2 border-orange-100 flex items-center justify-center text-neutral-400 font-medium">
                      Analytics Chart Placeholder
                    </div>
                  </div>
                )}

                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p className="text-neutral-600 leading-relaxed">{channel.description}</p>
                    <p className="text-neutral-600 leading-relaxed">
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
            <Card className="p-6 border-2 border-orange-100 shadow-xl sticky top-24">
              <h3 className="font-black text-neutral-900 mb-4 text-lg">Seller Information</h3>

              <Link to={`/seller/${channel.seller.name.toLowerCase().replace(' ', '-')}`}>
                <div className="flex items-center gap-3 mb-4 hover:bg-orange-50 p-3 rounded-2xl transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-black">
                      {channel.seller.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900">{channel.seller.name}</div>
                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{channel.seller.rating}</span>
                      <span className="text-neutral-300">•</span>
                      <span>{channel.seller.sales} sales</span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="space-y-3 pt-4 border-t-2 border-orange-100">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Response Time</span>
                  <span className="font-bold text-neutral-900">Within 2 hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Member Since</span>
                  <span className="font-bold text-neutral-900">Jan 2024</span>
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
