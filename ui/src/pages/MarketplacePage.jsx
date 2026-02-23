import { useState } from 'react'
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChannelCard from '../components/ChannelCard'
import Button from '../components/Button'
import Card from '../components/Card'
import { channels } from '../data/mockData'

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [niche, setNiche] = useState('all')
  const [monetized, setMonetized] = useState(false)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">Discover verified YouTube channels for sale</p>
        </div>
        
        {/* Search Bar */}
        <Card className="p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search channels by name, niche, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Sort: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Subscribers: High to Low</option>
              <option>Revenue: High to Low</option>
            </select>
          </div>
        </Card>
        
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Filters</h2>
              </div>
              
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-50k">Under $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-200k">$100K - $200K</option>
                    <option value="200k+">$200K+</option>
                  </select>
                </div>
                
                {/* Subscribers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Subscribers
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>All</option>
                    <option>10K - 50K</option>
                    <option>50K - 100K</option>
                    <option>100K - 500K</option>
                    <option>500K+</option>
                  </select>
                </div>
                
                {/* Niche */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Niche
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Niches</option>
                    <option value="tech">Technology</option>
                    <option value="gaming">Gaming</option>
                    <option value="fitness">Health & Fitness</option>
                    <option value="food">Food & Cooking</option>
                    <option value="travel">Travel & Lifestyle</option>
                    <option value="finance">Finance & Business</option>
                  </select>
                </div>
                
                {/* Monetized Toggle */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={monetized}
                      onChange={(e) => setMonetized(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Monetized Only
                    </span>
                  </label>
                </div>
                
                {/* Verified Toggle */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Verified Only
                    </span>
                  </label>
                </div>
                
                <Button variant="outline" className="w-full">
                  Reset Filters
                </Button>
              </div>
            </Card>
          </aside>
          
          {/* Channel Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">
              Showing {channels.length} channels
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {channels.map(channel => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="primary" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default MarketplacePage
