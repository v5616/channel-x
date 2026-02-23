import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Calendar, Package, DollarSign, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Badge from '../components/Badge'
import ChannelCard from '../components/ChannelCard'
import { channels } from '../data/mockData'

const SellerProfilePage = () => {
  const { id } = useParams()
  
  // Mock seller data - in real app, fetch by seller ID
  const seller = {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    rating: 4.8,
    totalSales: 12,
    memberSince: 'January 2024',
    location: 'United States',
    verified: true,
    responseTime: 'Within 2 hours',
    bio: 'Professional YouTube channel broker with 5+ years of experience. Specialized in tech, gaming, and lifestyle channels. All my listings are thoroughly verified and come with complete documentation.',
    stats: {
      activeListings: 3,
      totalSold: 12,
      totalRevenue: '$1.2M',
      successRate: '98%',
    }
  }
  
  // Filter channels by this seller (for demo, show first 3)
  const sellerChannels = channels.slice(0, 3)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Seller Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    {seller.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{seller.name}</h1>
                {seller.verified && (
                  <div className="flex items-center justify-center gap-1 text-green-600 text-sm mb-3">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified Seller</span>
                  </div>
                )}
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-900">{seller.rating}</span>
                  <span className="text-gray-600">({seller.totalSales} sales)</span>
                </div>
              </div>
              
              {/* Bio */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 leading-relaxed">{seller.bio}</p>
              </div>
              
              {/* Stats */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Listings</span>
                  <span className="font-semibold text-gray-900">{seller.stats.activeListings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Sold</span>
                  <span className="font-semibold text-gray-900">{seller.stats.totalSold}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="font-semibold text-gray-900">{seller.stats.totalRevenue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">{seller.stats.successRate}</span>
                </div>
              </div>
              
              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{seller.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {seller.memberSince}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>Response time: {seller.responseTime}</span>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">Active</div>
                <div className="text-2xl font-bold text-gray-900">{seller.stats.activeListings}</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">Sold</div>
                <div className="text-2xl font-bold text-gray-900">{seller.stats.totalSold}</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">Revenue</div>
                <div className="text-2xl font-bold text-gray-900">{seller.stats.totalRevenue}</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">Rating</div>
                <div className="text-2xl font-bold text-gray-900">{seller.rating}/5</div>
              </Card>
            </div>
            
            {/* Seller's Channels */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Active Listings ({sellerChannels.length})
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {sellerChannels.map(channel => (
                  <ChannelCard key={channel.id} channel={channel} />
                ))}
              </div>
            </div>
            
            {/* Reviews Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
              
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    buyer: 'Sarah Johnson',
                    rating: 5,
                    date: 'Feb 10, 2026',
                    comment: 'Excellent seller! Very professional and responsive. The channel transfer was smooth and all documentation was provided.',
                  },
                  {
                    id: 2,
                    buyer: 'Mike Chen',
                    rating: 5,
                    date: 'Feb 5, 2026',
                    comment: 'Great experience. The channel metrics were exactly as described. Highly recommend!',
                  },
                  {
                    id: 3,
                    buyer: 'Emma Wilson',
                    rating: 4,
                    date: 'Jan 28, 2026',
                    comment: 'Good seller, quick response time. Minor delay in transfer but overall satisfied.',
                  },
                ].map(review => (
                  <div key={review.id} className="pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-gray-900">{review.buyer}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default SellerProfilePage
