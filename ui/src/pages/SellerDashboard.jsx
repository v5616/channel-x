import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Package, DollarSign, Settings, Plus, Eye, MessageCircle, MoreVertical, X, Upload, Link as LinkIcon } from 'lucide-react'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { listings } from '../data/mockData'

const SellerDashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [links, setLinks] = useState([{ label: '', url: '' }])
  const [activeTab, setActiveTab] = useState('dashboard')
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachments([...attachments, ...files])
  }
  
  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }
  
  const addLink = () => {
    setLinks([...links, { label: '', url: '' }])
  }
  
  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index))
  }
  
  const updateLink = (index, field, value) => {
    const newLinks = [...links]
    newLinks[index][field] = value
    setLinks(newLinks)
  }
  
  // Mock earnings data
  const earnings = {
    total: '$348,000',
    pending: '$95,000',
    available: '$253,000',
    transactions: [
      { id: 1, channel: 'Tech Reviews Pro', amount: '$125,000', date: '2026-02-15', status: 'Completed' },
      { id: 2, channel: 'Finance Simplified', amount: '$95,000', date: '2026-02-10', status: 'Pending' },
      { id: 3, channel: 'Gaming Legends', amount: '$128,000', date: '2026-01-20', status: 'Completed' },
    ]
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium w-full text-left ${
                activeTab === 'dashboard' ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium w-full text-left ${
                activeTab === 'listings' ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Package className="w-5 h-5" />
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium w-full text-left ${
                activeTab === 'earnings' ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              Earnings
            </button>
            <Link to="/chat" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <MessageCircle className="w-5 h-5" />
              Messages
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <>
                {/* Header */}
                <div className="flex justify-between items-center mb-8 animate-slide-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
                    <p className="text-gray-600">Manage your channel listings and track performance</p>
                  </div>
                  <Button onClick={() => setShowModal(true)} className="transform transition-transform hover:scale-105">
                    <Plus className="w-5 h-5" />
                    Add New Listing
                  </Button>
                </div>
                
                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="animate-scale-in opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
                    <StatCard
                      title="Active Listings"
                      value="3"
                      icon={Package}
                      trend="up"
                      trendValue="+1 this month"
                    />
                  </div>
                  <div className="animate-scale-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                    <StatCard
                      title="Total Views"
                      value="1,247"
                      icon={Eye}
                      trend="up"
                      trendValue="+12%"
                    />
                  </div>
                  <div className="animate-scale-in opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
                    <StatCard
                      title="Inquiries"
                      value="42"
                      icon={MessageCircle}
                      trend="up"
                      trendValue="+8"
                    />
                  </div>
                  <div className="animate-scale-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                    <StatCard
                      title="Total Earnings"
                      value="$348K"
                      icon={DollarSign}
                      trend="up"
                      trendValue="+$95K"
                    />
                  </div>
                </div>
                
                {/* Listings Table */}
                <div className="animate-fade-in opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
                  <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Listings</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Channel</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Price</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Views</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Inquiries</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Listed</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {listings.map(listing => (
                          <tr key={listing.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{listing.channel}</div>
                              <a 
                                href={listing.channelUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-primary-600 hover:text-primary-700"
                              >
                                {listing.channelUrl}
                              </a>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{listing.price}</td>
                            <td className="px-6 py-4">
                              <Badge variant={
                                listing.status === 'Active' ? 'success' :
                                listing.status === 'Sold' ? 'default' :
                                'warning'
                              }>
                                {listing.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{listing.views}</td>
                            <td className="px-6 py-4 text-gray-900">{listing.inquiries}</td>
                            <td className="px-6 py-4 text-gray-600">{listing.listed}</td>
                            <td className="px-6 py-4">
                              <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <MoreVertical className="w-5 h-5 text-gray-600" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
                </div>
              </>
            )}
            
            {/* My Listings Tab */}
            {activeTab === 'listings' && (
              <>
                <div className="flex justify-between items-center mb-8 animate-fade-in">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
                    <p className="text-gray-600">All your channel listings in one place</p>
                  </div>
                  <Button onClick={() => setShowModal(true)}>
                    <Plus className="w-5 h-5" />
                    Add New Listing
                  </Button>
                </div>
                
                <div className="animate-slide-in-right">
                  <Card>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Channel</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Price</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Views</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Inquiries</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Listed</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {listings.map(listing => (
                          <tr key={listing.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{listing.channel}</div>
                              <a 
                                href={listing.channelUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-primary-600 hover:text-primary-700"
                              >
                                {listing.channelUrl}
                              </a>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{listing.price}</td>
                            <td className="px-6 py-4">
                              <Badge variant={
                                listing.status === 'Active' ? 'success' :
                                listing.status === 'Sold' ? 'default' :
                                'warning'
                              }>
                                {listing.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{listing.views}</td>
                            <td className="px-6 py-4 text-gray-900">{listing.inquiries}</td>
                            <td className="px-6 py-4 text-gray-600">{listing.listed}</td>
                            <td className="px-6 py-4">
                              <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <MoreVertical className="w-5 h-5 text-gray-600" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
                </div>
              </>
            )}
            
            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <>
                <div className="mb-8 animate-fade-in">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings</h1>
                  <p className="text-gray-600">Track your revenue and payouts</p>
                </div>
                
                {/* Earnings Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="animate-scale-in stagger-1">
                    <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Total Earnings</span>
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{earnings.total}</div>
                    <p className="text-sm text-green-600 mt-2">All time</p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Pending</span>
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{earnings.pending}</div>
                    <p className="text-sm text-gray-600 mt-2">In escrow</p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Available</span>
                      <DollarSign className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{earnings.available}</div>
                    <p className="text-sm text-gray-600 mt-2">Ready to withdraw</p>
                    </Card>
                  </div>
                </div>
                
                {/* Transactions */}
                <div className="animate-slide-in-left">
                  <Card>
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
                    <Button variant="outline" size="sm">Request Payout</Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Channel</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {earnings.transactions.map(transaction => (
                          <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-900">{transaction.channel}</td>
                            <td className="px-6 py-4 font-semibold text-gray-900">{transaction.amount}</td>
                            <td className="px-6 py-4 text-gray-600">{transaction.date}</td>
                            <td className="px-6 py-4">
                              <Badge variant={transaction.status === 'Completed' ? 'success' : 'warning'}>
                                {transaction.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      
      {/* Add Listing Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Add New Listing</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel Name
                </label>
                <input
                  type="text"
                  placeholder="Enter channel name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel URL
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/@yourchannel"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscribers
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 250K"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Revenue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., $8,500"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asking Price
                </label>
                <input
                  type="text"
                  placeholder="e.g., 125,000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niche
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Select niche</option>
                  <option>Technology</option>
                  <option>Gaming</option>
                  <option>Health & Fitness</option>
                  <option>Food & Cooking</option>
                  <option>Travel & Lifestyle</option>
                  <option>Finance & Business</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe your channel..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="monetized"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="monetized" className="text-sm font-medium text-gray-700">
                  Channel is monetized
                </label>
              </div>
              
              {/* Links Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Links
                  </label>
                  <button
                    type="button"
                    onClick={addLink}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Link
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Add social media profiles, website, or other relevant links
                </p>
                
                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Label (e.g., Instagram)"
                        value={link.label}
                        onChange={(e) => updateLink(index, 'label', e.target.value)}
                        className="w-1/3 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                      <input
                        type="url"
                        placeholder="https://..."
                        value={link.url}
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                      {links.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLink(index)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel Images
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Upload channel screenshots, analytics, or banner images
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="text-primary-600 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </label>
                </div>
                
                {/* Attachment List */}
                {attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-primary-100 rounded">
                            <Upload className="w-4 h-4 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button className="flex-1">Submit for Review</Button>
                <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default SellerDashboard
