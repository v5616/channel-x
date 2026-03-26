import { Link } from 'react-router-dom'
import { Star, MapPin, Calendar, Package, CheckCircle, MessageCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Button from '../components/Button'
import ChannelCard from '../components/ChannelCard'
import { channels } from '../data/mockData'

const SellerProfilePage = () => {
  const seller = {
    name: 'John Smith',
    rating: 4.8,
    totalSales: 12,
    memberSince: 'January 2024',
    location: 'United States',
    verified: true,
    responseTime: 'Within 2 hours',
    bio: 'Professional YouTube channel broker with 5+ years of experience. Specialized in tech, gaming, and lifestyle channels. All listings are thoroughly verified with complete documentation.',
    stats: { activeListings: 3, totalSold: 12, totalRevenue: '$1.2M', successRate: '98%' },
  }

  const sellerChannels = channels.slice(0, 3)

  

  const reviews = [
    { id: 1, buyer: 'Sarah Johnson', rating: 5, date: 'Feb 10, 2026', comment: 'Excellent seller! Very professional and responsive. The channel transfer was smooth and all documentation was provided.' },
    { id: 2, buyer: 'Mike Chen', rating: 5, date: 'Feb 5, 2026', comment: 'Great experience. The channel metrics were exactly as described. Highly recommend!' },
    { id: 3, buyer: 'Emma Wilson', rating: 4, date: 'Jan 28, 2026', comment: 'Good seller, quick response time. Minor delay in transfer but overall satisfied.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border-2 border-orange-100 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-3xl font-black text-white">
                    {seller.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h1 className="text-2xl font-black text-neutral-900 mb-1">{seller.name}</h1>
                {seller.verified && (
                  <div className="flex items-center justify-center gap-1 text-emerald-600 text-sm mb-3 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Verified Seller
                  </div>
                )}
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-black text-neutral-900">{seller.rating}</span>
                  <span className="text-neutral-500 text-sm">({seller.totalSales} sales)</span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed mb-6 pb-6 border-b-2 border-orange-100">{seller.bio}</p>

              <div className="space-y-2 mb-6 pb-6 border-b-2 border-orange-100">
                {[
                  { label: 'Active Listings', value: seller.stats.activeListings },
                  { label: 'Total Sold', value: seller.stats.totalSold },
                  { label: 'Total Revenue', value: seller.stats.totalRevenue },
                  { label: 'Success Rate', value: seller.stats.successRate, green: true },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center p-2 rounded-xl hover:bg-orange-50 transition-colors">
                    <span className="text-sm text-neutral-500">{item.label}</span>
                    <span className={`font-black text-sm ${item.green ? 'text-emerald-600' : 'text-neutral-900'}`}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  {seller.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  Member since {seller.memberSince}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Package className="w-4 h-4 text-orange-400" />
                  Response: {seller.responseTime}
                </div>
              </div>

              <Link to="/chat">
                <Button className="w-full">
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </Button>
              </Link>
            </Card>
          </div>

          {/* Main */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Active', value: seller.stats.activeListings },
                { label: 'Sold', value: seller.stats.totalSold },
                { label: 'Revenue', value: seller.stats.totalRevenue },
                { label: 'Rating', value: `${seller.rating}/5` },
              ].map(stat => (
                <Card key={stat.label} className="p-4 border-2 border-orange-100 text-center">
                  <div className="text-xs text-neutral-500 font-bold uppercase tracking-wide mb-1">{stat.label}</div>
                  <div className="text-xl font-black text-neutral-900">{stat.value}</div>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-black text-neutral-900 mb-4">Active Listings ({sellerChannels.length})</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {sellerChannels.map(channel => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>

            <Card className="p-6 border-2 border-orange-100 shadow-xl">
              <h2 className="text-xl font-black text-neutral-900 mb-6">Reviews</h2>
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="pb-4 border-b-2 border-orange-50 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-neutral-900">{review.buyer}</div>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-200'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-neutral-400">{review.date}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{review.comment}</p>
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
