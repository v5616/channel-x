import { useState } from 'react'
import { Search, SlidersHorizontal, ChevronDown, TrendingUp, Filter, X, Sparkles } from 'lucide-react'
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
  const [showFilters, setShowFilters] = useState(false)
  
  const activeFiltersCount = [
    priceRange !== 'all',
    niche !== 'all',
    monetized
  ].filter(Boolean).length
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary-600 via-orange-500 to-amber-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 w-48 h-48 bg-accent-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>{channels.length} Premium Channels Available</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
              Discover Your Perfect Channel
            </h1>
            <p className="text-xl text-orange-50 font-light">
              Browse verified YouTube channels across all niches
            </p>
          </div>
        </div>
        
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 18.75C840 22.5 960 30 1080 33.75C1200 37.5 1320 37.5 1380 37.5L1440 37.5V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#fffbeb"/>
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-orange-100 p-6 mb-8 -mt-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="text"
                placeholder="Search by channel name, niche, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-medium"
              />
            </div>
            
            <div className="flex gap-3">
              <select className="px-5 py-4 border-2 border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white min-w-[200px] font-medium">
                <option>Sort: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Subscribers: High to Low</option>
                <option>Revenue: High to Low</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-5 py-4 bg-gradient-to-r from-primary-600 to-orange-500 text-white rounded-2xl hover:from-primary-500 hover:to-orange-400 transition-all font-semibold shadow-lg"
              >
                <Filter className="w-5 h-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-white text-primary-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="bg-white rounded-3xl shadow-xl border-2 border-orange-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl">
                    <SlidersHorizontal className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-black text-neutral-900 text-xl">Filters</h2>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => {
                      setPriceRange('all')
                      setNiche('all')
                      setMonetized(false)
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700 font-bold"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-black text-neutral-900 mb-3 uppercase tracking-wide">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition-all font-medium"
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
                  <label className="block text-sm font-black text-neutral-900 mb-3 uppercase tracking-wide">
                    Subscribers
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition-all font-medium">
                    <option>All</option>
                    <option>10K - 50K</option>
                    <option>50K - 100K</option>
                    <option>100K - 500K</option>
                    <option>500K+</option>
                  </select>
                </div>
                
                {/* Niche */}
                <div>
                  <label className="block text-sm font-black text-neutral-900 mb-3 uppercase tracking-wide">
                    Niche
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition-all font-medium"
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
                
                <div className="border-t-2 border-orange-100 pt-6">
                  <label className="block text-sm font-black text-neutral-900 mb-4 uppercase tracking-wide">
                    Channel Status
                  </label>
                  
                  {/* Monetized Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl hover:bg-orange-50 transition-colors mb-2 border-2 border-transparent hover:border-orange-200">
                    <input
                      type="checkbox"
                      checked={monetized}
                      onChange={(e) => setMonetized(e.target.checked)}
                      className="w-5 h-5 text-primary-600 border-2 border-orange-300 rounded focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-neutral-900 block">
                        Monetized Only
                      </span>
                      <span className="text-xs text-neutral-600">
                        Channels earning revenue
                      </span>
                    </div>
                  </label>
                  
                  {/* Verified Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl hover:bg-orange-50 transition-colors border-2 border-transparent hover:border-orange-200">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary-600 border-2 border-orange-300 rounded focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-neutral-900 block">
                        Verified Only
                      </span>
                      <span className="text-xs text-neutral-600">
                        Platform verified channels
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Channel Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-neutral-600 font-medium">
                Showing <span className="font-black text-neutral-900">{channels.length}</span> channels
              </div>
              
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600 font-medium">Active filters:</span>
                  <div className="flex gap-2">
                    {priceRange !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold border-2 border-primary-200">
                        {priceRange}
                        <button onClick={() => setPriceRange('all')}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {niche !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold border-2 border-primary-200">
                        {niche}
                        <button onClick={() => setNiche('all')}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {monetized && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold border-2 border-primary-200">
                        Monetized
                        <button onClick={() => setMonetized(false)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {channels.map(channel => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button variant="outline" size="sm" className="rounded-2xl border-2 border-orange-200 text-neutral-700 hover:bg-orange-50 font-semibold">Previous</Button>
              <Button size="sm" className="rounded-2xl bg-gradient-to-r from-primary-600 to-orange-500 text-white font-bold shadow-lg">1</Button>
              <Button variant="outline" size="sm" className="rounded-2xl border-2 border-orange-200 text-neutral-700 hover:bg-orange-50 font-semibold">2</Button>
              <Button variant="outline" size="sm" className="rounded-2xl border-2 border-orange-200 text-neutral-700 hover:bg-orange-50 font-semibold">3</Button>
              <span className="px-2 text-neutral-400 font-bold">...</span>
              <Button variant="outline" size="sm" className="rounded-2xl border-2 border-orange-200 text-neutral-700 hover:bg-orange-50 font-semibold">10</Button>
              <Button variant="outline" size="sm" className="rounded-2xl border-2 border-orange-200 text-neutral-700 hover:bg-orange-50 font-semibold">Next</Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default MarketplacePage
