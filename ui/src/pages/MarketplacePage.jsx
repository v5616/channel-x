import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, Filter, X, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChannelCard from '../components/ChannelCard'
import Button from '../components/Button'
import { channels } from '../data/mockData'

const ITEMS_PER_PAGE = 6

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [subscriberRange, setSubscriberRange] = useState('all')
  const [niche, setNiche] = useState('all')
  const [monetized, setMonetized] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Parse price string like "125,000" -> 125000
  const parsePrice = (priceStr) => parseInt(priceStr.replace(/,/g, ''), 10)

  // Parse subscriber string like "250K" -> 250000
  const parseSubs = (subStr) => {
    const n = parseFloat(subStr)
    return subStr.includes('K') ? n * 1000 : subStr.includes('M') ? n * 1000000 : n
  }

  const filteredChannels = useMemo(() => {
    let result = [...channels]

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.niche.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      )
    }

    // Price range
    if (priceRange !== 'all') {
      result = result.filter(c => {
        const price = parsePrice(c.price)
        if (priceRange === '0-50k') return price < 50000
        if (priceRange === '50k-100k') return price >= 50000 && price <= 100000
        if (priceRange === '100k-200k') return price > 100000 && price <= 200000
        if (priceRange === '200k+') return price > 200000
        return true
      })
    }

    // Subscriber range
    if (subscriberRange !== 'all') {
      result = result.filter(c => {
        const subs = parseSubs(c.subscribers)
        if (subscriberRange === '10k-50k') return subs >= 10000 && subs < 50000
        if (subscriberRange === '50k-100k') return subs >= 50000 && subs < 100000
        if (subscriberRange === '100k-500k') return subs >= 100000 && subs < 500000
        if (subscriberRange === '500k+') return subs >= 500000
        return true
      })
    }

    // Niche
    if (niche !== 'all') {
      const nicheMap = {
        tech: 'Technology', gaming: 'Gaming', fitness: 'Health & Fitness',
        food: 'Food & Cooking', travel: 'Travel & Lifestyle', finance: 'Finance & Business'
      }
      result = result.filter(c => c.niche === nicheMap[niche])
    }

    // Monetized
    if (monetized) result = result.filter(c => c.monetized)

    // Verified
    if (verified) result = result.filter(c => c.verified)

    // Sort
    if (sortBy === 'price-asc') result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    else if (sortBy === 'price-desc') result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    else if (sortBy === 'subs-desc') result.sort((a, b) => parseSubs(b.subscribers) - parseSubs(a.subscribers))

    return result
  }, [searchQuery, priceRange, subscriberRange, niche, monetized, verified, sortBy])

  const totalPages = Math.ceil(filteredChannels.length / ITEMS_PER_PAGE)
  const paginatedChannels = filteredChannels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const activeFiltersCount = [
    priceRange !== 'all', subscriberRange !== 'all', niche !== 'all', monetized, verified
  ].filter(Boolean).length

  const clearFilters = () => {
    setPriceRange('all'); setSubscriberRange('all'); setNiche('all')
    setMonetized(false); setVerified(false); setCurrentPage(1)
  }

  // Reset to page 1 when filters change
  const handleFilterChange = (setter) => (val) => { setter(val); setCurrentPage(1) }

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
              <span>{filteredChannels.length} Premium Channels Available</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
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
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-5 py-4 border-2 border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white min-w-[200px] font-medium">
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="subs-desc">Subscribers: High to Low</option>
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
                    onClick={clearFilters}
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
                    onChange={(e) => handleFilterChange(setPriceRange)(e.target.value)}
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
                  <select
                    value={subscriberRange}
                    onChange={(e) => handleFilterChange(setSubscriberRange)(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition-all font-medium">
                    <option value="all">All</option>
                    <option value="10k-50k">10K - 50K</option>
                    <option value="50k-100k">50K - 100K</option>
                    <option value="100k-500k">100K - 500K</option>
                    <option value="500k+">500K+</option>
                  </select>
                </div>
                
                {/* Niche */}
                <div>
                  <label className="block text-sm font-black text-neutral-900 mb-3 uppercase tracking-wide">
                    Niche
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => handleFilterChange(setNiche)(e.target.value)}
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
                      onChange={(e) => { setMonetized(e.target.checked); setCurrentPage(1) }}
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
                      checked={verified}
                      onChange={(e) => { setVerified(e.target.checked); setCurrentPage(1) }}
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
                Showing <span className="font-black text-neutral-900">{paginatedChannels.length}</span> of <span className="font-black text-neutral-900">{filteredChannels.length}</span> channels
              </div>
              
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600 font-medium">Active filters:</span>
                  <div className="flex gap-2">
                    {subscriberRange !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold border-2 border-primary-200">
                        {subscriberRange} subs
                        <button onClick={() => { setSubscriberRange('all'); setCurrentPage(1) }}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {priceRange !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold border-2 border-primary-200">
                        {priceRange}
                        <button onClick={() => { setPriceRange('all'); setCurrentPage(1) }}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {niche !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold border-2 border-primary-200">
                        {niche}
                        <button onClick={() => { setNiche('all'); setCurrentPage(1) }}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {monetized && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold border-2 border-primary-200">
                        Monetized
                        <button onClick={() => { setMonetized(false); setCurrentPage(1) }}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {verified && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold border-2 border-primary-200">
                        Verified
                        <button onClick={() => { setVerified(false); setCurrentPage(1) }}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {paginatedChannels.length > 0 ? (
                paginatedChannels.map(channel => (
                  <ChannelCard key={channel.id} channel={channel} />
                ))
              ) : (
                <div className="col-span-3 text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-black text-neutral-900 mb-2">No channels found</h3>
                  <p className="text-neutral-500 mb-6">Try adjusting your filters or search query</p>
                  <button onClick={clearFilters} className="px-6 py-3 bg-gradient-to-r from-primary-600 to-orange-500 text-white rounded-2xl font-bold hover:opacity-90 transition-opacity">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline" size="sm"
                  className="rounded-2xl border-2 border-orange-200 text-neutral-700 hover:bg-orange-50 font-semibold"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >Previous</Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page} size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage
                      ? 'rounded-2xl bg-gradient-to-r from-primary-600 to-orange-500 text-white font-bold shadow-lg'
                      : 'rounded-2xl border-2 border-orange-200 text-neutral-700 hover:bg-orange-50 font-semibold'
                    }
                    variant={page === currentPage ? 'primary' : 'outline'}
                  >{page}</Button>
                ))}
                <Button
                  variant="outline" size="sm"
                  className="rounded-2xl border-2 border-orange-200 text-neutral-700 hover:bg-orange-50 font-semibold"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >Next</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default MarketplacePage
