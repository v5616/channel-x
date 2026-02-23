import { Link } from 'react-router-dom'
import { User, Mail, Package, DollarSign, Eye, MessageCircle, Settings, LogOut } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { listings } from '../data/mockData'

const ProfilePage = () => {
  const { user, logout } = useAuth()
  
  // Filter listings for current user (demo: show all for now)
  const myListings = listings
  const activeListings = myListings.filter(l => l.status === 'Active').length
  const soldListings = myListings.filter(l => l.status === 'Sold').length
  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0)
  const totalInquiries = myListings.reduce((sum, l) => sum + l.inquiries, 0)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              
              <div className="space-y-2">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-primary-600 bg-primary-50 rounded-xl font-medium">
                  <User className="w-5 h-5" />
                  My Profile
                </Link>
                <Link to="/seller/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                  <Package className="w-5 h-5" />
                  My Listings
                </Link>
                <Link to="/buyer/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                  <DollarSign className="w-5 h-5" />
                  Purchases
                </Link>
                <Link to="/chat" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                  <MessageCircle className="w-5 h-5" />
                  Messages
                </Link>
                <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Overview */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <StatCard
                  title="Active Listings"
                  value={activeListings}
                  icon={Package}
                />
                <StatCard
                  title="Sold Channels"
                  value={soldListings}
                  icon={DollarSign}
                />
                <StatCard
                  title="Total Views"
                  value={totalViews}
                  icon={Eye}
                />
                <StatCard
                  title="Total Inquiries"
                  value={totalInquiries}
                  icon={MessageCircle}
                />
              </div>
            </div>
            
            {/* My Channels */}
            <Card>
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">My Channels</h2>
                <Link to="/seller/dashboard">
                  <Button size="sm">
                    <Package className="w-4 h-4" />
                    Add New Channel
                  </Button>
                </Link>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {myListings.map(listing => (
                      <tr key={listing.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{listing.channel}</div>
                          <a 
                            href={listing.channelUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary-600 hover:text-primary-700"
                          >
                            View Channel →
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            {/* Account Info */}
            <Card className="mt-6 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <User className="w-5 h-5" />
                  <div>
                    <div className="text-sm text-gray-500">Full Name</div>
                    <div className="font-medium text-gray-900">{user?.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <div>
                    <div className="text-sm text-gray-500">Email Address</div>
                    <div className="font-medium text-gray-900">{user?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Package className="w-5 h-5" />
                  <div>
                    <div className="text-sm text-gray-500">Member Since</div>
                    <div className="font-medium text-gray-900">January 2024</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default ProfilePage
